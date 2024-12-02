import { useEffect, useState } from 'react';
import { Alert } from '@material-tailwind/react';
import { Navigate } from 'react-router-dom';
import CreateFilterForm from '../../../UtilsComponents/CreateFilterForm/CreateFilterForm';
import FilterCard from '../../../UtilsComponents/FilterCard/FilterCard';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import Loading from '../../../Loading/Loading';
import {
  deleteLevel,
  deleteTag,
  patchLevel,
  patchTag,
} from '../../../../store/reducers/filtre';
import { IFiltre } from '../../../../@types/quiz';
import { checkAdmin } from '../../../../store/reducers/user';

function PageGestionFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const user = useAppSelector((state) => state.user);
  const filter = useAppSelector((state) => state.filtre);
  const [search, setSearch] = useState('');
  const dark = useAppSelector((state) => state.dark.dark);

  const [filteredFilter, setFilteredFilter] = useState<{
    tags: IFiltre[];
    levels: IFiltre[];
  }>(filter);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAdmin());
  }, [dispatch]);
  useEffect(() => {
    setFilteredFilter({
      levels: filter.levels.filter((level) =>
        level.name.toLowerCase().includes(search.toLowerCase())
      ),
      tags: filter.tags.filter((tag) =>
        tag.name.toLowerCase().includes(search.toLowerCase())
      ),
    });
  }, [filter, search]);

  const handleSwitchModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  if (user.checkedError) {
    return <Navigate replace to="/error" />;
  }
  if (filter.isLoading) {
    return <Loading />;
  }
  if (!user.isLogged || user.role.name !== 'Admin') {
    return <Navigate to="/error" replace />;
  }

  const TagCard = filteredFilter.tags.map((tag) => (
    <FilterCard
      key={tag.id}
      title={tag.name}
      handleDelete={() => {
        dispatch(deleteTag(tag.id));
      }}
      handleSubmit={() => {
        dispatch(patchTag({ id: tag.id, name }));
      }}
      setName={setName}
    />
  ));
  const LevelCard = filteredFilter.levels.map((level) => (
    <FilterCard
      key={level.id}
      title={level.name}
      handleDelete={() => {
        dispatch(deleteLevel(level.id));
      }}
      handleSubmit={() => {
        dispatch(patchLevel({ id: level.id, name }));
      }}
      setName={setName}
    />
  ));
  return (
    <div className="flex flex-col gap-4 w-[90%] mt-3 max-w-[1000px]">
      {filter.error && (
        <Alert className="text-center w-full p-2 justify-center" color="red">
          <span className="text-center">
            Une erreur est survenu veuillez éssayer a nouveau
          </span>
        </Alert>
      )}
      <input
        className={`rounded-3xl py-3 pl-2 shadow-xl ${
          dark
            ? 'shadow-2xl bg-[#170f1f] text-white shadow-deep-purple-700/40'
            : 'bg-black/10 shadow-white/20 text-white font-bold'
        }`}
        type="text"
        name="TagDifficult"
        id="TagDifficult"
        placeholder="Nom Thème/Difficulté"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div className="flex justify-center">
        <button
          className={`flex justify-center text-white rounded-full  ${
            dark
              ? 'shadow-md shadow-deep-purple-500 bg-[#170f1f]'
              : 'bg-black/10 shadow-xl '
          }`}
          onClick={handleSwitchModal}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 transition-transform ${
              isModalOpen ? 'rotate-45' : ''
            } `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      {isModalOpen && <CreateFilterForm setIsModalOpen={setIsModalOpen} />}

      <section
        className={`flex gap-3 ${
          !!TagCard.length && !!LevelCard.length
            ? 'justify-between'
            : 'justify-center'
        }`}
      >
        {!!TagCard.length && (
          <div className="w-[40%] flex flex-col items-center gap-2">
            <h3 className="font-bold text-white text-xl">Thème</h3>
            {TagCard}
          </div>
        )}
        {!!LevelCard.length && (
          <div className="w-[40%] flex flex-col items-center gap-2">
            <h3 className="font-bold text-white text-xl">Difficulté</h3>
            {LevelCard}
          </div>
        )}
      </section>
    </div>
  );
}

export default PageGestionFilter;
