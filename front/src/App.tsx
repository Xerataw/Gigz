import { setupIonicReact } from '@ionic/react';
import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Conversations from './pages/Conversations/Conversations';
import Liked from './pages/Liked/Liked';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';

/* Theme variables */
import NestedRoute from './components/NestedRoute/NestedRoute';
import './index.css';

setupIonicReact();

const App: React.FC = () => {
  const redirectRoute = '/auth/liked';

  return (
    <div className="bg-slate-500 relative h-screen">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to={redirectRoute} />
          </Route>
          <Route exact path="/login"></Route>

          <NestedRoute
            path="/auth"
            redirectNoMatch={redirectRoute}
            condition={true}
          >
            <Route path="/liked">
              <Liked />
            </Route>

            <Route path="/search">
              <Search />
            </Route>

            <Route path="/conversations">
              <Conversations />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>
          </NestedRoute>

          <Route path="/auth">
            <Switch></Switch>
          </Route>

          <Route path="/*" exact>
            <Redirect to={redirectRoute} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
