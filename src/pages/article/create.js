import React from 'react';
import {
  Form, Input, Row, Col, Checkbox, Button, message, Icon, Modal, PageHeader, Select
} from 'antd';
import article from "../../api/article";
import system from "../../api/system";
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';


const Option = Select.Option;

class ArticleCreate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      labels: [],
      visible: false,
      name: "",
      category: [],
      id: "",
      formData: {},
      content: ""
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id && id!=="create") {
      this.setState({
        id
      }, () => {
        this.getData();
      })
    }
    this.getLabel();
    this.getCategory();
  }
  // 获取文章详情
  getData() {
    article.detail(this.state.id).then((res) => {
      let data = res.data;
      data.label = data.label.split(",");
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState(data.content)
      });
      this.setState({
        formData: data,
        content: BraftEditor.createEditorState(data.content)
      });
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let content = values.content.toHTML();
        let params = {...values, content};
        let method = "create";
        if (this.state.id && this.state.id !== "create") {
          params = { ...params, id: this.state.id};
          method = "update";
        }
        article[method](params).then(() => {
          message.success("成功!");
          this.props.form.setFieldsValue({
            content: BraftEditor.createEditorState(""),
            title: "",
            cid: "",
            label: []
          });
          this.setState({
            content: ''
          })
        });
      }
    });
  };
  handleEditorChange = (content) => {
    this.setState({ content })
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
    const { formData, content } = this.state;

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
                initialValue: formData.title,
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
                initialValue: formData.cid,
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
                initialValue: formData.label,
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
                initialValue: content,
                rules: [{
                  required: true, message: '请输入内容!',
                }],
              })(
                <BraftEditor
                  onChange={this.handleEditorChange}
                />
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

