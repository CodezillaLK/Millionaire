import { useQuiz } from "../../contexts/quizContext";

function ProgressBar() {
  const { index, numQuestions, answer } = useQuiz();
  return (
    <div className="text-center">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
    </div>
  );
}
export default ProgressBar;
