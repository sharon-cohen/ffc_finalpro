import React from "react";
import { useFormContext } from "react-hook-form";

const FormError = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="my-5">
      {errors && errors.global && (
        <div className="py-2 rounded-1 border-bottom-dashed border-danger">
          <span className="text-danger">{errors.global.message}</span>
        </div>
      )}
    </div>
  );
};

export default FormError;
