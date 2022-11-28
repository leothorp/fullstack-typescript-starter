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

const AuthenticatedContainer = (props) => {
  const { accessToken } = useAuthStore();
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     history.push("/login");
  //   }
  // }, [isAuthenticated, history]);

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  return props.children;
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {
  location;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App = (props: AppProps) => {
  useEffect(() => {
    initGoogleSignIn();
  }, []);
  // const authLoading = useAuthStore((state) => state.authLoading);
  useResumeSessionOnMount();
  const { isAuthenticated, authLoading } = useAuthStatus();
  console.log("isAuthenticated:", isAuthenticated);
  console.log("authLoading:", authLoading);

  if (authLoading) {
    return <>Loading...</>;
  }
  return (
    <Switch>
      <Route
        path={"/notes"}
        render={(locProps) => {
          return (
            <AuthenticatedContainer {...locProps}>
              <AuthenticatedPage {...locProps} />
            </AuthenticatedContainer>
          );
        }}
      />
      <Route path={"/login"} render={LoginPage} />
      {/* <Redirect from="*" to="/notes" /> */}
    </Switch>
  );
};
export default withRouter(App);

// class App extends React.Component {
//   componentDidMount() {
//     this.props.attemptSessionResumption();
//   }
//   render() {
//     const { isAuthenticated, authLoading } = this.props;
//     console.log("isAuth: ", isAuthenticated);
//     if (authLoading) {
//       return <CircularProgress />;
//     }

//     return isAuthenticated ? <AuthenticatedRoutes /> : <OpenRoutes />;
//   }
// }
