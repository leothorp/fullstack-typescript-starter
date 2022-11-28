// const jose = require("jose");
// const { createSecretKey } = require("crypto");
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "@utilities/shared-constants";
//from https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
const googleOAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);
//TODO(lt): check if req has csrf token/ cookie described here: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
export const verifyGoogleIdToken = async (idToken) => {
  const loginTicket = await googleOAuthClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const decodedToken = loginTicket.getPayload();
  //TODO(lt): vvv additional aud verification needed? find that doc again
  const googleUserId = decodedToken["sub"];
  const email = decodedToken["email"];

  return { googleUserId, email };
};
