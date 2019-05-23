import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'dashkit-ui';
import Sidebar from '../components/common/sidebar';
import dynamic from '../lib/dynamic';

const List = dynamic(() => import('../components/list'));
const Detail = dynamic(() => import('../components/detail'));
const { Content, Footer } = Layout;

import './index.scss';

const App = () => (
  <HashRouter>
    <Layout>
      <Sidebar />
      <Layout className="app-layout">
        <Content className="app-content">
          <Switch>
            <Route exact={true} path="/" component={List} />
            <Route exact={true} path="/detail/:name" component={Detail} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
      </Layout>
    </Layout>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
