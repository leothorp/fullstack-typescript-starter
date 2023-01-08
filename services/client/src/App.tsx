import { LoginPage } from "./LoginPage";
import { NotesPage } from "./NotesPage";
import {
  logout,
  useAuthStore,
  useCurrentUser,
  useAuthStatus,
  useResumeSessionOnMount,
  initGoogleSignIn,
} from "@client/store/auth";
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import { LoadingSpinner } from "@client/LoadingSpinner";
const AuthenticatedRoute = (props) => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

const AuthenticatedPage = (props) => {
  const currentUser = useCurrentUser();

  return (
    <div className="max-w-[100vw] h-[100vh]">
      <div className="flex justify-between mx-4">
        <header className="flex justify-between w-full items-center">
          <Link to="/">Home</Link>
          <div className="flex items-center">
            <span className="mr-4">{currentUser.email}</span>

            <Button onClick={logout}>Log Out</Button>
          </div>
        </header>
      </div>
      {props.children}
    </div>
  );
};

const NotesPageWrapper = () => {
  return (
    <AuthenticatedPage>
      <NotesPage />
    </AuthenticatedPage>
  );
};

const App = () => {
  useEffect(() => {
    initGoogleSignIn();
  }, []);
  useResumeSessionOnMount();
  const { authLoading } = useAuthStatus();

  const content = authLoading ? (
    <LoadingSpinner />
  ) : (
    <Switch>
      <AuthenticatedRoute path={"/notes"} component={NotesPageWrapper} />
      <Route path={"/login"} component={LoginPage} />
      <Redirect to="/notes" />
    </Switch>
  );

  // if (authLoading) {
  //   return <LoadingSpinner />;
  // }
  return <div className="bg-primary dark">{content}</div>;
};

// const AppWrapper = (props) => {
//   <div className="bg-primary dark">
//     <App {...props} />;
//   </div>;
// };
export default withRouter(App);
