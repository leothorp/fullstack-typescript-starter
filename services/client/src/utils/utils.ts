export const loadGoogleSignInScript = () => {
  return new Promise((resolve) => {
    const jsSrc = "https://accounts.google.com/gsi/client";
    const js = window.document.createElement("script");
    js.setAttribute("async", "");
    js.setAttribute("defer", "");
    js.src = jsSrc;
    window.document.head.appendChild(js);
    js.onload = resolve;
  });
};

export const invariant = (cond, errMsg) => {
  if (!cond) {
    throw new Error(errMsg);
  }
};
