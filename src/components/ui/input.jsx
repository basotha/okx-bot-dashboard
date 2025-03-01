const Input = ({ value, onChange, placeholder, type = "text" }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className="border p-2 rounded"
    />
  );
};

export { Input };
