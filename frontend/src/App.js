import './App.css';
import { withRouter } from "react-router";
import Navbar from './components/NavBar/NavigationBar'

const AppLayout = ({ location, children }) => (
  <>
    <Navbar location={location}/>
    <div>{children}</div>
  </>
  
);

function App({ location, children }) {
  return (
    <AppLayout location={location} children={children}/>
  );
}

export default withRouter(App);
