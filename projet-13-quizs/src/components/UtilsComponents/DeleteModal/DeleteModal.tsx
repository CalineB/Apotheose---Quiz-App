import React from 'react';
import { useAppSelector } from '../../../hooks/redux';

function DeleteModal({
  setOpenModal,
  onClick,
  text,
  textdeux,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  textdeux: string;
}) {
  const dark = useAppSelector((state) => state.dark.dark);
  return (
    <section className="max-w-screen w-full h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm">
      <div
        className={` p-10   rounded-xl border-none ${
          dark
            ? 'bg-[#170f1f] shadow-lg shadow-deep-purple-700/40'
            : 'bg-deep-purple-700'
        }`}
      >
        <h1 className=" text-white font-bold text-center mb-4">{text}</h1>
        <h3 className=" text-white font-bold text-center mb-4">{textdeux}</h3>
        <div className="flex flex-row justify-center gap-6 bg-transparent border-0">
          <button
            type="button"
            onClick={() => {
              setOpenModal(false);
            }}
            className={`align-middle select-none font-sans text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none text-white font-bold bg-light-green-400 border-0 rounded-r-lg ${
              dark
                ? 'shadow-lg shadow-light-green-400/40 hover:shadow-light-green-400/70'
                : ''
            }`}
          >
            Non
          </button>
          <button
            type="button"
            className={` align-middle select-none font-sans text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none text-white font-bold bg-red-800 border-0 rounded-l-lg ${
              dark ? 'shadow-lg shadow-red-800/40 hover:shadow-red-800/70' : ''
            }`}
            onClick={onClick()}
          >
            Oui
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteModal;
