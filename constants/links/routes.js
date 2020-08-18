import PAGES from './pages';

const authRoutes = [
  PAGES.SIGN_IN.url,
  PAGES.FORGOT_PASSWORD.url,
  PAGES.RESET_PASSWORD.url
];

const pageRoutes = [
  PAGES.HOME.url,
];
export {
  authRoutes,
  pageRoutes
};
