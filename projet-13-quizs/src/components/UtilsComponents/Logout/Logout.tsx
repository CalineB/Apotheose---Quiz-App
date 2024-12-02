import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logout } from '../../../store/reducers/user';

function Logout() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLogged) {
      dispatch(logout());
    }
  }, [isLogged, dispatch]);
  return <Navigate replace to="/login" />;
}

export default Logout;
