import { useFormContext } from "react-hook-form";

const SubmitBtn = ({ btnText = "Submit", loadingText = "Please Wait" }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <div className="d-flex flex-stack pt-15">
      <button className="w-100 btn btn-primary" type="submit">
        {!isSubmitting && <span>{btnText}</span>}
        {isSubmitting && (
          <span className="indicator-progress" style={{ display: "initial" }}>
            {loadingText}
            <span className="spinner-border spinner-border-sm align-middle ms-2" />
          </span>
        )}
      </button>
    </div>
  );
};

export default SubmitBtn;
