import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Grid } from 'dashkit-ui';
import Sidebar from './common/sidebar';
import dynamic from '../lib/dynamic';

const List = dynamic(() => import('./list'));
const Detail = dynamic(() => import('./detail'));
const { Content, Footer } = Layout;
const { Row, Col } = Grid;

import './style.scss';

export default () => (
  <HashRouter>
    <Layout>
      <Sidebar />
      <Layout className="app-layout">
        <div className="app-header" />
        <Row center="xs" className="app-content">
          <Col xs={12} md={10} lg={8}>
            <Switch>
              <Route exact={true} path="/" component={List} />
              <Route exact={true} path="/detail/:name" component={Detail} />
              <Redirect to="/" />
            </Switch>
          </Col>
        </Row>
        <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
      </Layout>
    </Layout>
  </HashRouter>
);
