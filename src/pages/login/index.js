import React from 'react'
import {Form, Input, Button} from 'antd'
import Footer from '../../components/common/FootBar/FootBar'
import './index.less'
import user from "../../api/user";
import {setStorage} from "../../untils/localstorage";

const FormItem = Form.Item;

export default class Login extends React.Component {
  state = {};

  componentDidMount() {//每次进入登录页清除之前的登录信息
  }

  loginReq = (params) => {
    user.login(params).then((res) => {
      setStorage("token", res.data.token);
      window.location.href = "/home";
    })
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-header">
          <div className="logo">
            <img src={require("../../assets/images/logo.png")} alt="简书后台管理系统"/>
            React全家桶+AntD 简书后台管理系统
          </div>
        </div>
        <div className="login-content-wrap">
          <div className="login-content">
            <div className="word">全栈之旅 <br/>开启新世界的大门</div>
            <div className="login-box">
              <div className="error-msg-wrap">
                <div
                  className={this.state.errorMsg ? "show" : ""}>
                  {this.state.errorMsg}
                </div>
              </div>
              <div className="title">管理员，请登录</div>
              <LoginForm ref="login" loginSubmit={this.loginReq}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

class LoginForm extends React.Component {
  state = {};

  loginSubmit = (e) => {
    e && e.preventDefault();
    const _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let formValue = _this.props.form.getFieldsValue();
        _this.props.loginSubmit({
          email: formValue.email,
          password: formValue.password
        });
      }
    });
  };

  checkUsername = (rule, value, callback) => {
    // let reg = /^\w+$/;
    // !reg.test(value)
    if (!value) {
      callback('请输入用户名!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码!');
    } else {
      callback();
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            initialValue: 'user',
            rules: [{validator: this.checkUsername}]
          })(
            <Input placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [{validator: this.checkPassword}]
          })(
            <Input type="password" placeholder="密码"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.loginSubmit} className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

LoginForm = Form.create({})(LoginForm);
