import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import App from './components/App/App';

import './styles/index.scss';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import PageQuiz from './components/Page/Main/PageQuiz/PageQuiz';
import PageSearchQuiz from './components/Page/Main/PageSearchQuiz/PageSearchQuiz';
import PageCreateQuiz from './components/Page/Dashboard/PageCreateQuiz/PageCreateQuiz';

import store from './store';
import PageProfil from './components/Page/Dashboard/PageProfil/PageProfil';
import PageLogin from './components/Page/Main/PageLogin/PageLogin';
import PageRegister from './components/Page/Main/PageRegister/PageRegister';
import PageGestionFilter from './components/Page/Dashboard/PageGestionFilter/PageGestionFilter';
import Page from './components/Page/Page';
import PageHistory from './components/Page/Dashboard/PageHistory/PageHistory';
import PageGestionQuiz from './components/Page/Dashboard/PageGestionQuiz/PageGestionQuiz';
import PageEditQuiz from './components/Page/Dashboard/PageEditQuiz/PageEditQuiz';
import ProfilSettings from './components/Page/Dashboard/ProfilSettings/ProfilSettings';
import Logout from './components/UtilsComponents/Logout/Logout';
import CGU from './components/CGU/CGU';
import RGPD from './components/RGPD/RGPD';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route
          index
          element={
            <Page>
              <Home />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page>
              <PageLogin />
            </Page>
          }
        />
        <Route
          path="/register"
          element={
            <Page>
              <PageRegister />
            </Page>
          }
        />
        <Route
          path="/quiz"
          element={
            <Page>
              <PageSearchQuiz />
            </Page>
          }
        />
        <Route
          path="/quiz/:slug"
          element={
            <Page>
              <PageQuiz />
            </Page>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Page>
              <PageProfil />
            </Page>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <Page>
              <ProfilSettings />
            </Page>
          }
        />
        <Route
          path="/dashboard/filter"
          element={
            <Page>
              <PageGestionFilter />
            </Page>
          }
        />
        <Route
          path="/dashboard/history"
          element={
            <Page>
              <PageHistory />
            </Page>
          }
        />
        <Route
          path="/dashboard/quiz/create"
          element={
            <Page>
              <PageCreateQuiz />
            </Page>
          }
        />
        <Route
          path="/dashboard/quiz"
          element={
            <Page>
              <PageGestionQuiz />
            </Page>
          }
        />
        <Route
          path="/dashboard/quiz/editQuiz/:id"
          element={
            <Page>
              <PageEditQuiz />
            </Page>
          }
        />
        <Route path="/CGU" element={<CGU />} />
        <Route path="/RGPD" element={<RGPD />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/error" element={<Error />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
