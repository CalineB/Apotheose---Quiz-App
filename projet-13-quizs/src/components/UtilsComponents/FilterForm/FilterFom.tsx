import { useAppSelector } from '../../../hooks/redux';

interface IFilterFromProps {
  setTheme: React.Dispatch<React.SetStateAction<string | number>>;
  setDifficulty: React.Dispatch<React.SetStateAction<number | string>>;
  type: string;
  selected?: { tag: string | number; level: string | number };
}

function FilterFom({
  setTheme,
  setDifficulty,
  type,
  selected,
}: IFilterFromProps) {
  const filter = useAppSelector((state) => state.filtre);
  const dark = useAppSelector((state) => state.dark.dark);

  const tags = filter.tags.map((tag) => {
    return (
      <option
        key={tag.id}
        value={type === 'number' ? tag.id : tag.name}
        selected={!!selected && selected.tag === tag.name}
        className="text-black"
      >
        {tag.name}
      </option>
    );
  });

  const levels = filter.levels.map((level) => {
    return (
      <option
        key={level.id}
        value={type === 'number' ? level.id : level.name}
        selected={!!selected && selected.level === level.name}
        className="text-black"
      >
        {level.name}
      </option>
    );
  });
  return (
    <form className="flex flex-col w-full ">
      <label htmlFor="Thèmes">Thèmes</label>
      <select
        className={`peer w-full h-full bg-transparent   font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 ${
          dark
            ? 'text-white active:text-black  '
            : 'text-white active:text-black'
        }`}
        name="Thèmes"
        id="Thèmes"
        placeholder="Thèmes"
        onChange={(e) => {
          const value =
            type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
          setTheme(value);
        }}
      >
        <option value="">--Thèmes--</option>
        {tags}
      </select>
      <div className=" mt-3 ">
        <label htmlFor="Difficultés">Difficultés</label>
        <select
          className={`peer w-full h-full bg-transparent   font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 ${
            dark
              ? 'text-white active:text-black '
              : 'text-white active:text-black '
          }`}
          name="Difficultés"
          id="Difficultés"
          placeholder="Difficultés"
          onChange={(e) => {
            const value =
              type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
            setDifficulty(value);
          }}
        >
          <option value="">--Difficultés--</option>
          {levels}
        </select>
      </div>
    </form>
  );
}

export default FilterFom;
