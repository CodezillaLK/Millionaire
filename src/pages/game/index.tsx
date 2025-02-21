import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { gpUpdateSUBID } from "../../services/bdService";
import { useQuiz } from "../../contexts/quizContext";

// import ReactPixel from "react-facebook-pixel";
// import ReactGA from "react-ga-neo";
// import { FACEBOOK_PIXEL_ID, GTAG_ID } from "../../constants/settings";

// // React Pixel
// ReactPixel.init(FACEBOOK_PIXEL_ID);
// ReactPixel.pageView();

// // Gtag
// ReactGA.initialize(GTAG_ID);
// ReactGA.gtag("event", "conversion", {
//   send_to: "AW-10848315230/KmygCJa5tt4DEN7O8LQo",
//   transaction_id: "",
// });

// SUBSCRIBED: "S1000",
// ALREADY_SUBSCRIBED: "E3001"

function Game() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showLoader, hideLoader } = useQuiz();

  const subscriptionStatus = searchParams.get("subscriptionStatus");
  const requestID = searchParams.get("requestId");
  const subscriberID = searchParams.get("subscriberId");
  const errorCode = searchParams.get("ErrorCode");

  useEffect(() => {
    const updateGPUser = (requestID, subscriberID) => {
      showLoader();
      gpUpdateSUBID({ requestID, subscriberID })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          hideLoader();
        });
    };

    if (subscriptionStatus === "S1000" && requestID && subscriberID) {
      updateGPUser(requestID, subscriberID);
    }
  }, []);

  useEffect(() => {
    let timer;

    if (subscriptionStatus === "S1000" || errorCode === "E3001") {
      timer = setTimeout(() => {
        window.location.href =
          "https://quiz.lifeinsrilanka.com/qsm_quiz/bengal-brain-1/";
      }, 10000);
    } else {
      navigate("/", { replace: true });
    }

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timer);
  }, [subscriptionStatus, errorCode, navigate]);

  return (
    <>
      <div className="px-4 py-4">
        <p className="text-sm italic">You will be redirected to the Quiz</p>
        <a
          className="text-sm italic underline"
          href="https://quiz.lifeinsrilanka.com/qsm_quiz/bengal-brain-1/"
        >
          Redirect Now
        </a>
      </div>
    </>
  );
}
export default Game;
