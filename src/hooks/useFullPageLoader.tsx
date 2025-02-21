import { useState } from "react";
import Loader from "../components/Loader";

function useFullPageLoader() {
  const [loading, setLoading] = useState(false);

  return {
    loader: loading ? <Loader /> : null,
    showLoader: () => setLoading(true),
    hideLoader: () => setLoading(false),
  };
}
export default useFullPageLoader;
