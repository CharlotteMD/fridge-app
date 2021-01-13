import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Home} from './screens/home';
import {Login} from './screens/login';

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Awesome App</h1>
      
      <Router>
      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

      {/* <Login/> */}

    </div>
  );
}

export default App;
