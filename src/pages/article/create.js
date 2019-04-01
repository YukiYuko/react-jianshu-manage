import React from 'react';
import {
  Form, Input, Row, Col, Checkbox, Button, message, Icon, Modal, PageHeader, Select
} from 'antd';
import Rich from "../../components/public/Rich";
import draftjs from "draftjs-to-html";
import article from "../../api/article";
import system from "../../api/system";

const Option = Select.Option;

class ArticleCreate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      labels: [],
      visible: false,
      name: "",
      category: []
    }
  }

  componentDidMount() {
    this.getLabel();
    this.getCategory();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        article.create(values).then(() => {
          message.success("发布成功!");
          this.props.form.resetFields();
          this.props.form.setFieldsValue({
            content: ""
          });
        });
      }
    });
  };
  setContent = (content) => {
    this.props.form.setFieldsValue({
      content: draftjs(content)
    });
  };

  // 获取标签
  getLabel () {
    system.label_list().then((res) => {
      this.setState({
        labels: res.data
      })
    })
  }
  // 获取文章分类
  getCategory () {
    system.label_list("category").then((res) => {
      this.setState({
        category: res.data
      })
    })
  }
  // 添加标签
  handleOk = () => {
    if (!this.state.name) {
      message.error("请输入信息");
      return false;
    }
    system.label_create(this.props.type, {name: this.state.name}).then((res) => {
      setTimeout(() => {
        message.success("添加成功!");
        let labels = [...this.state.labels, res.data];
        this.setState({
          visible:false,
          labels,
          name: ""
        });
      }, 1000);
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    const plainOptions = this.state.labels.map((item) => item.name);
    const categoryOptions = this.state.category.map((item) => {
      return {label:item.name, value: item.id}
    });

    const {visible, name} = this.state;
    return (
      <Row>
        <Col span={20}>
          <PageHeader
            onBack={() => this.props.history.goBack()}
            title="返回"
          />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="文章分类"
            >
              {getFieldDecorator('cid', {
                rules: [{
                  required: true, message: '请选择分类!',
                }],
              })(
                <Select>
                  {categoryOptions.map((item, index) => <Option value={item.value} key={index}>{item.label}</Option>)}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="标签"
            >
              {getFieldDecorator('label', {
                rules: [{
                  required: true, message: '请至少选择一个标签!',
                }],
              })(
                <Checkbox.Group options={plainOptions} onChange={(v) => console.log(v)}/>
              )}
              <Button onClick={() => this.setState({visible: true})} type="primary" size="small" icon="plus">添加标签</Button>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="内容"
            >
              {getFieldDecorator('content', {
                rules: [{
                  required: true, message: '请输入内容!',
                }],
              })(
                <Rich setContent={this.setContent}/>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">发布</Button>
            </Form.Item>
          </Form>
          {/*添加标签*/}
          <Modal
            title="添加标签"
            visible={visible}
            okText="确定"
            cancelText="取消"
            onOk={this.handleOk}
            onCancel={() => this.setState({visible: false})}
          >
            <Input value={name} onChange={(e) => this.setState({name: e.target.value})} prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="标签名" />
          </Modal>
        </Col>
      </Row>
    );
  }
}

const WrappedArticleCreate = Form.create({})(ArticleCreate);

export default WrappedArticleCreate

