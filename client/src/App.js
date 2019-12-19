import React from "react";
import Main from "./pages/Main";
import Create from "./pages/Create";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import SingleListing from "./pages/SingleListing";
import Update from "./pages/Update";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/create" exact component={Create} />
          <Route path="/listing/:id" exact component={SingleListing} />
          <Route path="/update/:id" exact component={Update} />
          <Route
            path="*"
            render={() => (
              <h1>Sorry, the page you are looking for doesn't exist</h1>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
