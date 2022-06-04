import Input from "../../components/core/form/input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { login } from "../../api/auth-api";
import useAuth from "../../hooks/useAuth";
import LoginSubheader from "../../components/auth/LoginSubheader";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormError from "../../components/core/form/FormError";
import useRequest from "../../hooks/useRequest";
import SubmitBtn from "../../components/core/form/submit-btn/SubmitBtn";

const ERRORS_MAP = {
  default: "Incorrect Details, Please try again",
};

const LoginForm = () => {
  const { setIsAuthenticated, setIsUserDoctor } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (loginForm) => {
    const {
      data: { user, token },
    } = await login(loginForm);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setIsUserDoctor(user.type === "doctor");
    navigate("/app/dashboard");
  };
  const { onRequest: onLogin } = useRequest(onSubmit, ERRORS_MAP);

  return (
    <form onSubmit={onLogin}>
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">Login In to FFC</h1>
        <LoginSubheader />
      </div>
      <FormError />
      <Input
        name="email"
        label="Email"
        type="email"
        rules={{
          required: "Email is required",
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
      <SubmitBtn submitText="Login" />
    </form>
  );
};

export default LoginForm;
