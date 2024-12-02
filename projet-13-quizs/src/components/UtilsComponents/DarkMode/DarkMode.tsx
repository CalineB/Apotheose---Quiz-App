import moon from '../../../assets/moon.png';
import light from '../../../assets/light.png';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateDark } from '../../../store/reducers/dark';

function DarkMode() {
  const dark = useAppSelector((state) => state.dark.dark);
  const dispatch = useAppDispatch();
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(updateDark());
      }}
      className="flex border-none focus:outline-0 h-30 w-30 "
    >
      <img
        className="w-20 cursor-pointer"
        src={dark ? moon : light}
        alt="darkMode"
      />
    </button>
  );
}

export default DarkMode;
