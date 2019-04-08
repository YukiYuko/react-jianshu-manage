import React from "react";
import {
  Icon,
  Upload,
  Form,
  Button,
  Input
} from 'antd';
import {tips} from "../../../actions";
import {getStorage} from "../../../untils/localstorage";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const types = ["image/jpeg", "image/png"];
  const isJPG = types.includes(file.type);
  if (!isJPG) {
    tips('You can only upload JPG or PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 4;
  if (!isLt2M) {
    tips('Image must smaller than 4MB!')
  }
  return isJPG && isLt2M;
}

const token = getStorage("token");

class UploadTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [
        'http://img.hb.aicdn.com/1cad414972c5db2b8c1942289e3aeef37175006a8bb16-CBtjtX_fw',
        'http://img.hb.aicdn.com/016f2e13934397e17c3482a4529f3da1149d37fd2a99c-RVM1Gi_fw',
        'http://img.hb.aicdn.com/8c5d5f2bf6427d1b5ed8657a7ae0c9938d3465e367899-AJ0zVA_fw',
        'http://img.hb.aicdn.com/bd71ccac0b16bbcade255a1a8a63504d71c7dee9a8652-zBCN9d_fw',
        'http://img.hb.aicdn.com/37a40cb04345463858d45418ae6ed9ef319e30dc37a45-o4pQ0j_fw',
      ],
      loading: true,
      visible: false,
      imageUrl: "",
      upload_loading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', {...values, image: this.state.imageUrl});
        this.props.ok({...values, image: this.state.imageUrl});
      }
    });
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ upload_loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        upload_loading: false,
        imageUrl: info.file.response.data.url
      })
    }
  };
  render() {
    const {imageUrl, upload_loading} = this.state;
    const uploadButton = (
      <div>
        <Icon type={upload_loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label="头图"
        >
          {getFieldDecorator('image', {
            rules: [{ required: true, message: '请选择头图!' }],
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              headers={{Authorization:token}}
              action="http://localhost:4000/api/upload/single"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img style={{width: "100%"}} src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          )}
        </Form.Item>
        <Form.Item
          label="链接"
        >
          {getFieldDecorator('url', {
            rules: [
              { required: true, message: '请输入链接!' },
              { type: 'url', message: '请输入正确的链接!'}
            ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="标题"
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="描述"
        >
          {getFieldDecorator('desc', {
            // rules: [{ required: true, message: '请输入描述!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12, offset: 4 }}
        >
          <Button type="primary" htmlType="submit">保存</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.props.close}>
            取消
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({})(UploadTemplate);
