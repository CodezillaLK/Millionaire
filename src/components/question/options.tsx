import { FaCheck, FaTimes } from "react-icons/fa";
import { useQuiz } from "../../contexts/quizContext";

function Options({ question }) {
  const { answer, dispatch, index, numQuestions } = useQuiz();

  const hasAnswered = answer !== null;

  const handleButtonClick = (answerIndex) => {
    dispatch({ type: "newAnswer", payload: answerIndex });

    setTimeout(() => {
      // goto next question
      if (index < numQuestions - 1) {
        dispatch({ type: "nextQuestion" });
      } else if (index === numQuestions - 1) {
        dispatch({ type: "finished" });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-3">
      {question.options.map((option, i) => (
        <button
          className={`q-options ${
            hasAnswered
              ? i === answer
                ? "bg-[#76C98D]"
                : "hover:bg-[#47955D]"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => handleButtonClick(i)}
        >
          <p>{option}</p>
          {hasAnswered ? (
            i === question.correctOption ? (
              <FaCheck size={14} />
            ) : (
              <FaTimes size={14} />
            )
          ) : null}
        </button>
      ))}
    </div>
  );
}
export default Options;
