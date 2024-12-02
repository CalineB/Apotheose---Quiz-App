import { Button, ButtonGroup } from '@material-tailwind/react';
import { useState } from 'react';
import { IAnswer, IQuestion } from '../../../@types/quiz';
import { useAppSelector } from '../../../hooks/redux';

interface IPropsQuestion {
  question: IQuestion;
  setNextQuestion: React.Dispatch<React.SetStateAction<number>>;
  nextQuestion: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
}

function Question({
  question,
  setNextQuestion,
  nextQuestion,
  setScore,
  score,
}: IPropsQuestion) {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [badAnswer, setbadAnswer] = useState(0);
  const [goodAnswer, setGoodAnswer] = useState(0);
  const [validate, setValidate] = useState(false);
  const isgoodanswer = question.answers.find(
    (rep: IAnswer) => rep.is_good_answer
  );

  const handleValidate = () => {
    if (isgoodanswer && selectedAnswer === isgoodanswer.id) {
      setGoodAnswer(selectedAnswer);
      setScore(score + 1);
    } else {
      setbadAnswer(selectedAnswer);
    }
    setTimeout(() => {
      setValidate(true);
    }, 500);
    setTimeout(() => {
      setSelectedAnswer(0);
      setbadAnswer(0);
      setGoodAnswer(0);
      setNextQuestion(nextQuestion + 1);
      setValidate(false);
      setClicked(false);
    }, 1500);
  };

  const answers = question.answers.map((rep: IAnswer) => {
    return (
      <Button
        key={rep.id}
        className={`rounded-full transition duration-300 ${
          selectedAnswer === rep.id
            ? 'bg-deep-purple-700 text-white'
            : 'bg-white'
        } ${
          selectedAnswer === rep.id && badAnswer ? 'bg-red-700 text-white' : ''
        } ${
          selectedAnswer === rep.id && goodAnswer
            ? 'bg-green-700 text-white'
            : ''
        } `}
        onClick={() => {
          setSelectedAnswer(rep.id);
        }}
      >
        {rep.description}
      </Button>
    );
  });
  return (
    <section
      className={`flex flex-col gap-5 my-4 ${
        validate ? 'transition duration-1000 translate-y-[50%] opacity-0 ' : ''
      }`}
    >
      <h5 className="text-center text-xl">{question.description}</h5>
      <ButtonGroup
        variant="outlined"
        className="flex flex-col gap-3 px-5"
        color="deep-purple"
      >
        {answers}
      </ButtonGroup>

      {!!selectedAnswer && (
        <Button
          onClick={() => {
            setClicked(true);
            handleValidate();
          }}
          color="deep-purple"
          disabled={clicked}
        >
          Valider ma réponse ?
        </Button>
      )}
    </section>
  );
}

export default Question;
