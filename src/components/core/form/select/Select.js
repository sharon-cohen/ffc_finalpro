import React from "react";
import { useFormContext } from "react-hook-form";

const Select = ({ name, rules, label, options, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-5">
      <label className="form-label mb-3">{label}</label>
      <select
        className="form-select"
        {...register(name, rules)}
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <div className="text-danger">
          <span>{errors[name].message}</span>
        </div>
      )}
    </div>
  );
};

export default Select;
