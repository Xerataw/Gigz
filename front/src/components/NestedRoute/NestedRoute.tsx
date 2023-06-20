import React, { ReactElement, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { v4 } from 'uuid';

interface Props {
  path: string;
  redirectNoMatch: string;
  condition: boolean;
  children: ReactNode[];
}

const NestedRoute: React.FC<Props> = ({
  path,
  children,
  condition,
  redirectNoMatch,
}) => {
  return condition === true ? (
    <Route path={path}>
      <Switch>
        {children.map((route) =>
          React.cloneElement(route as ReactElement, {
            path: path + (route as ReactElement).props.path,
            key: v4(),
          })
        )}
        <Route>
          <Redirect to={redirectNoMatch} />
        </Route>
      </Switch>
    </Route>
  ) : (
    <Redirect to={redirectNoMatch} />
  );
};

export default NestedRoute;
