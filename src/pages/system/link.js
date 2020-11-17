import React from "react";
import {Button, Icon, Input, Modal, message, Upload} from "antd";
import {getStorage} from "../../untils/localstorage";
import "./style/link.less";
import validator from 'validator';
import system from "../../api/system";
import {tips, drop} from "../../actions";

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
const token = getStorage("token");


class FriendLink extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      name: "",
      description: "",
      title: "",
      list: [],
      loading: false,
      imageUrl: "",
      avatar: ""
    }
  }
  componentDidMount() {
    this.getData();
  }
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
  // banner列表
  getData = () => {
    system.link_list().then((res) => {
      this.setState({
        list: res.data
      });
    });
  };
  // 删除
  del = ({id}) => {
    drop().then(() => {
      system.link_del(id).then(() => {
        this.setState((prevState) => ({
          list: prevState.list.filter((item) => item.id !== id)
        }));
        tips("成功", "success");
      })
    });
  };
  // 添加
  handleOk = () => {
    if (!validator.isURL(this.state.avatar) &&　validator.isEmpty(this.state.imageUrl)) {
      message.error("请输入正确链接地址");
      return false;
    }
    if (!validator.isURL(this.state.name)) {
      message.error("请输入正确链接地址");
      return false;
    }
    if (validator.isEmpty(this.state.title)) {
      message.error("请填写博客名");
      return false;
    }
    if (validator.isEmpty(this.state.description)) {
      message.error("请填写博客介绍");
      return false;
    }
    this.setState({
      confirmLoading: true
    });
    system.link_create({url: this.state.name, image: this.state.imageUrl, avatar: this.state.avatar, title: this.state.title, description: this.state.description}).then((res) => {
      setTimeout(() => {
        message.success("添加成功!");
        let list = [...this.state.list];
        list.push(res.data);
        this.setState({
          confirmLoading: false,
          visible:false,
          list,
          name: "",
          imageUrl: "",
          title: "",
          description: ""
        });
      }, 1000);
    }).catch(() => {
      this.setState({
        confirmLoading: false
      });
    });
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {visible, confirmLoading, name, list, imageUrl, description, title, avatar} = this.state;
    return (
      <div className="friend_link">
        <div className="friend_link_head">
          <Button type="primary" icon="plus" onClick={() => this.setState({visible: true})}>添加</Button>
          <Modal
            title="添加"
            visible={visible}
            okText="确定"
            cancelText="取消"
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={() => this.setState({visible: false})}
          >
            <div className="form-item">
              <div className="form-item-label">LOGO</div>
              <div className="form-item-cont">
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
              </div>
            </div>
            <div className="form-item">
              <div className="form-item-label">LOGO</div>
              <div className="form-item-label">
                <Input value={avatar} onChange={(e) => this.setState({avatar: e.target.value})} prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入logo" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-item-label">链接</div>
              <div className="form-item-label">
                <Input value={name} onChange={(e) => this.setState({name: e.target.value})} prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入链接" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-item-label">博客名</div>
              <div className="form-item-label">
                <Input value={title} onChange={(e) => this.setState({title: e.target.value})} prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入博客名" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-item-label">博客简介</div>
              <div className="form-item-label">
                <Input value={description} onChange={(e) => this.setState({description: e.target.value})} prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入博客简介" />
              </div>
            </div>
          </Modal>
        </div>
        <div className="friend_link_list">
          {
            list.map((item, index) => (
              <div className="friend_link_list_item" key={index}>
                <div className="friend_link_list_item_left">
                  <img src={item.image || item.avatar} alt={item.url}/>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="friend_link_list_item_center">
                  {item.url}
                </a>
                <div className="friend_link_list_item_right">
                  <span onClick={()=> this.del(item)}>删除</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default FriendLink;
