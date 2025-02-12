import { Navigate, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import HistoryItem from '../../../UtilsComponents/HistoryItem/HistoryItem';
import { checkUser, logout } from '../../../../store/reducers/user';
import Loading from '../../../Loading/Loading';
import { getHistory, postHistory } from '../../../../store/reducers/history';

function PageProfil() {
  const user = useAppSelector((state) => state.user);
  const historyState = useAppSelector((state) => state.history);
  const { history, isLoading, moy } = historyState;
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state) => state.dark.dark);
  const [isLogOut, setIsLogOut] = useState(false);
  const localHistory = localStorage.getItem('history');

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.isLogged) {
      dispatch(getHistory(user.id));
    }
  }, [dispatch, user]);

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
  let historyItem;
  if (history.length) {
    historyItem = history
      .slice(0, 5)
      .map((item) => <HistoryItem key={item.id} data={item} />);
  } else {
    historyItem = [
      <div key={1}>
        <h5 className="font-bold text-center">Rien ici pour l&apos;instant</h5>
        <h5 className="font-bold text-center">
          Jouer des parties pour obtenir votre Historique
        </h5>
      </div>,
    ];
  }
  if (isLogOut) {
    return <Navigate replace to="/" />;
  }
  if (localHistory) {
    const objLocalHistory = JSON.parse(localHistory);
    objLocalHistory.history.forEach(
      (item: { score: number; max_score: number; quiz_id: number }) => {
        const header = {
          ...item,
          user_id: user.id,
        };
        dispatch(postHistory(header));
      }
    );
    localStorage.removeItem('history');
  }
  return (
    <section
      className={`w-[90%] max-w-[1000px] mx-auto rounded-xl py-3 mb-10 mt-2 ${
        dark
          ? 'bg-[#170f1f] text-white shadow-xl shadow-deep-purple-500/40'
          : 'bg-white/10 text-white font-bold shadow-lg shadow-white/40'
      }`}
    >
      <h3 className=" flex flex-row justify-center text-2xl text-center">
        Bienvenue {user.pseudo} !
        <Link
          to="/dashboard/settings"
          className="flex justify-center items-center ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
            <path
              fillRule="evenodd"
              d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </h3>
      <h4 className="text-xl text-center my-3">
        Score: {moy ? `${moy.toString().slice(0, 5)} / 20` : '???'}
      </h4>
      <h4 className="pl-2 text-2xl my-3">Historique des Parties</h4>
      <div className="flex flex-col gap-2">{historyItem}</div>
      <div className="mx-auto mt-8 mb-3 w-full flex justify-center">
        <Button
          color="deep-purple"
          onClick={() => {
            setIsLogOut(true);
            dispatch(logout());
          }}
        >
          Se Déconnecter
        </Button>
      </div>
    </section>
  );
}

export default PageProfil;
