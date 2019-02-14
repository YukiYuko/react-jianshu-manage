import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import Logo from "../../../assets/images/logo.png";
import MenuConfig from "../../../config/menuConfig";
import { NavLink } from "react-router-dom";

const {
  Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
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
    return (
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
            this.renderMenu(MenuConfig)
          }
        </Menu>
      </Sider>
    );
  }
}

export default LeftNav;
