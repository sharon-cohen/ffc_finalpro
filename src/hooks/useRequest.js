import { useFormContext } from "react-hook-form";

const useRequest = (request, errorsMap) => {
  const { setError, clearErrors, handleSubmit } = useFormContext();

  const onRequest = async (e) => {
    clearErrors();
    return handleSubmit(async (params) => {
      try {
        await request(params);
      } catch (error) {
        if (error.response) {
          return setError("global", {
            message: errorsMap[error?.response?.data.message || "default"],
          });
        }
        if (!error.status) {
          return setError("global", {
            message: "It seems there was a problem, please try again",
          });
        }
      }
    })(e);
  };

  return {
    onRequest,
  };
};

export default useRequest;
