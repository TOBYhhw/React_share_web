import React, { Component } from 'react'
import { Breadcrumb, Card, Button, Input, message, Table, Popconfirm } from 'antd';
import { apiUpdateNotice } from "../../../../request/api/notice"
import { apiGetComment, apiRemoveComment } from "../../../../request/api/hall"
import "./HallPage.css"
const { TextArea } = Input;

export default class HallPage extends Component {
    state = {
        inputval: '',
        pageSize: 10, //一页显示多少条
        dataSource: { //数据存放
            count: 0, //一共多少条数据
            data: [],//接口返回的数据
            page: 1 //默认第一页
        }, loading: true
    }
    confirm = (text, record) => {
        const data = {
            ID: record.id
        }
        apiRemoveComment(data).then((res) => {
            console.log(res);
            if (res.data === "deleteSuccessfully!") {
                message.success("删除成功！")
                this.getcomment()
            }
        }).catch((res) => {
            console.log(res);
        })
    }
    cancel = () => {
        message.error('您取消了删除!');
    }
    componentDidMount = () => {
        this.getcomment()
        window.sessionStorage.setItem("key", "hallpage")
    }
    getcomment = () => {    //初始化获取大厅评论
        const data = {
            pageNo: 1,
            pageSize: this.state.pageSize
        }
        apiGetComment(data).then((res) => {
            this.setState({
                dataSource: {
                    count: this.state.pageSize * parseInt(res.data[2].slice(4)),//处理拿回来的数据，页数乘每页的个数就是总数
                    data: res.data[0]
                }, loading: false
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
        apiGetComment(data).then((res) => {
            this.setState({
                dataSource: {
                    count: pageSize * parseInt(res.data[2].slice(4)),//处理拿回来的数据，页数乘每页的个数就是总数
                    data: res.data[0],
                },
                loading: false
            })
        })
    }
    setinput = (e) => {
        this.setState({ inputval: e.target.value })
    }
    sent = () => {
        if (this.state.inputval === "") {
            message.error('请输入内容噢亲~');
        }
        else {
            const data = { content: this.state.inputval }
            apiUpdateNotice(data).then((res) => {
                if (res.data === "isOk") {
                    message.success("更新成功！")
                    this.setState({ inputval: "" })
                }
                else {
                    message.error("更新失败！")
                }
            }).catch((res) => { console.log(res); })
        }
    }
    render() {
        const tableColumns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm
                        title="确认要删除吗?"
                        onConfirm={() => this.confirm(text, record)}
                        onCancel={() => this.cancel()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>
                            删除
                        </Button>
                    </Popconfirm>
                )
            }

        ]
        return (
            <div> <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>HallPage</Breadcrumb.Item>
            </Breadcrumb>
                <div className="site-layout-content">
                    <div className="site-card-border-less-wrapper">
                        <Card title="更新公告" bordered={false} style={{ width: '100%' }} hoverable>
                            <TextArea rows={10} placeholder="更新一下公告喔~" value={this.state.inputval} onChange={this.setinput} />
                            <Button type="primary" danger block onClick={this.sent}>
                                发射！！！
                            </Button>
                        </Card>
                    </div>
                    <div className="site-card-border-less-wrapper">
                        <Card title="删除留言" bordered={false} style={{ width: '100%' }} hoverable>
                            <Table columns={tableColumns}
                                rowKey={record => record.id}
                                dataSource={this.state.dataSource.data}
                                pagination={{
                                    total: this.state.dataSource.count, showSizeChanger: false,
                                    onChange: (page, pageSize) => this.change(page, pageSize)
                                }}
                                loading={this.state.loading} />
                        </Card>
                    </div>
                </div>

            </div>
        )
    }
}
