import React, { ReactNode, FormEventHandler } from "react";
// import { FC, PropsWithChildren } from "@types/react";
const BaseForm = (props: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}) => {
  return <form {...props} className="flex items-center flex-col" />;
};

export default BaseForm;
export const BaseInput = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="min-w-[200px] border-2 border-solid border-lightgray mt-2"
    />
  );
});
export const BaseTextarea = React.forwardRef((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className="min-w-[200px] border-2 border-solid border-lightgray mt-2"
    />
  );
});
