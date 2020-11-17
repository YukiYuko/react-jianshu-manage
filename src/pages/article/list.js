import React from 'react';
import { Table } from 'antd';
import article from "../../api/article";
import untils from "../../untils";
import "../../assets/style/public.less";
import {Row,Input, Col, Select, Button, Divider, Popconfirm, Modal, Radio } from "antd";
import {tips} from "../../actions";
import {Link, NavLink} from "react-router-dom";

const InputGroup = Input.Group;
const Option = Select.Option;

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      searchVal: "",
      searchType: "title",
      current: {},
      visible: false,
      status: 1
    };
    this.columns = [{
      title: '标题',
      dataIndex: 'title',
      width: '20%'
    }, {
      title: '标签',
      dataIndex: 'label',
      width: '10%',
      // render: (label) => {
      //   return label.split(",").map((item) => {
      //     return <Tag style={{marginBottom: "8px"}} color="magenta" key={item}>{item}</Tag>
      //   })
      // }
    },{
      title: '作者',
      dataIndex: 'author',
      width: '10%',
      render: (text, record)  =>record.author.username
    }, {
      title: '发布时间',
      dataIndex: 'createdAt',
      width: '10%',
      render: createdAt => untils.day_format(createdAt)
    },{
      title: '修改时间',
      dataIndex: 'updatedAt',
      width: '10%',
      render: updatedAt => untils.day_format(updatedAt)
    },{
      width: '15%',
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <NavLink to={`/article/${record.id}`}>
            <Button size={"small"} type="primary" icon="edit">编辑</Button>
          </NavLink>
          <Divider type="vertical"/>
            <Button size={"small"} type={["", "danger", "primary", "danger"][record.status]} onClick={() => this.openStatus(record)}>
              {["", "待审核", "已通过", "已拒绝"][record.status]}
            </Button>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => this.del(record)}>
            <Button size={"small"} type="danger" icon="edit" ghost>删除</Button>
          </Popconfirm>
        </span>
      ),
    }];
  }
  componentDidMount() {
    this.fetch();
  }
  // 删除
  del = ({id}) => {
    article.del(id).then((res) => {
      tips(res.msg);
      this.fetch();
    })
  };
  // 搜索
  search = () => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState({
      pagination: pager
    }, () => {
      this.fetch({searchType: this.state.searchType, searchVal: this.state.searchVal});
    });
  };
  // 点击分页
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  };
  // 获取数据
  fetch = ({limit = 10, page = 1, searchType, searchVal} = {}) => {
    this.setState({ loading: true });
    article.list({limit, page, searchType, searchVal}).then((res) => {
      const pagination = { ...this.state.pagination };
      pagination.total = res.data.count;
      setTimeout(() => {
        this.setState({
          list: res.data.data,
          pagination,
          loading: false
        });
      }, 1000);
    })
  };
  // 打开修改状态弹窗
  openStatus = (current) => {
    this.setState({
      current,
      visible: true,
      status: current.status
    })
  };
  // 监听状态
  changeStatus = (e) => {
    this.setState({
      status: e.target.value
    })
  };
  // 确认修改状态
  handleOk = () => {
    Modal.confirm({
      title: '提示',
      content: '确定要更改文章状态吗',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        article.updateStatus({id: this.state.current.id, status: this.state.status}).then(() => {
          let list = [...this.state.list];
          let index = list.findIndex(item => this.state.current.id === item.id);
          list[index].status = this.state.status;
          this.setState({
            visible: false,
            list
          });
          tips("修改状态成功", "success");
        });
      }
    });
  };
  render() {
    const {list, pagination, loading, searchVal, searchType, visible, status} = this.state;
    return (
      <div>
        <div className="filterBar">
          <Row type="flex" justify="space-between">
            <Col span={8}>
              <div className="filterBar-left">
                <InputGroup compact>
                  <Select defaultValue={searchType} onChange={(v) => this.setState({searchType: v})}>
                    <Option value="title">标题</Option>
                  </Select>
                  <Input style={{ width: '50%' }} value={searchVal} onChange={(e) => this.setState({searchVal: e.target.value})}/>
                  <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
                </InputGroup>
              </div>
            </Col>
            <Col span={8}>
              <div className="filterBar-right">
                <Link to="/article/create">
                  <Button type="primary" icon="form">发布文章</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <Table
          bordered
          rowKey="id"
          dataSource={list}
          columns={this.columns}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
        {/*修改状态弹窗*/}
        <Modal
          title="修改状态"
          visible={visible}
          onOk={this.handleOk}
          onCancel={() => this.setState({visible: false})}
        >
          <Radio.Group onChange={(v) => this.changeStatus(v)} value={status}>
            <Radio value={1}>待审核</Radio>
            <Radio value={2}>已通过</Radio>
            <Radio value={3}>已拒绝</Radio>
          </Radio.Group>
        </Modal>
      </div>
    );
  }
}

export default ArticleList;
