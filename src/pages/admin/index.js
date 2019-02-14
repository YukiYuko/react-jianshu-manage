import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftNav from "../../components/common/LeftNav/LeftNav";
import HeadBar from "../../components/common/HeadBar/HeadBar";
import FootBar from "../../components/common/FootBar/FootBar";

const {
  Content
} = Layout;
class Admin extends Component {
  render() {
    return (
      <Layout id="components-layout-demo-responsive">
        <LeftNav/>
        <Layout style={{height: "100%"}}>
          <HeadBar/>
          <Content style={{ margin: '24px 16px 0', overflow: "auto" }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 2000 }}>
              { this.props.children }
            </div>
          </Content>
          <FootBar/>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
