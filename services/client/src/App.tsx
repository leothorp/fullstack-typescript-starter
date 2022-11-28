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

const AuthenticatedRoute = (props) => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

const AuthenticatedPage = () => {
  const currentUser = useCurrentUser();

  return (
    <div className="max-w-[100vw] h-[100vh]">
      <div className="flex justify-between mx-4">
        <Link to="/">Home</Link>
        <div>
          <span className="mr-4">{currentUser.email}</span>
          {/* @ts-ignore */}
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
      <NotesPage />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    initGoogleSignIn();
  }, []);
  useResumeSessionOnMount();
  const { authLoading } = useAuthStatus();

  if (authLoading) {
    return <>Loading...</>;
  }
  return (
    <Switch>
      <AuthenticatedRoute path={"/notes"} component={AuthenticatedPage} />
      <Route path={"/login"} component={LoginPage} />
    </Switch>
  );
};
export default withRouter(App);
