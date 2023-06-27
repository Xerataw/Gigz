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
import { Container } from '@mantine/core';
import NestedRoute from './components/NestedRoute/NestedRoute';
import './index.css';
import Register from './pages/Register/Register';

setupIonicReact();

const App: React.FC = () => {
  const redirectRoute = '/login/register';

  return (
    <div className="bg-white">
      <Container size={'xs'} px={0}>
        <div className="bg-white relative h-screen">
          <Router>
            <Switch>
              <Route path="/" exact>
                <Redirect to={redirectRoute} />
              </Route>

              <NestedRoute
                condition={true}
                path="/login"
                redirectNoMatch={redirectRoute}
              >
                <NestedRoute
                  condition={true}
                  path="/register"
                  redirectNoMatch={redirectRoute}
                >
                  <Route exact path="/">
                    <Register />
                  </Route>
                  <Route exact path="/host">
                    <div>HOST REGISTER PROFILE</div>
                  </Route>
                  <Route exact path="/artist">
                    <div>ARTIST REGISTER PROFILE</div>
                  </Route>
                </NestedRoute>
                <Route exact path="/login"></Route>
              </NestedRoute>

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

              <Route path="/*" exact>
                <Redirect to={redirectRoute} />
              </Route>
            </Switch>
          </Router>
        </div>
      </Container>
    </div>
  );
};

export default App;
