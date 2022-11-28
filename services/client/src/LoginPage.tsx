import { useAuthStore } from "@client/store/auth";
import { useEffect } from "react";
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

export const LoginPage = (props) => {
  console.log("login page", props.location);
  return (
    <div>
      <h2>Login / Register with Google</h2>
      <GoogleSignInButton location={location} />
    </div>
  );
};

const GoogleSignInButton = (props) => {
  console.log("sign in button", props.location);

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, []);
  const googleSignInInitialized = useAuthStore(
    (state) => state.googleSignInInitialized
  );

  console.log(googleSignInInitialized);

  useEffect(() => {
    if (googleSignInInitialized) {
      console.log(googleSignInInitialized, "inner");

      window.google.accounts.id.renderButton(
        document.querySelector("#google-login-btn-container"),
        {
          theme: "outline",
          size: "large",
        }
      );
    }
  });

  /* //partially generated via https://developers.google.com/identity/gsi/web/tools/configurator */
  return <div id="google-login-btn-container" />;
};
