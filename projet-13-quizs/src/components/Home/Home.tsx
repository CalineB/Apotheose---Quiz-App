import { useAppSelector } from '../../hooks/redux';

import QuizContainer from '../UtilsComponents/QuizContainer/QuizContainer';
import RandomQuizContainer from '../UtilsComponents/RandomQuizContainer/RandomQuizContainer';

function Home() {
  const listQuiz = useAppSelector((state) => state.quizs.list);
  const listQuizPlayed = useAppSelector((state) => state.quizs.listPlayed);
  return (
    <div className="mb-10 ">
      <QuizContainer title="Quiz préféré" listQuiz={listQuizPlayed} />
      <RandomQuizContainer />

      <QuizContainer
        title="Quiz Les plus Récent"
        listQuiz={listQuiz.slice(0, 5)}
      />
    </div>
  );
}

export default Home;
