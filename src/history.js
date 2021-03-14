import { createMemoryHistory, createBrowserHistory } from "history";

const history =
  process.env.NODE_ENV === "test"
    ? createMemoryHistory({forceRefresh:true})
    : createBrowserHistory({forceRefresh:true});

export default history;
