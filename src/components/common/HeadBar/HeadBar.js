import React, {Component} from 'react';
import {Icon, Layout, Menu, Dropdown, Avatar} from 'antd';
import "./style.less"

const {
  Header
} = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/"><Icon type="user" /> 个人中心</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/"><Icon type="setting" /> 个人设置</a>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/"><Icon type="logout" /> 退出登录</a>
    </Menu.Item>
  </Menu>
);

class HeadBar extends Component {
  render() {
    return (
      <Header style={{background: '#fff', padding: "0 20px"}}>
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
