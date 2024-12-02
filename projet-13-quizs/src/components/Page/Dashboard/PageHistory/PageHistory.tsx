import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-tailwind/react';
import { Navigate } from 'react-router-dom';
import HistoryItem from '../../../UtilsComponents/HistoryItem/HistoryItem';
import { getHistory } from '../../../../store/reducers/history';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import Loading from '../../../Loading/Loading';
import foundFilter from '../../../../hooks/foundFilter';
import FilterFom from '../../../UtilsComponents/FilterForm/FilterFom';
import { checkUser } from '../../../../store/reducers/user';

function PageHistory() {
  const [theme, setTheme] = useState<string | number>('');
  const [difficulty, setDifficulty] = useState<string | number>('');
  const dark = useAppSelector((state) => state.dark.dark);
  const [next, setNext] = useState(5);
  const [prev, setPrev] = useState(0);
  const user = useAppSelector((state) => state.user);
  const quizs = useAppSelector((state) => state.quizs.list);
  const filtre = useAppSelector((state) => state.filtre);
  const historyState = useAppSelector((state) => state.history);
  const { history, isLoading } = historyState;
  const dispatch = useAppDispatch();
  const [filteredList, setFilteredList] = useState(history);
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  useEffect(() => {
    setFilteredList(
      history.filter((historyItem) => {
        const quiz = quizs.find((item) => item.id === historyItem.quiz_id);
        if (quiz) {
          return (
            foundFilter(filtre.tags, quiz.tag_id).includes(theme.toString()) &&
            foundFilter(filtre.levels, quiz.level_id).includes(
              difficulty.toString()
            )
          );
        }
        return null;
      })
    );
  }, [theme, difficulty, filtre, history, quizs]);
  useEffect(() => {
    if (!history) {
      dispatch(getHistory(user.id));
    }
  }, [dispatch, user, history]);
  let historyItem;
  if (filteredList.length) {
    historyItem = filteredList
      .slice(prev, next)
      .map((item) => <HistoryItem key={item.id} data={item} />);
  } else {
    historyItem = [
      <div className="text-white" key={1}>
        <h5 className="font-bold text-center">Rien ici pour l&apos;instant</h5>
        <h5 className="font-bold text-center">
          Jouer des parties pour obtenir votre Historique
        </h5>
      </div>,
    ];
  }
  if (user.checkedError) {
    return <Navigate replace to="/error" />;
  }
  if (!user.isLogged) {
    return <Navigate replace to="/login" />;
  }
  if (historyState.error) {
    return <Navigate replace to="/login" />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-8 items-center h-full mb-10 ">
      <section
        className={` rounded-3xl w-[90vw] max-w-[400px] p-3 ${
          dark
            ? 'bg-[#170f1f] text-white shadow-xl shadow-deep-purple-500/40'
            : 'bg-white/10 shadow-white/10 shadow-md text-white'
        }`}
      >
        <div className="flex flex-col w-full ">
          <FilterFom
            setTheme={setTheme}
            setDifficulty={setDifficulty}
            type="string"
          />
        </div>
      </section>
      <section
        className={` rounded-3xl w-[90vw] max-w-[1000px] p-3 shadow-xl h-full flex flex-col gap-5 ${
          dark
            ? 'bg-[#170f1f] text-white shadow-xl shadow-deep-purple-500/40'
            : 'bg-white/10'
        }`}
      >
        {historyItem}
        <ButtonGroup className="flex w-full justify-center" color="deep-purple">
          <Button
            disabled={prev <= 0}
            onClick={() => {
              setNext(next - 5);
              setPrev(prev - 5);
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
              setNext(next + 5);
              setPrev(prev + 5);
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
      </section>
    </div>
  );
}

export default PageHistory;
