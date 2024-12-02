import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Alert } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { login, relog } from '../../../../store/reducers/user';
import Loading from '../../../Loading/Loading';

function PageLogin() {
  const user = useAppSelector((state) => state.user);
  const historyError = useAppSelector((state) => state.history.error);
  const { isLogged, isLoading, registered } = user;
  const [account, setAccount] = useState(false);
  const word = ['Hello!', 'Hola!', 'Salut!', 'Hallo!', 'Salam!', 'Ciao!'];
  const [wordIndex, setWordIndex] = useState(0);
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state) => state.dark.dark);
  const [showMessage, setShowmessage] = useState(true);

  setTimeout(() => {
    setShowmessage(false);
  }, 3000);
  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const objData = Object.fromEntries<string>(
      formData as Iterable<[PropertyKey, string]>
    );
    dispatch(login(objData));
    setAccount(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isLogged) {
    return <Navigate replace to="/dashboard" />;
  }

  setTimeout(() => {
    if (wordIndex < word.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setWordIndex(0);
    }
  }, 4000);

  return (
    <div className="h-full w-screen ">
      <div
        className={`flex flex-col w-[90%] max-w-[400px] mx-auto rounded-2xl justify-center items-center h-full ${
          !dark && 'bg-deep-purple-700'
        } py-20 mb-10 ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-white/10 shadow-md shadow-white/80'
        }`}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSumbit(event);
          }}
          className=" flex flex-col justify-center relative w-[80%] max-w-[400px] gap-10"
        >
          <h2
            className={`flex justify-center font-bold text-deep-orange-300 text-5xl  transition-all animate-pulse 
            ${dark && '[text-shadow:_0_3px_0_rgb(230_74_25_/_40%)] '}`}
          >
            {word[wordIndex]}
          </h2>{' '}
          {historyError && account && showMessage && (
            <Alert
              className="text-center w-full p-2 justify-center"
              color="red"
            >
              <span className="text-center">
                Une erreur est survenu veuillez vous reconnecté
              </span>
            </Alert>
          )}
          {user.error && showMessage && (
            <Alert
              className="text-center w-full p-2 justify-center"
              color="red"
            >
              <span className="text-center">
                Mauvais Pseudonyme ou Mot de passe
              </span>
            </Alert>
          )}
          {registered && showMessage && (
            <Alert
              className="text-center w-full p-2 justify-center"
              color="green"
            >
              <span className="text-center">Votre compte a bien été créer</span>
            </Alert>
          )}
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <label
                className={`font-extrabold font-bold w-full ${
                  dark ? 'text-white' : 'text-deep-purple-600'
                }`}
                htmlFor="pseudo"
              >
                Pseudonyme
              </label>
              <input
                className={` rounded-xl p-2 w-full ${
                  dark ? 'bg-[#2f1828] text-white' : ''
                }`}
                type="text"
                placeholder="monPseudo"
                name="pseudo"
                id="pseudo"
                aria-label="Pseudonyme"
              />
            </div>
            <div className="w-full">
              <label
                className={`font-extrabold font-bold w-full ${
                  dark ? 'text-white' : 'text-deep-purple-600'
                }`}
                htmlFor="Mot de passe"
              >
                Mot de passe
              </label>
              <input
                className={` rounded-xl p-2 w-full ${
                  dark ? 'bg-[#2f1828] text-white' : ''
                }`}
                type="password"
                placeholder="Mot de passe"
                name="password"
                id="password"
                aria-label="Mot de passe"
              />
            </div>
          </div>
          <div className="flex flex-col pr-30">
            <button
              className={`font-bold border-none rounded-xl text-white p-2 mb-2 ${
                dark
                  ? 'bg-deep-purple-500 shadow-md shadow-deep-purple-500/40'
                  : 'bg-deep-purple-600'
              }`}
              type="submit"
            >
              Se connecter
            </button>

            <Link
              className={`font-bold border-none text-center rounded-xl text-white p-2 mb-2 ${
                dark
                  ? 'bg-deep-purple-500 shadow-md shadow-deep-purple-500/40'
                  : 'bg-deep-purple-600'
              }`}
              to="/register"
            >
              {' '}
              S&apos;enregistrer
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PageLogin;
