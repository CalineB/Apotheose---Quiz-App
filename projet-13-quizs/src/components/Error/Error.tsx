import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import ouvatu from '../../assets/OUVATU.svg';
import { useAppSelector } from '../../hooks/redux';

function Error() {
  const dark = useAppSelector((state) => state.dark.dark);
  return (
    <div
      className={`  w-screen   ${
        dark
          ? 'bg-gradient-to-br from-[#2e1927] to-[#170f2f] text-white'
          : 'bg-[#9c8bef]'
      } h-screen `}
    >
      <div className="absolute top-1/2 translate-y-[-50%] left-1/2  translate-x-[-50%] w-auto flex flex-col">
        <img
          src={ouvatu}
          className="  max-w-[400px] min-w-[200px] "
          alt="Logo"
        />

        <h3 className="font-bold text-center text-2xl">Erreur 404</h3>
        <Typography className="text-center text-xl">
          Cette page n&apos;éxiste pas
        </Typography>
        <Link
          to="/"
          className="bg-deep-purple-800 m-5 text-white p-3 rounded-2xl"
        >
          Clique ici pour retourner a l&apos;acceuil
        </Link>
      </div>
    </div>
  );
}

export default Error;
