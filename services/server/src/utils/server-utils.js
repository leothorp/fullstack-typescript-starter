// const jose = require("jose");
// const { createSecretKey } = require("crypto");
import { OAuth2Client } from "google-auth-library";
import {
  GOOGLE_CLIENT_ID,
  API_ORIGIN,
  CLIENT_ORIGIN,
} from "@utilities/shared-constants";
import { createSecretKey } from "crypto";
import * as jose from "jose";

//from https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
const googleOAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);
//TODO(lt): check if req has csrf token/ cookie described here: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
export const verifyGoogleIdToken = async (idToken) => {
  const loginTicket = await googleOAuthClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const decodedToken = loginTicket.getPayload();
  //verify 'aud' as described in https://developers.google.com/identity/sign-in/web/backend-auth
  if (decodedToken["aud"] !== GOOGLE_CLIENT_ID) {
    throw new Error(
      "'aud' from Google Sign In JWT does not match application Client ID."
    );
  }
  //TODO(lt): vvv additional aud verification needed? find that doc again
  const googleUserId = decodedToken["sub"];
  const email = decodedToken["email"];

  return { googleUserId, email };
};

//jwt secret generated per https://stackoverflow.com/a/71126277/5812448.
//e.g., openssl rand -hex 64 (64 bytes for HS512)

//TODO(lt): vvv determine if JWT with this method still the better approach here
const jwtSecretKey = createSecretKey(process.env.JWT_SECRET, "utf-8");
//auth tutorial https://codevoweb.com/trpc-api-with-postgres-prisma-nodejs-jwt-authentication/
export const generateAccessToken = async (userId, email) => {
  const role = "user";
  const payload = {
    claims: {
      "x-allowed-roles": [role],
      "x-default-role": role,
      "x-user-id": `${userId}`,
      "x-user-email": `${email}`,
    },
  };

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setIssuer(API_ORIGIN)
    .setAudience(CLIENT_ORIGIN)
    //TODO(lt): vvv test exp time
    .setExpirationTime("1h")
    .sign(jwtSecretKey);

  return jwt;
};

//TODO(lt): test these works, see what happens when token modified ors signed w wrong secret
export const validateAccessToken = async (token) => {
  const { payload } = await jose.jwtVerify(token, jwtSecretKey, {
    issuer: API_ORIGIN,
    audience: CLIENT_ORIGIN,
  });

  return payload;
};
