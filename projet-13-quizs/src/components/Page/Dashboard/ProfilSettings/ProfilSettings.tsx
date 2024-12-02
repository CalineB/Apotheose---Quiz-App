import { useEffect, useState } from 'react';
import { Alert } from '@material-tailwind/react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  checkUser,
  deleteProfil,
  modifProfil,
} from '../../../../store/reducers/user';
import DeleteModal from '../../../UtilsComponents/DeleteModal/DeleteModal';

function ProfilSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [pseudo, setPseudo] = useState(user.pseudo);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const dark = useAppSelector((state) => state.dark.dark);

  useEffect(() => {
    dispatch(checkUser);
  }, [dispatch]);

  const handleSaveAccount = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries<string>(
      formData as Iterable<[PropertyKey, string]>
    );
    const header = {
      id: user.id,
      ...objData,
    };
    dispatch(modifProfil(header));
  };

  const handleDeleteAccount = () => {
    setOpenModal(true);
  };
  if (!user.isLogged) {
    return <Navigate to="/login" replace />;
  }
  if (user.checkedError) {
    return <Navigate to="/error" replace />;
  }
  return (
    <div className="h-full w-screen max-h-screen">
      {user.error && (
        <Alert className="text-center w-full p-2 justify-center" color="red">
          <span className="text-center">
            Une erreur est survenu veuillez réessayer ultérieurement
          </span>
        </Alert>
      )}
      <div
        className={`flex flex-col w-[90%] max-w-[400px] mx-auto rounded-2xl justify-center items-center h-full  py-20 mb-10 ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-white/10 shadow-md shadow-white/80 bg-deep-purple-700'
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveAccount(e);
          }}
          className="flex flex-col relative w-min gap-10 "
        >
          <h2 className="flex justify-center font-bold text-deep-orange-300 text-5xl w-64">
            Profilmodif
          </h2>

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label
                className={`font-bold w-full ${
                  dark ? 'text-white' : 'text-deep-purple-600'
                }`}
                htmlFor="pseudo"
              >
                Pseudonyme
              </label>
              <input
                type="text"
                className={`border-none w-full p-2 rounded-xl ${
                  dark ? 'bg-[#2f1828]' : ''
                }`}
                name="pseudo"
                id="pseudo"
                placeholder="Nouveau Pseudo"
                aria-label="Pseudonyme"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                className={` font-bold w-full ${
                  dark ? 'text-white' : 'text-deep-purple-600'
                }`}
                htmlFor="Email"
              >
                E-mail
              </label>
              <input
                type="email"
                className={`border-none w-full p-2 rounded-xl ${
                  dark ? 'bg-[#2f1828]' : ''
                }`}
                name="email"
                id="email"
                placeholder="Nouveau Email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className={`font-bold w-full ${
                  dark ? 'text-white' : 'text-deep-purple-600'
                }`}
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                type="password"
                className={`border-none w-full p-2 rounded-xl ${
                  dark ? 'bg-[#2f1828]' : ''
                }`}
                name="password"
                id="password"
                placeholder="Nouveau mot de passe"
                aria-label="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col pr-30">
            <button
              className={`border-none rounded-xl text-white p-2 mb-2 font-bold ${
                dark
                  ? 'bg-deep-purple-500 shadow-md shadow-deep-purple-500/40'
                  : 'bg-deep-purple-600'
              }`}
              type="submit"
            >
              Enregistrer mes informations
            </button>

            <button
              type="button"
              onClick={() => {
                handleDeleteAccount();
              }}
              className={`border-none rounded-xl text-white p-2 mb-2 font-bold ${
                dark ? 'bg-red-700 shadow-md shadow-red-700/40' : 'bg-red-800'
              }`}
            >
              Supprimer mon compte
            </button>
          </div>
        </form>
      </div>
      {openModal && (
        <DeleteModal
          text=" Êtes vous sur de vouloir supprimer votre compte ?"
          textdeux="Toute les données enregistrer seront perdu"
          onClick={() => () => {
            dispatch(deleteProfil(user.id));
          }}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
}

export default ProfilSettings;
