import { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from '@material-tailwind/react';
import { IQuestion } from '../../../@types/quiz';
import Input from '../Input/Input';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteQuestions, updateQuestions } from '../../../store/reducers/quiz';

function EditQuestion({ question }: { question: IQuestion }) {
  const [isClosed, setIsClosed] = useState(true);
  const [questionValue, setQuestionValue] = useState(question.description);
  const dark = useAppSelector((state) => state.dark.dark);
  /* !MATERIAL TAILWIND NE PAS TOUCHER */
  const [open, setOpen] = useState(0);
  const dispatch = useAppDispatch();
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  /* !MATERIAL TAILWIND NE PAS TOUCHER */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const formObj = Object.fromEntries<string>(
      formData as Iterable<[PropertyKey, string]>
    );

    const header = {
      id: question.id,
      description: formObj.question,
      answers: question.answers.map((answer) => {
        return {
          id: answer.id,
          description: formObj[answer.id] || answer.description,
          is_good_answer: parseInt(formObj.is_good_answer, 10) === answer.id,
        };
      }),
    };
    dispatch(updateQuestions(header));
    setIsClosed(true);
  };
  const handleDelete = () => {
    dispatch(deleteQuestions(question.id));
  };

  if (isClosed) {
    return (
      <Accordion
        open={open === 1}
        className={`border border-blue-gray-100 px-4 rounded-lg mb-2 ${
          dark
            ? 'shadow-lg bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-white/10'
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
          <div className="flex justify-between w-full">
            {question.description}
            {open === 1 && (
              <div className="flex gap-5 items-center w-min text-white">
                <button
                  className="text-light-green-800"
                  onClick={() => {
                    setIsClosed(false);
                  }}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
                <button
                  className="text-red-900"
                  type="button"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </AccordionHeader>
        <AccordionBody className="text-base font-normal pt-0">
          <div className="flex flex-col gap-1 items-center">
            {question.answers.map((rep, index) => (
              <p
                key={rep.id}
                className={
                  rep.is_good_answer
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

  const answersList = question.answers.map((answer, index) => (
    <div key={answer.id} className="flex gap-5 justify-between">
      <div className="flex flex-col">
        <label htmlFor={`${answer.id}`}>Réponse</label>
        <Input
          className={`bg-white/10 shadow-lg py-3 rounded-full pl-3 ${
            dark
              ? 'shadow-lg shadow-deep-purple-700/20'
              : 'shadow-lg shadow-white/20'
          }`}
          id={`${answer.id}`}
          name={`${answer.id}`}
          placeholder={`reponse ${index + 1}`}
          defaultValue={answer.description}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="is_good_answer">Bonne Réponse ?</label>
        <input
          type="radio"
          name="is_good_answer"
          id={`${answer.description}`}
          value={`${answer.id}`}
          defaultChecked={answer.is_good_answer}
        />
      </div>
    </div>
  ));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event);
      }}
      className={`text-white border border-blue-gray-100 px-4 rounded-lg mb-2 p-3 flex flex-col gap-3 ${
        dark ? '' : 'bg-white/10'
      }`}
    >
      <label htmlFor="question">Question</label>
      <input
        type="text"
        className={`rounded-full bg-white/10 max-w-[500px] w-full py-2 pl-2 mt-2 shadow-lg ${
          dark
            ? 'shadow-lg shadow-deep-purple-700/20'
            : 'shadow-lg shadow-white/20'
        }`}
        name="question"
        id="question"
        placeholder="Votre question ?"
        value={questionValue}
        onChange={(e) => {
          setQuestionValue(e.target.value);
        }}
      />

      {answersList}

      <Button type="submit">Modifier la question</Button>
    </form>
  );
}

export default EditQuestion;
