export const loadGoogleSignInScript = () => {
  return new Promise((resolve) => {
    //TODO(lt): delete unused code if this works
    const jsSrc = "https://accounts.google.com/gsi/client";
    // const firstScriptEl = window.document.getElementsByTagName("script")[0];
    // // const fjs = element;
    // // let js = element;
    // js.id = id;
    const js = window.document.createElement("script");
    js.setAttribute("async", "");
    js.setAttribute("defer", "");
    js.src = jsSrc;
    // if (fjs && fjs.parentNode) {
    //   fjs.parentNode.insertBefore(js, fjs);
    // } else {
    window.document.head.appendChild(js);
    // }

    js.onload = resolve;
  });
};

export const invariant = (cond, errMsg) => {
  if (!cond) {
    throw new Error(errMsg);
  }
};
