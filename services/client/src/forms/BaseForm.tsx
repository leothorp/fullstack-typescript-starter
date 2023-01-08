import React, { ReactNode, FormEventHandler, Ref } from "react";
import { TextInput, Textarea } from "flowbite-react";
// import { FC, PropsWithChildren } from "@types/react";
const BaseForm = (props: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}) => {
  return (
    <form
      {...props}
      className="flex justify-items-stretch items-center flex-col"
    />
  );
};

export default BaseForm;
export const BaseInput = React.forwardRef(
  (props: React.ComponentProps<"input">, ref: Ref<HTMLInputElement>) => {
    return (
      <TextInput
        {...props}
        className="w-full text-md mb-1"
        ref={ref}
        // className="min-w-[200px] border-1 border-solid border-lightgray mt-2 text-black"
      />
    );
  }
);
export const BaseTextarea = React.forwardRef(
  (props: React.ComponentProps<"textarea">, ref: Ref<HTMLTextAreaElement>) => {
    return <Textarea {...props} ref={ref} className="w-full text-md mb-1" />;
  }
);
