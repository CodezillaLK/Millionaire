import { useQuiz } from "../../contexts/quizContext";

function Footer() {
  const { index, numQuestions } = useQuiz();
  return (
    <div className="pt-4">
      <p>
        <strong>{index + 1}</strong> of {numQuestions} Questions
      </p>
    </div>
  );
}
export default Footer;
