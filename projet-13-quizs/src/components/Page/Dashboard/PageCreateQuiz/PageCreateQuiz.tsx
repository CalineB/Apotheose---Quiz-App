import { Alert, Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import FormQuestion from '../../../UtilsComponents/FormQuestion/FormQuestion';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import { postOneQuiz } from '../../../../store/reducers/quizs';
import FilterFom from '../../../UtilsComponents/FilterForm/FilterFom';
import { ICreateQuestion } from '../../../../@types/quiz';
import { checkAdmin } from '../../../../store/reducers/user';

function PageCreateQuiz() {
  const dispatch = useAppDispatch();
  const errorQuiz = useAppSelector((state) => state.quizs.error);
  const user = useAppSelector((state) => state.user);
  const dark = useAppSelector((state) => state.dark.dark);
  const [questions, setQuestions] = useState<JSX.Element[]>([]);
  const [questionValue, setQuestionValue] = useState<ICreateQuestion[]>([]);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState<string | number>(0);
  const [difficulty, setDifficulty] = useState<string | number>(0);
  useEffect(() => {
    dispatch(checkAdmin());
  }, [dispatch]);
  const sendQuizToServer = () => {
    const header = {
      name,
      tag: theme,
      level: difficulty,
      question: questionValue,
    };

    dispatch(postOneQuiz(header));
    setSent(true);
  };
  if (user.checkedError) {
    return <Navigate replace to="/error" />;
  }
  if (!user.isLogged || user.role.name !== 'Admin') {
    return <Navigate to="/error" replace />;
  }
  if (sent && !errorQuiz) {
    return <Navigate to="/dashboard/quiz" />;
  }
  return (
    <div className="flex flex-col items-center w-[90%] max-w-[1000px] gap-5 mb-10">
      {errorQuiz && (
        <Alert className="text-center w-full p-2 justify-center" color="red">
          <span className="text-center">
            Une erreur est survenu veuillez réssayer ultérieurement
          </span>
        </Alert>
      )}
      <Link
        to="/dashboard/quiz"
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-deep-purple-500 text-white shadow-md shadow-deep-purple-500/20 hover:shadow-lg hover:shadow-deep-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none max-w-[400px]"
      >
        Retourner a la gestion des quiz
      </Link>

      <input
        className={`rounded-full max-w-[500px] w-full  py-2 pl-2 ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-black/10 shadow-xl shadow-white/20 font-bold text-white'
        }`}
        type="text"
        name="namequiz"
        id="namequiz"
        placeholder="Nom du Quiz"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <section
        className={` rounded-3xl  max-w-[500px] w-full p-3 shadow-xl ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-white/10 text-white'
        }`}
      >
        <div className="flex flex-col w-full ">
          <FilterFom
            setTheme={setTheme}
            setDifficulty={setDifficulty}
            type="number"
          />
        </div>
      </section>

      {questions}
      <div className="flex flex-col gap-3  max-w-[500px] w-full">
        <Button
          onClick={() => {
            setQuestions(
              questions.concat(
                <FormQuestion
                  id={questions.length}
                  questionValue={questionValue}
                  setQuestionValue={setQuestionValue}
                />
              )
            );
          }}
          color="deep-purple"
        >
          Ajouter une question
        </Button>
        <Button
          color="green"
          onClick={() => {
            sendQuizToServer();
          }}
        >
          Valider
        </Button>
      </div>
    </div>
  );
}

export default PageCreateQuiz;
