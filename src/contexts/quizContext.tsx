import { createContext, useContext, useReducer } from "react";
import { questions } from "../assets/questions";
import useFullPageLoader from "../hooks/useFullPageLoader";

const QuizContext = createContext(undefined);

const initialState = {
  questions: questions,
  status: "active", //active, finished
  index: 0,
  answer: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
      };
    default:
      throw new Error("Unknown action");
  }
};

const QuizProvider = ({ children }) => {
  const { loader, showLoader, hideLoader } = useFullPageLoader();
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numQuestions = questions.length;

  return (
    <QuizContext.Provider
      value={{
        questions,
        numQuestions,
        status,
        index,
        answer,

        showLoader,
        hideLoader,

        dispatch,
      }}
    >
      {children}
      {loader}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");

  return context;
};

export { QuizProvider, useQuiz };
