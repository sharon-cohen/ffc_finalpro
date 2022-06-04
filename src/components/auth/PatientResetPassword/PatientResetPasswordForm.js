import Input from "../../core/form/input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { login, newPatientPassword } from "../../../api/auth-api";
import useAuth from "../../../hooks/useAuth";
import LoginSubheader from "../LoginSubheader";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormError from "../../core/form/FormError";
import useRequest from "../../../hooks/useRequest";
import SubmitBtn from "../../core/form/submit-btn/SubmitBtn";

const ERRORS_MAP = {
  default: "Something went wrong, please try again",
};

const PatientResetPasswordForm = ({ setIsOpen }) => {
  const onSubmit = async (newPasswordForm) => {
    await newPatientPassword(newPasswordForm);
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, isPasswordSet: true })
    );
    setIsOpen(false);
  };
  const { onRequest: onNewPassword } = useRequest(onSubmit, {});

  return (
    <form onSubmit={onNewPassword}>
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">Choose a new password</h1>
      </div>
      <FormError />
      <Input
        name="password"
        label="New Password"
        type="password"
        rules={{
          required: "Password is required",
        }}
      />
      <div className="separator my-5" />
      <SubmitBtn submitText="Login" />
    </form>
  );
};

export default PatientResetPasswordForm;
