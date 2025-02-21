// import { useNavigate } from "react-router-dom";
// import Footer from "../../components/Footer";
// import Header from "../../components/Header";
import Subscribe from "../../components/OTP_related/Subscribe";
// import ProgressBar from "../../components/progressBar";
// import Question from "../../components/question";
// import { useQuiz } from "../../contexts/quizContext";

function Home() {
  // const { status } = useQuiz();
  // const navigate = useNavigate();

  return (
    <div className="xl:flex xl:flex-col xl:items-center">
      <Subscribe />
      {/* {status === "active" && (
        <div className="box">
          <div className="flex flex-col gap-6">
            <Header />
            <ProgressBar />
            <Question />
          </div>
          <Footer />
        </div>
      )}
      {status === "finished" && <Subscribe />} */}
    </div>
  );
}
export default Home;
