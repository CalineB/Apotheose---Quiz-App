import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Alert, Button } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addQuestions, fetchOneQuiz } from '../../../../store/reducers/quiz';
import Loading from '../../../Loading/Loading';
import FilterFom from '../../../UtilsComponents/FilterForm/FilterFom';
import EditQuestion from '../../../UtilsComponents/EditQuestion/EditQuestion';
import { updateQuiz } from '../../../../store/reducers/quizs';
import Input from '../../../UtilsComponents/Input/Input';
import { checkAdmin } from '../../../../store/reducers/user';

function PageEditQuiz() {
  const { id } = useParams() as { id: string };
  const dark = useAppSelector((state) => state.dark.dark);
  const filter = useAppSelector((state) => state.filtre);

  const dispatch = useAppDispatch();
  const selectedQuiz = useAppSelector((state) => state.quiz);
  const user = useAppSelector((state) => state.user);
  const { quiz, isLoading } = selectedQuiz;
  const [goodAnswer, setGoodAnswer] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState(quiz.name);
  const [theme, setTheme] = useState<string | number>(0);
  const [difficulty, setDifficulty] = useState<string | number>(0);
  useEffect(() => {
    const tagId = filter.tags.find((tag) => tag.name === quiz.tag);
    const levelId = filter.levels.find((level) => level.name === quiz.level);
    if (tagId && levelId) {
      setTheme(tagId.id);
      setDifficulty(levelId.id);
    }
  }, [filter, quiz]);
  useEffect(() => {
    dispatch(checkAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOneQuiz(parseInt(id, 10)));
  }, [dispatch, id]);
  if (user.checkedError) {
    return <Navigate replace to="/error" />;
  }
  if (!parseInt(id, 10)) {
    return <Navigate to="error" />;
  }
  if (isLoading) {
    return <Loading />;
  }
  const questionsList = quiz.questions.map((question) => (
    <EditQuestion question={question} key={question.id} />
  ));

  const handleClick = () => {
    const header = {
      id: parseInt(id, 10),
      name,
      tag: theme,
      level: difficulty,
    };
    dispatch(updateQuiz(header));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObj = Object.fromEntries<string>(
      formData as Iterable<[PropertyKey, string]>
    );
    const header = {
      id: parseInt(id, 10),
      description: formObj.question,
      answers: [
        {
          description: formObj.answer_1,
          is_good_answer: goodAnswer === 1,
        },
        {
          description: formObj.answer_2,
          is_good_answer: goodAnswer === 2,
        },
        {
          description: formObj.answer_3,
          is_good_answer: goodAnswer === 3,
        },
        {
          description: formObj.answer_4,
          is_good_answer: goodAnswer === 4,
        },
      ],
    };
    dispatch(addQuestions(header));
    setOpenForm(false);
  };

  if (!user.isLogged || user.role.name !== 'Admin') {
    return <Navigate to="/error" replace />;
  }
  return (
    <>
      {selectedQuiz.error && (
        <Alert className="text-center w-full p-2 justify-center" color="red">
          <span className="text-center">
            Une erreur est survenu veuillez vous reconnecté
          </span>
        </Alert>
      )}

      <Link
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-deep-purple-500 text-white shadow-md shadow-deep-purple-500/20 hover:shadow-lg hover:shadow-deep-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none my-5"
        to="/dashboard/quiz"
      >
        Retourner a la page de gestion des quiz
      </Link>

      <div
        className={`flex flex-col items-center w-[90%] max-w-[1000px] gap-5 mb-10  p-4 rounded-3xl ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-white/10 shadow-lg shadow-white/40'
        }`}
      >
        <div className="w-[90%] flex flex-col gap-2">
          <label htmlFor="namequiz" className="self-start text-white font-bold">
            Titre
          </label>
          <input
            className={`py-3 pl-2 rounded-3xl shadow-xl w-full ${
              dark
                ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40 border-white  border'
                : 'bg-white/10 text-white'
            }`}
            type="text"
            name="namequiz"
            id="namequiz"
            placeholder="Nom du Quiz"
            onChange={(e) => {
              setName(e.target.value);
            }}
            defaultValue={quiz.name}
          />
        </div>
        <section
          className={` rounded-3xl  max-w-[500px] w-full p-3 shadow-xl ${
            dark
              ? 'bg-[#170f1f] shadow-deep-purple-700/40'
              : 'bg-white/10 text-white '
          }`}
        >
          <div className="flex flex-col w-full ">
            <FilterFom
              setTheme={setTheme}
              setDifficulty={setDifficulty}
              selected={{ level: quiz.level, tag: quiz.tag }}
              type="number"
            />
          </div>
        </section>
        <Button
          className={dark ? 'shadow-lg' : ''}
          onClick={() => {
            handleClick();
          }}
        >
          Modifer les infos du quiz
        </Button>
      </div>
      <div
        className={`flex flex-col items-center w-[90%] max-w-[1000px] gap-5 mb-10 ${
          dark
            ? 'bg-[#170f1f] shadow-deep-purple-700/40 shadow-xl'
            : 'bg-white/10 shadow-lg shadow-white/40'
        } p-4 rounded-3xl`}
      >
        {questionsList}
      </div>

      {openForm && (
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
              dark ? 'shadow-lg ' : ''
            }`}
          >
            Finaliser la question
          </Button>
        </form>
      )}

      <Button
        className={`mt-3 mb-10 ${dark ? 'shadow-xl' : ''}`}
        color="deep-purple"
        onClick={() => {
          setOpenForm(!openForm);
        }}
      >
        {!openForm ? 'Ajouter une question' : 'Fermer le formulaire'}
      </Button>
    </>
  );
}

export default PageEditQuiz;
