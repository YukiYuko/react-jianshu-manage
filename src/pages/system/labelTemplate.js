import React from "react";
import system from "../../api/system";
import {Button, Row, Col, Icon, Popconfirm, Modal, Input, message} from "antd";

class LabelTemplate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      name: "",
      list: []
    }
  }
  componentDidMount() {
    this.type_name = this.props.type === "label" ? "标签":"分类"
    this.fetch();
  }
  // 获取所有标签
  fetch = () => {
    system.label_list(this.props.type).then((res) => {
      this.setState({
        list: res.data
      })
    })
  };
  // 删除
  del = (id) => {
    system.label_del(this.props.type,{id}).then((res) => {
      let list = [...this.state.list];
      let arr = list.filter((item) => item.id !== id);
      this.setState({
        list: arr
      });
      message.success("删除成功!");
    })
  };
  // 添加
  handleOk = () => {
    if (!this.state.name) {
      message.error("请输入信息");
      return false;
    }
    this.setState({
      confirmLoading: true
    });
    system.label_create(this.props.type, {name: this.state.name}).then((res) => {
      setTimeout(() => {
        message.success("添加成功!");
        let list = [...this.state.list];
        list.push(res.data);
        this.setState({
          confirmLoading: false,
          visible:false,
          list,
          name: ""
        });
      }, 1000);
    }).catch(() => {
      this.setState({
        confirmLoading: false
      });
    })
  };

  render() {
    const {visible, confirmLoading, name, list} = this.state;
    return (
      <div className="system-label">
        <div className="system-label-head" style={{paddingBottom: "20px"}}>
          <Button type="primary" icon="plus" onClick={() => this.setState({visible: true})}>添加</Button>
          <Modal
            title={"添加" + this.type_name}
            visible={visible}
            okText="确定"
            cancelText="取消"
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={() => this.setState({visible: false})}
          >
            <Input value={name} onChange={(e) => this.setState({name: e.target.value})} prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="标签名" />
          </Modal>
        </div>
        <div className="system-label-list">
          <Row>
            <Col span={2}>
              所有{this.type_name}:
            </Col>
            <Col span={20}>
              {
                list.length ? list.map((item) => {
                  return <Popconfirm placement="topLeft" key={item.id} title="确定要删除该记录吗" okText="Yes" cancelText="No" onConfirm={() => this.del(item.id)}>
                    <Button style={{margin: "0 10px 10px 0"}} size="small" type="primary">{item.name} <Icon type="delete"/></Button>
                  </Popconfirm>
                }) : <span>没有添加{this.type_name}哦</span>
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default LabelTemplate;
