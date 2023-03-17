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

const JWT_SECRET = process.env.JWT_SECRET!;
//from https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
const googleOAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);
//TODO(lt): include CSRF token/cookie as described here: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
export const verifyGoogleIdToken = async (idToken) => {
  const loginTicket = await googleOAuthClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const decodedToken = loginTicket.getPayload();
  if (!decodedToken) {
    throw new Error("Token not found.");
  }
  //verify 'aud' as described in https://developers.google.com/identity/sign-in/web/backend-auth
  if (decodedToken["aud"] !== GOOGLE_CLIENT_ID) {
    throw new Error(
      "'aud' from Google Sign In JWT does not match application Client ID."
    );
  }
  const googleUserId = decodedToken["sub"];
  const email = decodedToken["email"];

  return { googleUserId, email };
};

//jwt secret generated per https://stackoverflow.com/a/71126277/5812448.
//e.g., openssl rand -hex 64 (64 bytes needed for HS512)

const jwtSecretKey = createSecretKey(JWT_SECRET, "utf-8");
//reference: https://codevoweb.com/trpc-api-with-postgres-prisma-nodejs-jwt-authentication/
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
    .setExpirationTime("1h")
    .sign(jwtSecretKey);

  return jwt;
};

type Claims = {
  "x-user-id": number;
  "x-user-email": string;
};

export const validateAccessToken = async (token) => {
  const { payload } = await jose.jwtVerify(token, jwtSecretKey, {
    issuer: API_ORIGIN,
    audience: CLIENT_ORIGIN,
  });
  const { "x-user-id": userId, "x-user-email": email } =
    payload.claims as Claims;

  const result = { userId: Number(userId), email };
  console.log("result", result);
  return result;
};
