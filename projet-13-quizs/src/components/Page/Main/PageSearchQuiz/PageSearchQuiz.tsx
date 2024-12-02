import { Button, ButtonGroup } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import QuizContainer from '../../../UtilsComponents/QuizContainer/QuizContainer';
import { useAppSelector } from '../../../../hooks/redux';
import FilterFom from '../../../UtilsComponents/FilterForm/FilterFom';
import foundFilter from '../../../../hooks/foundFilter';

function PageSearchQuiz() {
  const listQuiz = useAppSelector((state) => state.quizs.list);
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(12);
  const filtre = useAppSelector((state) => state.filtre);
  const [name, setName] = useState('');
  const dark = useAppSelector((state) => state.dark.dark);
  const [difficulty, setDifficulty] = useState<string | number>('');
  const [theme, setTheme] = useState<string | number>('');
  const [filteredList, setFilteredList] = useState(listQuiz);
  const width = useAppSelector((state) => state.screen.width);
  useEffect(() => {
    setFilteredList(
      listQuiz.filter(
        (quiz) =>
          foundFilter(filtre.tags, quiz.tag_id).includes(theme.toString()) &&
          foundFilter(filtre.levels, quiz.level_id).includes(
            difficulty.toString()
          ) &&
          quiz.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  }, [theme, difficulty, listQuiz, name, filtre]);

  return (
    <div className="flex flex-col items-center gap-4 max-w-[1200px]">
      <input
        className={`  rounded-3xl  w-[70vw] max-w-[400px] p-2 mt-5 shadow-xl ${
          dark
            ? 'bg-[#170f1f] text-white shadow-md shadow-deep-purple-500/40'
            : 'bg-black/10 text-white font-bold shadow-white/20'
        } `}
        type="Search"
        name="Search"
        id="Search"
        placeholder="Recherche"
        onChange={(e) => {
          setName(e.target.value.trim());
        }}
      />
      <section
        className={` rounded-3xl  w-[70vw] max-w-[400px] p-3 ${
          dark
            ? 'shadow-xl shadow-deep-purple-500/40 bg-[#170f1f] text-white'
            : 'bg-black/10 shadow-xl shadow-white/10 text-white'
        }`}
      >
        <FilterFom
          setTheme={setTheme}
          setDifficulty={setDifficulty}
          type="string"
        />
      </section>

      {!!filteredList.length && (
        <QuizContainer listQuiz={filteredList.slice(prev, next)} />
      )}

      {!filteredList.length && (
        <div className="w-screen h-[200px] flex justify-center items-center ">
          <h3 className="font-bold text-2xl text-white">
            Désolé aucun quiz ne correspond a la sélection
          </h3>
        </div>
      )}
      {width > 1024 && (
        <ButtonGroup
          className="flex justify-center shadow-md  shadow-deep-purple-500/40 rounded-lg"
          color="deep-purple"
        >
          <Button
            disabled={prev <= 0}
            onClick={() => {
              setNext(next - 12);
              setPrev(prev - 12);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </Button>
          <Button
            disabled={next >= filteredList.length}
            onClick={() => {
              setNext(next + 12);
              setPrev(prev + 12);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
}

export default PageSearchQuiz;
