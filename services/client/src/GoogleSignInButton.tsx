import { useAuthStore } from "@client/store/auth";
import React from "react";
import shallow from 'zustand/shallow'

type Props = {
  googleSignInInitialized: boolean;
};
type State = {
  rendered: boolean;
};

export const GoogleSignInButton = {
})
  class extends React.Component<Props, State> {
    componentDidMount() {
      this.renderBtn();
    }

    state = { rendered: false };

    renderBtn = () => {
      const { googleSignInInitialized } = this.props;

      const btnDiv = document.querySelector("#google-login-btn-container");

      if (this.state.rendered && googleSignInInitialized && btnDiv) {
        window.google.accounts.id.renderButton(btnDiv, {
          theme: "outline",
          size: "large",
        });
      }
      if (!this.state.rendered && googleSignInInitialized) {
        this.setState({ rendered: true });
      }
    };

    componentDidUpdate() {
      this.renderBtn();
    }
    render() {
      const { googleSignInInitialized } = this.props;
      return googleSignInInitialized && <div id="google-login-btn-container" />;
    }
  }
);

const GoogleSignInButton = (props) => {
    const { googleSignInInitialized } = useAuthStore(
        ({googleSignInInitialized}) => ({ googleSignInInitialized }),
        shallow
      )

        /* //partially generated via https://developers.google.com/identity/gsi/web/tools/configurator */
    return googleSignInInitialized && <div id="google-login-btn-container">
<div id="g_id_onload"
     data-client_id="qewgqwgasdgv"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="isReady"
     data-auto_prompt="false">
</div>

<div className="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="filled_blue"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div>

    </div>;
}
