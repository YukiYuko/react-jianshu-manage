import React, {Component} from 'react';
import {Icon, Layout, Menu, Dropdown, Avatar} from 'antd';
import "./style.less"

const {
  Header
} = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <div rel="noopener noreferrer"><Icon type="user" /> 个人中心</div>
    </Menu.Item>
    <Menu.Item>
      <div rel="noopener noreferrer"><Icon type="setting" /> 个人设置</div>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item>
      <div rel="noopener noreferrer"><Icon type="logout" /> 退出登录</div>
    </Menu.Item>
  </Menu>
);

class HeadBar extends Component {
  render() {
    return (
      <Header style={{background: '#fff', padding: "0 20px", boxShadow: "0 1px 4px rgba(0,21,41,.08)", zIndex: 1}}>
        <Dropdown overlay={menu} placement="bottomLeft">
          <div className="admin-header-user">
            <Avatar style={{backgroundColor: '#87d068'}} icon="user"/>
            <span className="admin-header-user-info">Yukiko</span>
          </div>
        </Dropdown>
      </Header>
    );
  }
}

export default HeadBar;
