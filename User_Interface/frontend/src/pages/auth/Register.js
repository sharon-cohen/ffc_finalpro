import Input from "../../components/core/form/input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import classNames from "classnames";
import { register } from "../../api/auth-api";
import { useNavigate } from "react-router-dom";
import Select from "../../components/core/form/select/Select";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, ...methods } = useForm();
  const onRegister = async (registerForm) => {
    setIsLoading(true);
    try {
      await register({ ...registerForm, isDoctor: 1 });
      navigate({
        pathname: "/auth/login",
        search: `?successRegister=true&email=${registerForm.email}`,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">Register to FFC</h1>
        <div className="text-gray-400 fw-bold fs-4">
          Already got an account?
          <button
            type="button"
            className="btn text-primary text-hover-success fw-bolder"
            onClick={() => navigate("/auth/login")}
          >
            Login here
          </button>
        </div>
      </div>
      <FormProvider {...methods}>
        <Input
          name="fullName"
          label="Full Name"
          type="text"
          rules={{
            required: "Full Name is required",
          }}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          rules={{
            required: "Email is required",
          }}
        />
        <Input
          name="degree"
          label="Degree"
          type="text"
          rules={{
            required: "Degree is required",
          }}
        />

        <Select
          name="gender"
          label="Gender"
          rules={{ required: "Gender is required" }}
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
        />
        <Input
          name="id"
          label="ID"
          type="text"
          rules={{
            required: "ID is required",
          }}
        />
        <Input
          name="phoneNumber"
          label="Phone"
          type="text"
          rules={{
            required: "Phone is required",
          }}
        />

        <Input
          name="expertise"
          label="Expertise"
          type="text"
          rules={{
            required: "Expertise is required",
          }}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          rules={{
            required: "Password is required",
          }}
        />
        <div className="separator my-5" />
        <button
          className={classNames({
            "btn btn-primary w-100": true,
          })}
          type="submit"
        >
          {isLoading ? "Please Wait..." : "Register"}
          <span className="indicator-progress">
            {isLoading && (
              <span className="spinner-border spinner-border-sm align-middle ms-2" />
            )}
          </span>
        </button>
      </FormProvider>
    </form>
  );
};

export default Register;
