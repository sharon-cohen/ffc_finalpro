import React from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

const TextArea = ({ name, placeholder, label, className = "", rules }) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  return (
    <div className="mb-5">
      {label && <label className="form-label mb-3">{label}</label>}
      <textarea
        className={classNames({
          "form-control": true,
          "is-invalid": errors[name],
          [className]: true,
        })}
        {...register(name, { ...rules })}
        placeholder={placeholder}
      />
      {errors[name] && (
        <div className="text-danger">
          <span>{errors[name].message}</span>
        </div>
      )}
    </div>
  );
};

export default TextArea;
