import React from "react";
import { format } from "date-fns";
import Flatpickr from "react-flatpickr";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";

const DatePicker = ({ name, className = "" }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="datepicker">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Date is Required" }}
        render={({
          field: { onChange, ref, value = new Date().getTime() },
        }) => {
          return (
            <div className="position-relative d-flex align-items-center w-100">
              <Flatpickr
                options={{
                  enableTime: true,
                  dateFormat: "Y-m-d H:i:s",
                }}
                defaultValue=""
                onChange={(v) => onChange(v[0].getTime())}
                render={({}, fpRef) => {
                  return (
                    <div
                      className="position-relative d-flex align-items-center"
                      ref={fpRef}
                    >
                      <span className=" position-absolute ms-4 mb-1 fas fa-calendar-alt" />
                      <input
                        className={classNames({
                          "form-control": true,
                          "is-invalid": errors[name],
                          [className]: true,
                        })}
                        ref={ref}
                        value={format(
                          value || new Date().getTime(),
                          "d-M-yyyy - aHH:mm"
                        )}
                        readOnly={true}
                        name={name}
                        type="text"
                      />
                    </div>
                  );
                }}
              />
            </div>
          );
        }}
      />
      {errors[name] && (
        <div className="text-danger">
          <span>{errors[name].message}</span>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
