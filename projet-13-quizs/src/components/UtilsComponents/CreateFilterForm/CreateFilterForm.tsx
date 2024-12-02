import { useState } from 'react';
import { ButtonGroup, Button } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addLevel, addTag } from '../../../store/reducers/filtre';

function CreateFilterForm({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dark = useAppSelector((state) => state.dark.dark);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const handleAddTag = () => {
    setIsModalOpen(false);
    dispatch(addTag({ name: title }));
  };
  const handleAddLevel = () => {
    setIsModalOpen(false);
    dispatch(addLevel({ name: title }));
  };
  return (
    <div className="flex flex-col gap-3 w-[80%] mx-auto">
      <label
        htmlFor="Title"
        className={dark ? ' text-white font-bold' : 'text-white font-bold'}
      >
        Nom du filtre
      </label>
      <input
        className={`rounded-xl py-2 pl-2 shadow-xl ${
          dark
            ? 'bg-[#2f1828] text-white'
            : 'bg-black/10 shadow-white/20 text-white font-bold'
        }`}
        type="text"
        name="Title"
        id="Title"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ButtonGroup
        className={`gap-3 justify-center ${dark ? '' : ''}`}
        color="deep-purple"
      >
        <Button
          className={dark ? 'shadow-lg shadow-deep-purple-700/90 ' : ''}
          onClick={() => {
            handleAddTag();
          }}
        >
          Ajouter un thème
        </Button>
        <Button
          className={dark ? 'shadow-lg shadow-deep-purple-700/90 ' : ''}
          onClick={() => {
            handleAddLevel();
          }}
        >
          Ajouter la difficulté
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default CreateFilterForm;
