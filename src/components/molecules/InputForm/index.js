import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import React from "react";

const InputForm = ({ label, type, name, placeholder, isRequired }) => {
  return (
    <div>
      <Label text={label} />
      <Input type={type} name={name} placeholder={placeholder} isRequired={isRequired} />
    </div>
  );
};

export default InputForm;
