import FiltreReducer from './filtre';
import historyReducer from './history';
import quizReducer from './quiz';
import quizsReducer from './quizs';
import screenReducer from './screen';

import userReducer from './user';
import darkReducer from './dark';

const reducer = {
  quizs: quizsReducer,
  quiz: quizReducer,
  filtre: FiltreReducer,
  user: userReducer,
  screen: screenReducer,
  history: historyReducer,
  dark: darkReducer,
};

export default reducer;
