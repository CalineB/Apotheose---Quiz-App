import { IListQuiz } from '../../../@types/quiz';
import createSlug from '../../../hooks/createSlug';
import foundFilter from '../../../hooks/foundFilter';
import { useAppSelector } from '../../../hooks/redux';
import Carousel from '../Carrousel/Carousel';
import QuizCard from '../QuizCard/QuizCard';

function QuizContainer({
  title,
  listQuiz,
}: {
  // eslint-disable-next-line react/require-default-props
  title?: string;
  listQuiz: IListQuiz[];
}) {
  const filtre = useAppSelector((state) => state.filtre);
  const width = useAppSelector((state) => state.screen.width);

  const listQuizMap = listQuiz.map((quiz) => {
    const slug = createSlug(quiz.name);

    return (
      <QuizCard
        key={quiz.id}
        title={quiz.name}
        tag={foundFilter(filtre.tags, quiz.tag_id)}
        level={foundFilter(filtre.levels, quiz.level_id)}
        slug={slug}
      />
    );
  });
  const dark = useAppSelector((state) => state.dark.dark);
  return (
    <div className="flex flex-col items-center w-[90%] max-w-screen pt-4 mx-auto ">
      {title && (
        <div
          className={`w-auto bg-orange-300  rounded-r-xl p-3 text-white self-start shadow-md lg:self-center lg:mb-6 lg:rounded-xl lg:w-[400px] lg:text-center  ${
            dark ? 'shadow-orange-500/40' : ''
          }`}
        >
          <h3 className="font-bold  text-2xl  ml-4">{title}</h3>
        </div>
      )}

      {width <= 1024 && <Carousel>{listQuizMap}</Carousel>}
      {width > 1024 && (
        <div className="flex flex-wrap  gap-5"> {listQuizMap}</div>
      )}
    </div>
  );
}

export default QuizContainer;
