"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useRef } from "react";
import { useFormStatus } from "react-dom";
import { postData } from "../lib/actions";

type Props = {};
const SubmitForm = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait a Moment...
        </Button>
      ) : (
        <Button type="submit">Send Note</Button>
      )}
    </>
  );
};
const Form = (props: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
    ref={formRef}
      action={async (formData) => {
        await postData(formData);
        formRef.current?.reset();
      }}
      className="flex justify-between gap-4 flex-col md:flex-row"
    >
      <Input
        type="text"
        name="message"
        maxLength={100}
        minLength={1}
        placeholder="Leave your pretty note...😊😋❤"
        required
      />
      <SubmitForm />
    </form>
  );
};

export default Form;
