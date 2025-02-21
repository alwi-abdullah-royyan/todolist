import React from "react";

const Input = ({
  type = "text", // Default type is text if not provided
  name,
  placeholder,
  isRequired = false,
  value = "",
  onChange = null,
  className = "w-full px-3 py-2",
  checked = false,
}) => {
  // Handle 'checked' only for checkbox or radio input types

  const isCheckboxOrRadio = type === "checkbox" || type === "radio";

  const commonProps = {
    type,
    name,
    placeholder,
    required: isRequired,
    className: `${className} text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`,
  };
  if (onChange) commonProps.onChange = onChange;
  if (value) commonProps.value = value;

  if (isCheckboxOrRadio) {
    return (
      <input
        {...commonProps}
        checked={checked} // Only apply `checked` if it's a checkbox or radio
      />
    );
  }

  return <input {...commonProps} />;
};

export default Input;
