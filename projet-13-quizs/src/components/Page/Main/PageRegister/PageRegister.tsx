import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { register } from '../../../../store/reducers/user';
import Loading from '../../../Loading/Loading';

function PageRegister() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [username, setUsername] = useState('');
  const [empty, setEmpty] = useState<string>('');
  const user = useAppSelector((state) => state.user);
  const [sent, setSent] = useState(false);
  const { isLoading, error } = user;
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state) => state.dark.dark);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!username) {
      setEmpty('pseudo');
      return setTimeout(() => {
        setEmpty('');
      }, 1500);
    }
    if (!email) {
      setEmpty('email');
      return setTimeout(() => {
        setEmpty('');
      }, 1500);
    }
    if (!pass) {
      setEmpty('pass');
      return setTimeout(() => {
        setEmpty('');
      }, 1500);
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObj = Object.fromEntries<string>(
      formData as Iterable<[PropertyKey, string]>
    );
    dispatch(register(formObj));
  };
  const word = [
    'Welcome!',
    'Bienvenidos!',
    'Bienvenue!',
    'Willkommen!',
    'Salam!',
    'Benvenuti!',
  ];
  const [wordIndex, setWordIndex] = useState(0);
  if (isLoading) {
    return <Loading />;
  }
  if (sent && !error) {
    return <Navigate to="/login" />;
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
        } pt-20 pb-10 mb-10 ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-white/10 shadow-md shadow-white/80'
        } `}
      >
        <form
          className="flex flex-col relative w-min gap-10 "
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            handleSubmit(e);
          }}
        >
          {empty === 'email' && (
            <div className="m-0  text-center w-64 p-2 justify-center bg-blue-500 text-white font-bold rounded-2xl h-min">
              <span className="text-center">
                Vous devez renseigner un email
              </span>
            </div>
          )}
          {empty === 'pass' && (
            <div className="m-0  text-center w-64 p-2 justify-center bg-blue-500 text-white font-bold rounded-2xl h-min">
              <span className="text-center">
                Vous devez renseigner un mot de passe
              </span>
            </div>
          )}
          {empty === 'pseudo' && (
            <div className="m-0  text-center w-64 p-2 justify-center bg-blue-500 text-white font-bold rounded-2xl h-min">
              <span className="text-center">
                Vous devez renseigner un pseudonyme
              </span>
            </div>
          )}
          {sent && error && (
            <div className="m-0  text-center w-64 p-2 justify-center bg-red-800 text-white font-bold rounded-2xl h-min">
              <span className="text-center">
                Email ou pseudonyme déja utilisé
              </span>
            </div>
          )}
          {!empty && (
            <h2
              className={`flex justify-center font-bold text-deep-orange-300 text-5xl w-64 transition-all animate-pulse 
              ${dark && '[text-shadow:_0_3px_0_rgb(230_74_25_/_40%)] '}`}
            >
              {word[wordIndex]}
            </h2>
          )}
          <div className="flex flex-col gap-4">
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
                type="text"
                className={`rounded-xl p-2 w-full text-black ${
                  empty === 'pseudo' ? 'border-2 border-red-900' : ''
                }  ${dark ? 'bg-[#2f1828] text-white' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="pseudo"
                id="pseudo"
                placeholder="monPseudo"
                aria-label="Pseudonyme"
              />
            </div>
            <div>
              <label
                className={`font-extrabold font-bold w-full ${
                  dark ? 'text-white' : 'text-deep-purple-600'
                }`}
                htmlFor="Email"
              >
                E-mail
              </label>
              <input
                type="email"
                className={`rounded-xl p-2 w-full text-black ${
                  empty === 'email' ? 'border-2 border-red-900' : ''
                }  ${dark ? 'bg-[#2f1828] text-white' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                placeholder="tonemail@gmail.com"
                aria-label="Email"
              />
            </div>
            <div>
              <label
                className={`font-extrabold font-bold w-full ${
                  dark ? 'text-white' : 'text-deep-purple-600'
                }`}
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                type="password"
                className={`rounded-xl p-2 w-full text-black ${
                  empty === 'pass' ? 'border-2 border-red-900' : ''
                }  ${dark ? 'bg-[#2f1828] text-white' : ''}`}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                name="password"
                id="password"
                placeholder="Mot de passe"
                aria-label="Mot de passe"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <button
              className={`border-none font-bold  rounded-xl text-white p-2 mb-2 ${
                dark
                  ? 'bg-deep-purple-500 shadow-md shadow-deep-purple-500/40'
                  : 'bg-deep-purple-600 '
              }`}
              type="submit"
            >
              S&apos;enregistrer
            </button>

            <Link
              className={`border-none font-bold text-center rounded-xl text-white p-2 mb-2 ${
                dark
                  ? 'bg-deep-purple-500 shadow-md shadow-deep-purple-500/40'
                  : 'bg-deep-purple-600'
              }`}
              to="/login"
            >
              Se connecter
            </Link>
          </div>
        </form>
        <small className="text-white w-[90%] font-bold mt-2">
          En cliquant sur s&apos;enregistrer vous accepter nos{' '}
          <Link
            to="/CGU"
            target="_blank"
            className="text-blue-200 hover:text-deep-purple-200 decoration-none"
          >
            Conditions Générales d&apos;Utilisation
          </Link>{' '}
          ainsi que notre{' '}
          <Link
            to="/RGPD"
            target="_blank"
            className="text-blue-200 hover:text-deep-purple-200 decoration-none"
          >
            Politique de confidentialité
          </Link>{' '}
        </small>
      </div>
    </div>
  );
}

export default PageRegister;
