import { Chip } from '@material-tailwind/react';
import { IHistory } from '../../../@types/quiz';
import { useAppSelector } from '../../../hooks/redux';
import foundFilter from '../../../hooks/foundFilter';

function HistoryItem({ data }: { data: IHistory }) {
  const quizList = useAppSelector((state) => state.quizs.list);
  const filter = useAppSelector((state) => state.filtre);
  const dark = useAppSelector((state) => state.dark.dark);
  const { tags, levels } = filter;
  const quiz = quizList.find((item) => item.id === data.quiz_id);
  if (!quiz) {
    return <div>Quiz non trouvés</div>;
  }
  return (
    <div
      className={`bg-black/70 shadow-lg ${
        dark ? 'shadow-deep-purple-500/40' : 'shadow-black'
      } w-[95%] mx-auto rounded-xl`}
    >
      <h5 className="text-white text-lg font-bold text-center">{quiz.name}</h5>
      <div className="flex justify-around">
        <Chip
          value={foundFilter(tags, quiz.tag_id)}
          className={`bg-red-800 ${dark ? ' shadow-md shadow-red-800/50' : ''}`}
        />
        <Chip
          value={foundFilter(levels, quiz.level_id)}
          className={`bg-light-green-400 ${
            dark ? ' shadow-md shadow-light-green-400/40' : ''
          }`}
        />
      </div>
      <h5 className="text-white text-lg font-bold text-center">
        Score: {`${data.score}/${data.max_score}`}
      </h5>
    </div>
  );
}

export default HistoryItem;
