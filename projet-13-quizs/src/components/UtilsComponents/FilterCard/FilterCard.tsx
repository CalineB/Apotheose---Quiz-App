import { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import DeleteModal from '../DeleteModal/DeleteModal';

function FilterCard({
  title,
  handleDelete,
  handleSubmit,
  setName,
}: {
  title: string;
  handleDelete: () => void;
  handleSubmit: () => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const dark = useAppSelector((state) => state.dark.dark);
  return (
    <div
      className={` text-white px-2 py-4 flex justify-between pr-3 rounded-full shadow-xl w-full ${
        dark
          ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
          : 'bg-black/10 font-bold shadow-sm shadow-white/20'
      }`}
    >
      {!edit && title}
      {edit && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            defaultValue={title}
            onChange={(e) => {
              setName(e.target.value);
            }}
            name="name"
            id="name"
            className={` border border-black/30 p-2 rounded-full ${
              dark && 'bg-[#170f1f] text-white'
            }`}
            autoFocus
          />
        </form>
      )}
      <div className="flex gap-2">
        <button
          className="text-light-green-800"
          type="button"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </button>
        <button
          className="text-red-900"
          type="button"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {openModal && (
        <DeleteModal
          text="Êtes vous sur de vouloir supprimer cette Element"
          textdeux="Toutes les quiz associer seront perdu"
          onClick={() => () => {
            handleDelete();
          }}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
}

export default FilterCard;
