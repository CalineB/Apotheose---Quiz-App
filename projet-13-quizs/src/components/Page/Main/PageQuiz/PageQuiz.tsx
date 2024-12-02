import { Alert, Button, Chip } from '@material-tailwind/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Question from '../../../UtilsComponents/Question/Question';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import QuizCard from '../../../UtilsComponents/QuizCard/QuizCard';
import Carousel from '../../../UtilsComponents/Carrousel/Carousel';
import createSlug from '../../../../hooks/createSlug';
import { fetchOneQuiz } from '../../../../store/reducers/quiz';
import Loading from '../../../Loading/Loading';
import foundFilter from '../../../../hooks/foundFilter';
import { postHistory } from '../../../../store/reducers/history';

function PageQuiz() {
  const [score, setScore] = useState(0);
  const [nextQuestion, setNextQuestion] = useState(0);
  const dispatch = useAppDispatch();
  const quizState = useAppSelector((state) => state.quiz);
  const user = useAppSelector((state) => state.user);
  const historyError = useAppSelector((state) => state.history.error);
  const { isLoading, quiz: quizItem } = quizState;
  const listQuiz = useAppSelector((state) => state.quizs.list);
  const { slug } = useParams();
  const quizToFind = listQuiz.find((quiz) => createSlug(quiz.name) === slug);
  const filtre = useAppSelector((state) => state.filtre);
  const [sent, setSent] = useState(false);
  const dark = useAppSelector((state) => state.dark.dark);
  useEffect(() => {
    if (quizToFind) {
      dispatch(fetchOneQuiz(quizToFind.id));
      setScore(0);
      setNextQuestion(0);
    }
  }, [dispatch, quizToFind]);

  useEffect(() => {
    if (
      quizToFind &&
      quizItem &&
      nextQuestion > 0 &&
      nextQuestion === quizItem.questions.length &&
      user.isLogged &&
      !sent
    ) {
      const header = {
        score,
        max_score: quizItem.questions.length,
        quiz_id: quizToFind.id,
        user_id: user.id,
      };
      dispatch(postHistory(header));
      setSent(true);
    }
    if (
      quizToFind &&
      quizItem &&
      nextQuestion > 0 &&
      nextQuestion === quizItem.questions.length &&
      !user.isLogged &&
      !sent
    ) {
      const header = {
        score,
        max_score: quizItem.questions.length,
        quiz_id: quizToFind.id,
      };
      const localHistory = localStorage.getItem('history');
      let stringHeader: string;
      if (localHistory) {
        const parsedHistory = JSON.parse(localHistory);

        stringHeader = JSON.stringify({
          history: [header, ...parsedHistory.history],
        });

        console.log(stringHeader);
      } else {
        stringHeader = JSON.stringify({ history: [header] });
      }
      localStorage.setItem('history', stringHeader);
      setSent(true);
    }
  }, [dispatch, nextQuestion, quizItem, score, user, sent, quizToFind]);

  if (isLoading) {
    return <Loading />;
  }

  if (!quizToFind) {
    return <Navigate to="/error" />;
  }
  const otherQuiz = listQuiz
    .filter(
      (quiz) =>
        createSlug(quiz.name) !== slug && quiz.tag_id === quizToFind.tag_id
    )
    .slice(0, 5);

  const length = quizItem.questions ? quizItem.questions.length : 1;

  return (
    <div
      className={`flex flex-col gap-3 w-screen max-w-[700px]  rounded-2xl p-3 text-white ${
        dark
          ? 'bg-[#170f1f] text-white shadow-md shadow-deep-purple-500/40'
          : 'bg-white/10 shadow-md shadow-white/50 bg-deep-purple-700 '
      }`}
    >
      {historyError && sent && (
        <Alert className="text-center w-full p-2 justify-center" color="red">
          <span className="text-center text-white">
            Une erreur est survenu votre score n&apos;as pas pu être enregistré
          </span>
        </Alert>
      )}
      <h3 className="font-bold text-center text-3xl ">{quizItem?.name}</h3>
      <div className="flex justify-around">
        <Chip
          value={quizItem.tag}
          className={`bg-red-800 ${dark ? ' shadow-md shadow-red-800/50' : ''}`}
        />

        <h5 className="text-xl font-bold">{`${score}/${length}`}</h5>
        <Chip
          value={quizItem.level}
          className={`bg-light-green-400 ${
            dark ? ' shadow-md shadow-light-green-400/40' : ''
          }`}
        />
      </div>

      {nextQuestion < length && (
        <Question
          setNextQuestion={setNextQuestion}
          nextQuestion={nextQuestion}
          question={quizItem.questions[nextQuestion]}
          setScore={setScore}
          score={score}
        />
      )}
      {nextQuestion === length && (
        <div
          className={` p-5 py-10 gap-10 flex flex-col items-center mt-10 rounded-3xl ${
            dark ? 'bg-[#2f1828]' : 'bg-white/20'
          }`}
        >
          <h3 className="text-2xl font-bold">Votre score est de ?</h3>
          <h5 className="text-2xl">{`${score}/${length}`}</h5>

          <Link
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-deep-purple-500 text-white shadow-md shadow-deep-purple-500/20 hover:shadow-lg hover:shadow-deep-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none animate-pulse"
            to="/"
          >
            Retourner a l&apos;acceuil ?
          </Link>
        </div>
      )}
      {nextQuestion === length && (
        <div className="flex flex-col gap-5">
          <h3 className=" mb-3 text-center text-2xl font-bold">
            Venez découvrir d&apos;autres quiz
          </h3>

          <Carousel classname="is-Suggestion">
            {otherQuiz.length
              ? otherQuiz.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    title={quiz.name}
                    tag={foundFilter(filtre.tags, quiz.tag_id)}
                    level={foundFilter(filtre.levels, quiz.level_id)}
                    slug={createSlug(quiz.name)}
                  />
                ))
              : listQuiz
                  .filter((quiz) => quiz.id !== quizItem.id)
                  .map((quiz) => (
                    <QuizCard
                      key={quiz.id}
                      title={quiz.name}
                      tag={foundFilter(filtre.tags, quiz.tag_id)}
                      level={foundFilter(filtre.levels, quiz.level_id)}
                      slug={createSlug(quiz.name)}
                    />
                  ))
                  .slice(0, 5)}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default PageQuiz;
