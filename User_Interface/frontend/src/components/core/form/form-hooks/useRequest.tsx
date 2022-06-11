import { AxiosError } from "axios";
import { BaseSyntheticEvent } from "react";
import { useFormContext } from "react-hook-form";

const useRequest = <T extends {}>(
  request: (p: T) => void,
  errorsMap: Record<string, string>
) => {
  const { setError, clearErrors, handleSubmit } = useFormContext();

  const onRequest = async (e: BaseSyntheticEvent) => {
    clearErrors();
    return handleSubmit(async (params: any) => {
      try {
        await request(params);
      } catch (error: any | AxiosError) {
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
