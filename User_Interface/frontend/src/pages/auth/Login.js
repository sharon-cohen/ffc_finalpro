import { FormProvider, useForm } from "react-hook-form";
import LoginForm from "../../components/auth/LoginForm";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { ...methods } = useForm({
    defaultValues: {
      email,
    },
  });

  return (
    <FormProvider {...methods}>
      <LoginForm />
    </FormProvider>
  );
};

export default Login;
