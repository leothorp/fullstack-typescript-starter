import { useAuthStore } from "@client/store/auth";
import { useEffect } from "react";

export const LoginPage = () => {
  return (
    <div className="text-center w-[100vw] flex-col justify-center h-[100vh] flex">
      <h2>Login / Register with Google</h2>
      <GoogleSignInButton />
    </div>
  );
};

const GoogleSignInButton = () => {
  const googleSignInInitialized = useAuthStore(
    (state) => state.googleSignInInitialized
  );

  useEffect(() => {
    if (googleSignInInitialized) {
      window.google.accounts.id.renderButton(
        document.querySelector("#google-login-btn-container"),
        {
          theme: "outline",
          size: "large",
        }
      );
    }
  });

  return (
    <div className="flex justify-center mt-4" id="google-login-btn-container" />
  );
};
