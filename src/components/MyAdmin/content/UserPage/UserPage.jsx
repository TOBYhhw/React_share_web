import React, { Component } from 'react'
import { Breadcrumb, Table, Card, Col, Row, Input, message } from 'antd';
import { apiGetUser, apiSearchUser } from "../../../../request/api/admin"
const { Search } = Input;
const tableColumns = [
    {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
    }
]
const tableColumns2 = [
    {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
    }
]
export default class UserPage extends Component {
    state = {
        pageSize: 10, //一页显示多少条
        dataSource: { //数据存放
            count: 0, //一共多少条数据
            data: [],//接口返回的数据
            page: 1 //默认第一页
        },
        dataSource2: { //数据存放
            data: []//接口返回的数据
        },
        loading: true,

    }
    componentDidMount = () => {
        this.getdata()
        window.sessionStorage.setItem("key", "userpage")
    }
    getdata = () => {    //初始化获取大厅评论
        const data = {
            pageNo: 1,
            pageSize: this.state.pageSize
        }
        apiGetUser(data).then((res) => {
            console.log(res);
            this.setState({
                dataSource: {
                    count: this.state.pageSize * parseInt(res.data[1].slice(3)),//处理拿回来的数据，页数乘每页的个数就是总数
                    data: res.data[0]
                },
                loading: false
            })
        }).catch((res) => {
            console.log(res);
        })
    }
    change = (page, pageSize) => {
        const data = {
            pageNo: page,
            pageSize: pageSize
        }
        apiGetUser(data).then((res) => {
            this.setState({
                dataSource: {
                    count: this.state.pageSize * parseInt(res.data[1].slice(3)),//处理拿回来的数据，页数乘每页的个数就是总数
                    data: res.data[0]
                }
            })
        })
    }
    onSearch = (value) => {
        const data = {
            name: value
        }
        apiSearchUser(data).then((res) => {
            if (res.data === "") {
                message.error("没有该用户信息!")
                return
            }
            this.setState({
                dataSource2: {
                    data: [res.data]
                },
            })
        }).catch((res) => { console.log(res); })
    }
    render() {
        return (
            <div> <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>UserPage</Breadcrumb.Item>
            </Breadcrumb>
                <div className="site-card-border-less-wrapper">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="所有用户信息" bordered={false} hoverable>
                                <Table columns={tableColumns}
                                    rowKey={record => record.userId}
                                    dataSource={this.state.dataSource.data}
                                    pagination={{
                                        total: this.state.dataSource.count, showSizeChanger: false,
                                        onChange: (page, pageSize) => this.change(page, pageSize)
                                    }} loading={this.state.loading} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="搜索用户注册信息" bordered={false} hoverable>
                                <Search placeholder="请输入用户名" onSearch={this.onSearch} enterButton />
                                <Table columns={tableColumns2}
                                    rowKey={record => record.userId}
                                    dataSource={this.state.dataSource2.data}
                                    pagination={false} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
