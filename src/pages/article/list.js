import React from 'react';
import { Table } from 'antd';
import article from "../../api/article";
import untils from "../../untils";
import "../../assets/style/public.less";
import {Row,Input, Col, Select, Button, Divider, Popconfirm,  } from "antd";
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
      searchType: "title"
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
      width: '10%'
    }, {
      title: '发布时间',
      dataIndex: 'createdAt',
      width: '10%',
      render: createdAt => untils.day_format(createdAt)
    },{
      width: '10%',
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <NavLink to={`/article/${record.id}`}>
            <Button size={"small"} type="primary" icon="edit">编辑</Button>
          </NavLink>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除吗？" okText="Yes" cancelText="No" onConfirm={() => this.del(record)}>
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
  render() {
    const {list, pagination, loading, searchVal, searchType} = this.state;
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
      </div>
    );
  }
}

export default ArticleList;
