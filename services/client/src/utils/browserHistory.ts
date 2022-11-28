import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();
//TODO(lt): remove below
browserHistory.listen((...args) => {
  console.log(...args);
});
export default browserHistory;
