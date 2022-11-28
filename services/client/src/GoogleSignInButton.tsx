import { useAuthStore } from "@client/store/auth";
import React, { useEffect } from "react";

// type Props = {
//   googleSignInInitialized: boolean;
// };
// type State = {
//   rendered: boolean;
// };

// export const GoogleSignInButton = {
// })
//   class extends React.Component<Props, State> {
//     componentDidMount() {
//       this.renderBtn();
//     }

//     state = { rendered: false };

//     renderBtn = () => {
//       const { googleSignInInitialized } = this.props;

//       const btnDiv = document.querySelector("#google-login-btn-container");

//       if (this.state.rendered && googleSignInInitialized && btnDiv) {
// window.google.accounts.id.renderButton(btnDiv, {
//   theme: "outline",
//   size: "large",
// });
//       }
//       if (!this.state.rendered && googleSignInInitialized) {
//         this.setState({ rendered: true });
//       }
//     };

//     componentDidUpdate() {
//       this.renderBtn();
//     }
//     render() {
//       const { googleSignInInitialized } = this.props;
//       return googleSignInInitialized && <div id="google-login-btn-container" />;
//     }
//   }
// );

export const GoogleSignInButton = () => {
  const googleSignInInitialized = useAuthStore(
    (state) => state.googleSignInInitialized
  );
  const initGoogleSignIn = useAuthStore((state) => state.initGoogleSignIn);
  useEffect(() => {
    initGoogleSignIn();
  }, [initGoogleSignIn]);

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
  }, [googleSignInInitialized]);

  /* //partially generated via https://developers.google.com/identity/gsi/web/tools/configurator */
  return <div id="google-login-btn-container" />;
};
