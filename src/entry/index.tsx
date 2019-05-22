import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import dynamic from '../lib/dynamic';

const List = dynamic(() => import('../components/list'));
const Detail = dynamic(() => import('../components/detail'));

import './index.scss';

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact={true} path="/" component={List} />
      <Route exact={true} path="/detail/:time/:title" component={Detail} />
      <Redirect to="/" />
    </Switch>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
