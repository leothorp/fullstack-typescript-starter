import React, { ReactNode, FormEventHandler, Ref } from "react";
import { TextInput, Textarea } from "flowbite-react";
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

export const BaseInput = React.forwardRef(
  (props: React.ComponentProps<"input">, ref: Ref<HTMLInputElement>) => {
    return <TextInput {...props} className="w-full text-sm mb-1" ref={ref} />;
  }
);
export const BaseTextarea = React.forwardRef(
  (props: React.ComponentProps<"textarea">, ref: Ref<HTMLTextAreaElement>) => {
    return <Textarea {...props} ref={ref} className="w-full text-sm mb-1" />;
  }
);

export default BaseForm;
