import { Button, Card, CardFooter, CardHeader } from '@material-tailwind/react';
import { useState } from 'react';
import QuizCard from '../QuizCard/QuizCard';
import { useAppSelector } from '../../../hooks/redux';
import createSlug from '../../../hooks/createSlug';
import img from '../../../assets/random.png';

function RandomQuizContainer() {
  const dark = useAppSelector((state) => state.dark.dark);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState<null | JSX.Element>(null);
  const listQuiz = useAppSelector((state) => state.quizs.list);
  const listQuizMap = listQuiz.map((quizitem) => {
    const slug = createSlug(quizitem.name);
    return (
      <QuizCard
        key={quizitem.id}
        title={quizitem.name}
        tag="animaux"
        level="facile"
        slug={slug}
      />
    );
  });

  function handleClick() {
    const ranNumber = Math.floor(Math.random() * listQuizMap.length);
    const items = listQuizMap[ranNumber];
    setQuiz(items);
  }
  return (
    <div className="flex flex-col items-center w-screen pt-4 ">
      <div
        className={`w-auto bg-orange-300  rounded-r-xl p-3 text-white self-start shadow-md lg:self-center lg:mb-6 lg:rounded-xl lg:w-[400px] lg:text-center ${
          dark ? 'shadow-orange-500/40' : ''
        }`}
      >
        <h3 className="font-bold  text-2xl  ml-4">
          Essayer notre Quiz aléatoire
        </h3>
      </div>

      <div className="bg-[transparent] py-5 my-4  w-screen ">
        {showQuiz && quiz}
        {!showQuiz && (
          <Card
            className={`mt-6 ${
              dark ? 'bg-[#170f1f]' : 'bg-white/10 shadow-md shadow-white/50'
            } w-60 mx-auto`}
          >
            <CardHeader color="deep-purple" className="relative h-34">
              <img src={img} alt="" />
            </CardHeader>
            <CardFooter className="pt-4 mx-auto">
              <Button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-deep-purple-500/70 hover:shadow-lg hover:shadow-deep-purple-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-deep-purple-400 animate-pulse"
                onClick={() => {
                  handleClick();
                  setShowQuiz(true);
                }}
              >
                Quiz surprise
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

export default RandomQuizContainer;
