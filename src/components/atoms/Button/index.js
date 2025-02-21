import React from "react";
import Icons from "../Icons";

const Button = ({ className = "w-full py-2", type, text, onClick = null, disabled = false, icon = "" }) => {
  const commonProps = {
    type,
    disabled: disabled,
    className: `${className} bg-blue-500 text-white  rounded-md hover:bg-blue-600 transition-colors`,
  };
  if (onClick) commonProps.onClick = onClick;
  return <button {...commonProps}>{text}</button>;
};

export default Button;
