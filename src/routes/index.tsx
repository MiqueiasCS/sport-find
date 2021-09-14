import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Groups from "../pages/Groups";
import Group from "../pages/Group";
import AboutUs from "../pages/AboutUs";
import Register from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/groups" exact>
        <Groups />
      </Route>
      <Route path="/groups/:id">
        <Group />
      </Route>
      <Route path="/aboutus">
        <AboutUs />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};
export default Routes;
