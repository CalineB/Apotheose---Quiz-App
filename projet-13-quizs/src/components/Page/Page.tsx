import { useEffect } from 'react';
import NavBar from '../UtilsComponents/NavBar/NavBar';
import logo from '../../assets/ApotheoseLogo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { relog } from '../../store/reducers/user';

import DarkMode from '../UtilsComponents/DarkMode/DarkMode';
import { updateDark } from '../../store/reducers/dark';

function Page({ children }: { children: JSX.Element }) {
  const dark = useAppSelector((state) => state.dark.dark);
  return (
    <div
      className={`flex flex-col items-center max-w-screen  pb-8 bg-[#9c8bef]  ${
        dark ? 'bg-gradient-to-br from-[#2e1927] to-[#170f2f]' : ''
      } min-h-screen  overflow-hidden`}
    >
      <img src={logo} className="px-10 py-3 max-w-[400px] " alt="Logo" />
      <DarkMode />
      <NavBar />
      {children}
    </div>
  );
}

export default Page;
