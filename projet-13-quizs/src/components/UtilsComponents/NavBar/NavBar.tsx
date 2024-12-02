import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import NavBarDesktop from './NavbarDesktop/NavBarDesktop';
import NavBarMobile from './NavBarMobile/NavBarMobile';

function NavBar() {
  const user = useAppSelector((state) => state.user);
  const width = useAppSelector((state) => state.screen.width);
  const location = useLocation();

  if (width > 1024) {
    return <NavBarDesktop location={location} user={user} />;
  }

  return <NavBarMobile location={location} user={user} />;
}

export default NavBar;
