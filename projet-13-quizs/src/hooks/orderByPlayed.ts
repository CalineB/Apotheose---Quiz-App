import { IHistory, IListQuiz } from '../@types/quiz';

export const orderByPlayed = (items: IListQuiz[]) => {
  let itemsSorted: IListQuiz[] = [];
  items.forEach((item) => {
    if (!itemsSorted.length) {
      itemsSorted.push(item);
    } else {
      const indexOfItem = itemsSorted.findIndex(
        (quiz) => quiz.played <= item.played
      );
      if (indexOfItem > 0) {
        itemsSorted = [
          ...itemsSorted.slice(0, indexOfItem),
          item,
          ...itemsSorted.slice(indexOfItem),
        ];
      } else if (indexOfItem === 0) {
        itemsSorted.unshift(item);
      } else {
        return itemsSorted.push(item);
      }
    }
  });
  return itemsSorted;
};

export function orderByKey<Type extends { id: number }>(items: Type[]): Type[] {
  let itemsSorted: typeof items = [];
  items.forEach((item) => {
    if (!itemsSorted.length) {
      itemsSorted.push(item);
    } else {
      const indexOfItem = itemsSorted.findIndex((quiz) => quiz.id > item.id);
      if (indexOfItem > 0) {
        itemsSorted = [
          ...itemsSorted.slice(indexOfItem),
          item,
          ...itemsSorted.slice(0, indexOfItem),
        ];
      } else if (indexOfItem === 0) {
        itemsSorted.push(item);
      } else {
        itemsSorted.unshift(item);
      }
    }
  });
  return itemsSorted;
}
