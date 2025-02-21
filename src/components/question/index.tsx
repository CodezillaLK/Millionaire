import { useQuiz } from "../../contexts/quizContext";
import Options from "./options";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <div className="flex w-full flex-col gap-5">
      <h3 className="text-4xl font-semibold">{question.question}</h3>
      <Options question={question} />
      {/* <p className="text-sm">(Please choose the correct answer)</p> */}
      <p className="text-sm">(সঠিক উত্তর নির্বাচন করুন)</p>
    </div>
  );
}
export default Question;
