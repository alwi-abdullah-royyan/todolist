const Select = ({ name, value, onChange, isRequired, choice, initialText, className = "w-full p-2" }) => {
  const commonProps = {
    name,
    required: isRequired,
    className: `${className} border border-gray-300 rounded-md text-black`,
    value,
  };
  if (onChange) commonProps.onChange = onChange;
  return (
    <select {...commonProps}>
      <option value="" disabled>
        {initialText}
      </option>
      {choice?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
