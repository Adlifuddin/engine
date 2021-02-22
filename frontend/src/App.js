import './App.css';
import { Route, Switch, withRouter } from "react-router";
import Layouts from './layout/Layouts'

function App() {

  return (
    <Switch>
      <Route path="/" render={(props) => <Layouts {...props}/>} />
    </Switch>
  );
}

export default withRouter(App);
