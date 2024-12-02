import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Chip,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import img from '../../../assets/Brain_banner.png';
import { useAppSelector } from '../../../hooks/redux';

interface IPropsQuiz {
  title: string;
  tag: string;
  level: string;
  slug: string;
}

function QuizCard({ title, tag, level, slug }: IPropsQuiz) {
  const dark = useAppSelector((state) => state.dark.dark);
  return (
    <Card
      className={`h-[320px] mt-6 w-60 mx-auto overflow-visible lg:hover:scale-[1.1] lg:transition-transform ${
        dark
          ? 'bg-[#170f1f] shadow-md shadow-deep-purple-500/40'
          : 'bg-white/10 shadow-md shadow-white/50'
      }`}
    >
      <CardHeader color="deep-purple" className="relative h-34">
        <img src={img} alt="Présentation" />
      </CardHeader>
      <div className="flex flex-col justify-between h-[80%]">
        <CardBody className="py-2 items-center">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-1 text-center text-white  "
          >
            {title}
          </Typography>
          <div className="flex flex-wrap justify-around items-center gap-3 text-center mt-[10%] w-full ">
            <Chip
              className={`bg-red-800 ${
                dark ? ' shadow-md shadow-red-800/50' : ''
              }`}
              value={tag}
            />
            <Chip
              className={`bg-light-green-400 ${
                dark ? ' shadow-md shadow-light-green-400/40' : ''
              }`}
              value={level}
            />
          </div>
        </CardBody>
        <CardFooter className="mx-auto">
          <Link
            to={`/quiz/${slug}`}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-deep-purple-500/70 hover:shadow-lg hover:shadow-deep-purple-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-deep-purple-500"
          >
            Jouer au Quiz
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}

export default QuizCard;
