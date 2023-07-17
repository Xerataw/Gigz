import { setupIonicReact } from '@ionic/react';
import { Container } from '@mantine/core';
import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Conversations from './pages/Conversations/Conversations';
import Liked from './pages/Liked/Liked';
import LoginPage from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import RegisterArtistProfile from './pages/Register/RegisterArtistProfile';
import Search from './pages/Search/Search';

import ForgotPassword from './components/ForgotPassword';
import NestedRoute from './components/NestedRoute';
import './index.css';
import RegisterHostProfile from './pages/Register/RegisterHostProfile';

setupIonicReact();

const App: React.FC = () => {
  const defaultRoute = '/';

  return (
    <div className="bg-white">
      <Container size={'xs'} px={0}>
        <div className="bg-white relative h-screen">
          <Router>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/login" />
              </Route>

              <NestedRoute
                condition={true}
                path="/register"
                redirectNoMatch={defaultRoute}
              >
                <Route exact path="/">
                  <Register />
                </Route>
                <Route exact path="/host">
                  <RegisterHostProfile />
                </Route>
                <Route exact path="/artist">
                  <RegisterArtistProfile />
                </Route>
              </NestedRoute>

              <NestedRoute
                condition={true}
                path="/login"
                redirectNoMatch={defaultRoute}
              >
                <Route exact path="/">
                  <LoginPage />
                </Route>
                <Route path="/forgot-password">
                  <ForgotPassword />
                </Route>
              </NestedRoute>

              <NestedRoute
                path="/auth"
                redirectNoMatch={defaultRoute}
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

              <Route path="/*" exact>
                <Redirect to={defaultRoute} />
              </Route>
            </Switch>
          </Router>
        </div>
      </Container>
    </div>
  );
};

export default App;
