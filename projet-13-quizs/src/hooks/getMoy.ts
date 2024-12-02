import { IHistory } from '../@types/quiz';

export default function getMoy(scores: IHistory[]) {
  let result = 0;
  let maxResult = 0;
  scores.forEach((score) => {
    result += score.score;
    maxResult += score.max_score;
  });
  return (result / maxResult) * 20;
}
