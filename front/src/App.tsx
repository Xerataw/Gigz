import { setupIonicReact } from '@ionic/react';
import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import ForgotPassword from './components/Login/ForgotPassword/ForgotPassword';
import Conversations from './pages/Conversations/Conversations';
import Liked from './pages/Liked/Liked';
import LoginPage from './pages/LoginPage/LoginPage';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';

/* Theme variables */
import './index.css';

setupIonicReact();

const App: React.FC = () => (
  <div className="bg-slate-500 relative h-screen">
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/liked" />
        </Route>
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

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>

        <Route path="/*" exact>
          <Redirect to="/liked" />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
