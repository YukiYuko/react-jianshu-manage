import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import "./App.css";
import Logo from "./assets/images/logo.png";
import MenuConfig from "./config/menuConfig";
import { NavLink } from "react-router-dom";

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  };
  render() {
    console.log(this.renderMenu(MenuConfig));
    return (
      <Layout id="components-layout-demo-responsive">
        <Sider
          style={{height: "100%"}}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo">
            <img src={Logo} alt=""/>
          </div>
          <Menu
            mode="vertical"
            theme="dark"
          >
            {
              // this.renderMenu(MenuConfig)
            }
          </Menu>
        </Sider>
        <Layout  style={{height: "100%"}}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: "auto" }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 2000 }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED From Yuki
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
