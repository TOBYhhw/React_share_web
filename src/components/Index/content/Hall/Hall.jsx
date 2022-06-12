import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { apiGetComment, apiAddComment } from "../../../../request/api/hall"
import { apiGetNotice } from "../../../../request/api/notice"
import { Table, Card, Col, Row, message, Button, Input } from 'antd';
import "./Hall.css"
const { TextArea } = Input;
const tableColumns = [
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
    }
]
const tableColumns2 = [
    {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
    }
]
class Hall extends Component {
    state = {
        inputval: '',
        pageSize: 10, //一页显示多少条
        dataSource: { //数据存放
            count: 0, //一共多少条数据
            data: [],//接口返回的数据
            page: 1 //默认第一页
        },
        dataSource2: { //数据存放
            data: [],//接口返回的数据
        },
        loading: true,
        loading2: true
    }
    componentDidMount = () => {
        this.getdata()
        apiGetNotice().then((res) => {
            this.setState({
                dataSource2: {
                    data: res.data
                },
                loading2: false
            })
        })
    }
    getdata = () => {    //初始化获取大厅评论
        const data = {
            pageNo: 1,
            pageSize: this.state.pageSize
        }
        apiGetComment(data).then((res) => {
            this.setState({
                dataSource: {
                    count: this.state.pageSize * parseInt(res.data[2].slice(4)),//处理拿回来的数据，页数乘每页的个数就是总数
                    data: res.data[0]
                },
                loading: false
            })
        }).catch((res) => {
            console.log(res);
        })
    }
    setinput = (e) => {
        this.setState({ inputval: e.target.value })
    }
    sent = () => {
        if (this.state.inputval === "") {
            message.error('请输入内容噢亲~');
        } else if (!window.sessionStorage.getItem("token")) {
            alert('请先登录！！')
            this.props.history.push("/index/logining")
            window.sessionStorage.setItem("key", "logining")
        }
        else {
            const data = { content: this.state.inputval }
            apiAddComment(data).then((res) => {
                if (res.data === "insertSuccessfully!") {
                    message.success("发射成功!")
                    this.setState({ inputval: '' })
                    this.getdata()
                }
            }).catch((error) => {
                console.log(error, "请求失败");
            })
        }
    }
    change = (page, pageSize) => {
        const data = {
            pageNo: page,
            pageSize: pageSize
        }
        apiGetComment(data).then((res) => {
            this.setState({
                dataSource: {
                    count: pageSize * parseInt(res.data[2].slice(4)),//处理拿回来的数据，页数乘每页的个数就是总数
                    data: res.data[0],
                }
            })
        })
    }
    render() {
        return (
            <div>
                <div className="site-card-border-less-wrapper">
                    <Card title="评论一下叭~" bordered={false} hoverable style={{ width: "100%" }}>
                        <TextArea rows={10} placeholder="有什么有趣的事分享给大家捏..." value={this.state.inputval} onChange={this.setinput} />
                        <Button type="primary" danger block onClick={this.sent}>
                            发射！！！
                        </Button>
                    </Card>
                </div>
                <div className="site-card-border-less-wrapper">
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card title="大厅评论" bordered={false} hoverable>
                                <Table columns={tableColumns}
                                    rowKey={record => record.id}
                                    dataSource={this.state.dataSource.data}
                                    pagination={{
                                        total: this.state.dataSource.count, showSizeChanger: false,
                                        onChange: (page, pageSize) => this.change(page, pageSize)
                                    }} loading={this.state.loading} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="公告" bordered={false} hoverable>
                                <Table columns={tableColumns2}
                                    rowKey={record => record.id}
                                    dataSource={this.state.dataSource2.data}
                                    pagination={false} loading={this.state.loading2} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default withRouter(Hall)
