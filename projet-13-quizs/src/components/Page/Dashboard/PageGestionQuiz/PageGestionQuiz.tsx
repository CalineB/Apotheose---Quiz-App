import { useEffect, useState } from 'react';
import { Alert } from '@material-tailwind/react';
import { Link, Navigate } from 'react-router-dom';
import Icon from '../../../UtilsComponents/Icon/Icon';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import foundFilter from '../../../../hooks/foundFilter';
import { checkAdmin } from '../../../../store/reducers/user';

function PageGestionQuiz() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const quizs = useAppSelector((state) => state.quizs.list);
  const quizError = useAppSelector((state) => state.quizs.error);
  const [name, setName] = useState('');
  const [filteredQuiz, setFilteredQuiz] = useState(quizs);
  const filtre = useAppSelector((state) => state.filtre);
  const dark = useAppSelector((state) => state.dark.dark);
  useEffect(() => {
    dispatch(checkAdmin());
  }, [dispatch]);
  useEffect(() => {
    setFilteredQuiz(
      quizs.filter(
        (quiz) =>
          foundFilter(filtre.tags, quiz.tag_id)
            .toLowerCase()
            .includes(name.toLowerCase()) ||
          foundFilter(filtre.levels, quiz.level_id)
            .toLowerCase()
            .includes(name.toLowerCase()) ||
          quiz.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  }, [quizs, name, filtre]);
  if (user.checkedError) {
    return <Navigate replace to="/error" />;
  }

  if (!user.isLogged || user.role.name !== 'Admin') {
    return <Navigate to="/error" replace />;
  }
  return (
    <section className="flex flex-col items-center gap-7 w-[90%] mt-3 max-w-[1000px]">
      {quizError && (
        <Alert className="text-center w-full p-2 justify-center" color="red">
          <span className="text-center">
            Une erreur est survenu veuillez éssayer a nouveau
          </span>
        </Alert>
      )}
      <Link
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-deep-purple-600 text-white shadow-md shadow-deep-purple-500/20 hover:shadow-lg hover:shadow-deep-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none max-w-[400px]"
        to="/dashboard/quiz/create"
      >
        Créer un nouveau quiz
      </Link>

      <input
        className={`py-3 pl-2 rounded-3xl shadow-xl w-full ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-black/10 shadow-white/20 text-white font-bold'
        }`}
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        name="Search"
        id="Search"
        placeholder="Rechercher un quiz"
      />
      <div className="flex justify-center" />
      {filteredQuiz.map((quiz) => {
        return (
          <Icon
            id={quiz.id}
            key={quiz.id}
            title={quiz.name}
            tag={foundFilter(filtre.tags, quiz.tag_id)}
            level={foundFilter(filtre.levels, quiz.level_id)}
          />
        );
      })}
    </section>
  );
}

export default PageGestionQuiz;
