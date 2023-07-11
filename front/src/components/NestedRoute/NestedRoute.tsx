import React, { ReactElement, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';

interface Props {
  path: string;
  redirectNoMatch: string;
  condition?: boolean;
  children: ReactNode | ReactNode[];
}

const NestedRoute: React.FC<Props> = ({
  path,
  children,
  condition = true,
  redirectNoMatch,
}) => {
  const _children = Array.isArray(children) ? children : [children];

  return condition === true ? (
    <Route path={path}>
      <Switch>
        {_children.map((route) =>
          React.cloneElement(route as ReactElement, {
            path: path + (route as ReactElement).props.path,
            key: (route as ReactElement).props.path,
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
