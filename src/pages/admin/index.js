import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
// import jsonp from "../../axios/jsonp";
import LeftNav from "../../components/common/LeftNav/LeftNav";
import HeadBar from "../../components/common/HeadBar/HeadBar";
import FootBar from "../../components/common/FootBar/FootBar";
import until from "../../untils";
import "./admin.less";

const {
  Content
} = Layout;
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sysTime: until.formatDate(new Date().getTime()),
      weather: "",
      dayPictureUrl: "",
      city: "成都"
    }
  }

  componentDidMount() {
    //获取天气
    // let url = `https://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(this.state.city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    // jsonp.jsonp({
    //   url
    // }).then((res) => {
    //   let data = res.results[0].weather_data[0];
    //   this.setState({
    //     dayPictureUrl:data.dayPictureUrl,
    //     weather:data.weather + " " + data.wind
    //   });
    // });
    // 自动更新时间
    // setInterval(() => {
    //   this.setState({
    //     sysTime: until.formatDate(new Date().getTime())
    //   })
    // }, 1000);
  }

  render() {
    // const {dayPictureUrl, weather, city} = this.state;
    const {targetRouterConfig} = this.props;
    return (
      <Layout id="components-layout-demo-responsive">
        <LeftNav/>
        <Layout style={{height: "100%"}}>
          <HeadBar/>
          <Content style={{ overflow: "auto" }}>
            <Row type="flex" justify="space-between" align="middle" className="jianshu-manage-header-sub" style={{height: "50px", background: "#fff", padding: "0 20px"}}>
              <Col span={4}>
                <Breadcrumb>
                  <Breadcrumb.Item>{targetRouterConfig.parent}</Breadcrumb.Item>
                  <Breadcrumb.Item>{targetRouterConfig.title}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col>
                {/*<div className="weather">*/}
                  {/*/!*<span>{sysTime}</span>*!/*/}
                  {/*<img src={dayPictureUrl} alt={city}/>*/}
                  {/*<span>{weather}</span>*/}
                {/*</div>*/}
              </Col>
            </Row>
            <div style={{ padding: "24px", background: '#fff', margin: '24px 16px',}}>
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
