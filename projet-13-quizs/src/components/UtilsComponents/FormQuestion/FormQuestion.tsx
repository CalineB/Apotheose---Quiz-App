import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from '@material-tailwind/react';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addQuestion } from '../../../store/reducers/quizs';
import Input from '../Input/Input';
import { ICreateQuestion } from '../../../@types/quiz';

function FormQuestion({
  id,
  questionValue,
  setQuestionValue,
}: {
  id: number;
  questionValue: ICreateQuestion[];
  setQuestionValue: React.Dispatch<React.SetStateAction<ICreateQuestion[]>>;
}) {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.quizs.createdQuiz.question);
  const [goodAnswer, setGoodAnswer] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const dark = useAppSelector((state) => state.dark.dark);
  /* !MATERIAL TAILWIND NE PAS TOUCHER */
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  /* !MATERIAL TAILWIND NE PAS TOUCHER */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const formObj = Object.fromEntries<string>(
      formData as Iterable<[PropertyKey, string]>
    );
    const { answer_1, answer_2, answer_4, answer_3 } = formObj;
    dispatch(
      addQuestion({
        id,
        description: formObj.question,
        answers: [
          {
            description: answer_1,
            isgoodanswer: goodAnswer === 1,
          },
          {
            description: answer_2,
            isgoodanswer: goodAnswer === 2,
          },
          {
            description: answer_3,
            isgoodanswer: goodAnswer === 3,
          },
          {
            description: answer_4,
            isgoodanswer: goodAnswer === 4,
          },
        ],
      })
    );
    setQuestionValue([
      ...questionValue,
      {
        id,
        description: formObj.question,
        answers: [
          {
            description: answer_1,
            isgoodanswer: goodAnswer === 1,
          },
          {
            description: answer_2,
            isgoodanswer: goodAnswer === 2,
          },
          {
            description: answer_3,
            isgoodanswer: goodAnswer === 3,
          },
          {
            description: answer_4,
            isgoodanswer: goodAnswer === 4,
          },
        ],
      },
    ]);
    setIsClosed(true);
  };

  if (isClosed) {
    return (
      <Accordion
        open={open === 1}
        className={`border border-blue-gray-100 px-4 rounded-lg mb-2 ${
          dark
            ? 'shadow-lg bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-white'
        } `}
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1
              ? 'text-deep-purple-500 hover:!text-deep-purple-700'
              : 'text-white'
          }`}
        >
          {questions[id].description}
        </AccordionHeader>
        <AccordionBody className="text-base font-normal pt-0">
          <div className="flex flex-col gap-1 items-center">
            {questions[id].answers.map((rep, index) => (
              <p
                key={Math.round(Math.random() * 10000)}
                className={
                  rep.isgoodanswer
                    ? 'text-green-700 font-bold'
                    : `${dark ? 'text-white' : 'text-black'}`
                }
              >
                {index + 1}: {rep.description}
              </p>
            ))}
          </div>
        </AccordionBody>
      </Accordion>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event);
      }}
      className={`flex w-[90%] max-w-[400px] flex-col gap-5 px-3 py-3 rounded-xl ${
        dark
          ? 'shadow-lg bg-[#170f1f] text-white shadow-deep-purple-700/40'
          : 'bg-white/10 shadow-lg shadow-white/30'
      }`}
    >
      <div className="flex flex-col text-white font-bold gap-1 max-w-[500px] w-full items-center">
        <label htmlFor="question">Question</label>
        <Input
          className={`w-[90%] h-10 px-2 rounded-lg
          ${
            dark
              ? 'shadow-md bg-[#170f1f] text-white shadow-deep-purple-700/40'
              : ''
          }
          `}
          name="question"
          id="question"
          placeholder="Question ?"
          type="text"
          required
        />
        <label htmlFor="answer_1">Réponse 1</label>
        <Input
          className={`w-[90%] h-10 px-2 rounded-lg
          ${
            dark
              ? 'shadow-md bg-[#170f1f] text-white shadow-deep-purple-700/40'
              : ''
          }
          `}
          name="answer_1"
          id="answer_1"
          placeholder="Réponse"
          type="text"
          required
        />
        <label htmlFor="answer_2">Réponse 2</label>
        <Input
          className={`w-[90%] h-10 px-2 rounded-lg
          ${
            dark
              ? 'shadow-md bg-[#170f1f] text-white shadow-deep-purple-700/40'
              : ''
          }
          `}
          name="answer_2"
          id="answer_2"
          placeholder="Réponse"
          type="text"
          required
        />
        <label htmlFor="answer_3">Réponse 3</label>
        <Input
          className={`w-[90%] h-10 px-2 rounded-lg
          ${
            dark
              ? 'shadow-md bg-[#170f1f] text-white shadow-deep-purple-700/40'
              : ''
          }
          `}
          name="answer_3"
          id="answer_3"
          placeholder="Réponse"
          type="text"
          required
        />
        <label htmlFor="answer_4">Réponse 4</label>
        <Input
          className={`w-[90%] h-10 px-2 rounded-lg
          ${
            dark
              ? 'shadow-md bg-[#170f1f] text-white shadow-deep-purple-700/40'
              : ''
          }
          `}
          name="answer_4"
          id="answer_4"
          placeholder="Réponse"
          type="text"
          required
        />
      </div>
      <div
        className={`${
          dark
            ? 'shadow-md bg-[#170f1f] text-white shadow-deep-purple-700/40 '
            : 'bg-white'
        }
           py-2 px-3  max-w-[500px] w-full rounded-3xl`}
      >
        <select
          className={`${
            dark
              ? 'shadow-md bg-[#170f1f] text-white shadow-deep-purple-700/40 '
              : 'bg-white'
          } peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 active:text-black`}
          name="GoodAnswer"
          id="GoodAnswer"
          placeholder="Bonne Réponse"
          onChange={(e) => {
            setGoodAnswer(parseInt(e.target.value, 10) || 0);
          }}
        >
          <option value="">--Bonne Réponse--</option>
          <option value="1">Réponse n°1</option>
          <option value="2">Réponse n°2</option>
          <option value="3">Réponse n°3</option>
          <option value="4">Réponse n°4</option>
        </select>
      </div>
      <Button
        type="submit"
        className={`py-3 rounded-xl text-md text-white font-bold uppercase ${
          dark ? 'shadow-lg ' : 'bg-blue-800/80'
        }`}
      >
        Finaliser la question
      </Button>
    </form>
  );
}

export default FormQuestion;
