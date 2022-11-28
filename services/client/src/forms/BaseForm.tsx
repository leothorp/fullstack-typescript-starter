import React from "react";

export default React.forwardRef((props, ref) => {
  return <form {...props} ref={ref} className="flex items-center flex-col" />;
});

export const BaseInput = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="max-w-[100px] border-2 border-solid border-lightgray"
    />
  );
});
export const BaseTextarea = React.forwardRef((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className="max-w-[100px] border-2 border-solid border-lightgray"
    />
  );
});
