import React from "react";
import {
  Layout, Menu
} from 'antd';
import {Route, Link, Switch} from "react-router-dom";
import Label from "./label";
import Category from "./category";
import Banner from "./banner";

const {
  Content, Sider,
} = Layout;

class System extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <Layout>
        <Content>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[this.props.history.location.pathname]}
                style={{ height: '100%' }}
              >
                <Menu.Item key="/system/label"><Link to="/system/label">标签设置</Link></Menu.Item>
                <Menu.Item key="/system/category"><Link to="/system/category">文章分类</Link></Menu.Item>
                <Menu.Item key="/system/banner"><Link to="/system/banner">头图设置</Link></Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route path="/system/label" component={Label} />
                <Route path="/system/category" component={Category} />
                <Route path="/system/banner" component={Banner} />
              </Switch>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default System;
