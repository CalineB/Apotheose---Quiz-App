import { IFiltre } from '../@types/quiz';

const foundFilter = (filterList: IFiltre[], id: number | string) => {
  const item = filterList.find((filter) => filter.id === id);
  if (!item) {
    return 'error';
  }
  return item.name;
};

export default foundFilter;
