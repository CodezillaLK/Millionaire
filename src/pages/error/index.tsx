import { useNavigate, useRouteError } from "react-router-dom";

type TError = {
  data?: string;
  error?: {
    message: string;
  };
};

function Error() {
  const error: TError = useRouteError();

  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 text-white">
      <h1 className="text-xl font-semibold">Something went wrong 😢</h1>
      <p className="text-sm italic">
        {error.data || error.error.message || "Network error"}
      </p>
      <a
        className="text-sm italic underline"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Go back
      </a>
    </div>
  );
}
export default Error;
