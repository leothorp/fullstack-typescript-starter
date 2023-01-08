import React, { ReactNode, FormEventHandler, Ref } from "react";
// import { FC, PropsWithChildren } from "@types/react";
const BaseForm = (props: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}) => {
  return <form {...props} className="flex items-center flex-col" />;
};

export default BaseForm;
export const BaseInput = React.forwardRef(
  (props: React.ComponentProps<"input">, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        {...props}
        ref={ref}
        className="min-w-[200px] border-1 border-solid border-lightgray mt-2 text-black"
      />
    );
  }
);
export const BaseTextarea = React.forwardRef(
  (props: React.ComponentProps<"textarea">, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className="min-w-[200px] border-1 border-solid border-lightgray mt-2 text-black"
      />
    );
  }
);
