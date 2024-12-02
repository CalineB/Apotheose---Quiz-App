import './App.scss';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updtateDimension } from '../../store/reducers/screen';
import { fetchQuiz } from '../../store/reducers/quizs';
import Loading from '../Loading/Loading';
import Page from '../Page/Page';
import { getFilter } from '../../store/reducers/filtre';
import { updateDark } from '../../store/reducers/dark';
import { relog } from '../../store/reducers/user';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.quizs.isLoading);

  const isLogged = useAppSelector((state) => state.user.isLogged);
  const token = localStorage.getItem('token');
  const darkStorage = localStorage.getItem('dark');
  const dark = useAppSelector((state) => state.dark.dark);

  useEffect(() => {
    const updateDimension = () => {
      dispatch(
        updtateDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };
    // Get all quiz and add them to store
    dispatch(fetchQuiz());
    // Get all filter and add them to store
    dispatch(getFilter());
    // Listen for window resize for responsive purpose
    dispatch(
      updtateDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );

    localStorage.removeItem('history');

    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [dispatch]);

  if (darkStorage && !dark) {
    dispatch(updateDark());
  }

  if (token && !isLogged) {
    dispatch(relog());
  }

  if (isLoading) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }

  return <Outlet />;
}

export default App;
