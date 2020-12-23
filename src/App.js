/* eslint-disable react/prop-types */
import React from 'react';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import RemotePostList from './components/RemotePostList';
import LocalPostList from './components/LocalPostList';

const { Header, Content, Footer } = Layout;

const ResponsiveContainer = styled.div`
  padding: 50px;
  @media (max-width: 767.98px) {
    padding-left: 0px;
    padding-right: 0px;
  }
  max-width: 1900px;
  margin: auto;
`;

const styles = {
  header: {
    background: '#ffffff',
  },
  content: {
    padding: '0 50px',
  },
  footer: {
    textAlign: 'center',
  },
};

function App() {
  const getSelectedMenu = () => {
    switch (window.location.pathname) {
      case '/remote-posts':
        return '1';
      case '/local-posts':
        return '2';
      default:
        return '1';
    }
  };

  return (
    <Router>
      <Layout>
        <Header style={styles.header}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={getSelectedMenu()}
          >
            <Menu.Item key="1">
              <Link to="remote-posts">Global</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="local-posts">Local</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <ResponsiveContainer>
            <br />
            <div className="site-layout-content">
              <Switch>
                <Route path="/remote-posts">
                  <RemotePostList />
                </Route>
                <Route path="/local-posts">
                  <LocalPostList />
                </Route>
                <Route path="/">
                  <RemotePostList />
                </Route>
              </Switch>
            </div>
          </ResponsiveContainer>
        </Content>
        <Footer style={styles.footer}>Code challenge - December, 2020</Footer>
      </Layout>
    </Router>
  );
}

export default App;
