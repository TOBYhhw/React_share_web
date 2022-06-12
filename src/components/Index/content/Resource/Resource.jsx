import React, { Component } from 'react'
import { Breadcrumb, Table, Card, Button, Modal, Divider, Input, message } from 'antd';
import { apiGetPassage, apiGetPassageResource, apiCreateComment, apiDownResource } from "../../../../request/api/passage"
import "./Resource.css"
const tableColumns2 = [
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '评论内容',
        dataIndex: 'content',
        key: 'content',
    }
]
const { TextArea } = Input;
export default class Resource extends Component {
    state = {
        inputval: '',
        pageSize: 10, //一页显示多少条
        dataSource: { //数据存放
            count: 0, //一共多少条数据
            data: [],//接口返回的数据
            page: 1 //默认第一页
        },
        loading: true,
        passageResource: [
            { content: "", title: "", time: "", id: 0 },
            [{ address: "" }],
            {},
            [],
        ],
        isModalVisible: false
    }
    componentDidMount = () => {
        this.getdata()
        window.sessionStorage.setItem("key", "resource")
    }
    setinput = (e) => {
        this.setState({ inputval: e.target.value })
    }
    sent = () => {
        if (this.state.inputval === "") {
            message.error('请输入内容噢亲~');
        }
        else {
            const data = {
                content: this.state.inputval,
                passageID: this.state.passageResource[0].id,
                userID: window.sessionStorage.getItem("userID")
            }
            apiCreateComment(data).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    message.success("评论成功！")
                    this.setState({
                        inputval: ''
                    })
                    const data = {
                        passageID: this.state.passageResource[0].id
                    }
                    apiGetPassageResource(data).then((res) => {
                        this.setState({
                            passageResource: res.data
                        })
                        console.log(res.data);
                    }).catch((res) => {
                        console.log(res);
                    })
                }
                else {
                    message.error("评论失败")
                }
            }).catch((res) => {
                console.log(res);
            })
        }
    }
    getdata = () => {    //初始化获取
        const data = {
            pageNo: 1,
            pageSize: this.state.pageSize
        }
        apiGetPassage(data).then((res) => {
            this.setState({
                dataSource: {
                    count: res.data.passageItemCount,
                    data: res.data.passageItem
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
        apiGetPassage(data).then((res) => {
            this.setState({
                dataSource: {
                    count: res.data.passageItemCount,
                    data: res.data.passageItem
                }
            })
        }).catch((res) => {
            console.log(res);
        })
    }
    look = (text, record) => {
        const data = {
            passageID: record.id
        }

        apiGetPassageResource(data).then((res) => {
            this.setState({
                passageResource: res.data
            })
            console.log(res.data);
        }).catch((res) => {
            console.log(res);
        })
        this.setState({
            isModalVisible: true
        })
    }
    download = (text, record) => {
        let data = new FormData();
        data.append("filePath", record.address);
        apiDownResource(data)
            .then((res) => {
                console.log(res);
                res = res.data;
                let blob = new Blob([res], { type: res.type });
                let downloadElement = document.createElement("a");
                let href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = record.address
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
            })
            .catch((error) => {
                console.log("请求失败", error.message);
            });
    }
    handleOk = () => {
        this.setState({
            isModalVisible: false
        })
    };

    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    };
    render() {
        const tableColumns = [
            {
                title: '发布时间',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
                ellipsis: true //超出宽度自动省略
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Button type="primary" onClick={() => this.look(text, record)}>
                        查看详细
                    </Button>
                )
            }
        ]
        const tableColumns3 = [
            {
                title: '资源链接',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Button type="primary" onClick={() => this.download(text, record)}>
                        下载
                    </Button>
                )
            }

        ]
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Page</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <div className="site-card-border-less-wrapper">
                        <Card title="文章" bordered={false} style={{ width: '100%' }} hoverable>
                            <Modal title="文章详细" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} width={2000}>
                                <h1> {this.state.passageResource[0].title}</h1>
                                <Divider>内容</Divider>
                                <h3> {this.state.passageResource[0].content}</h3>
                                <Divider>图片</Divider>
                                <div>
                                    <div className='hezi'>{
                                        Object.values(this.state.passageResource[2]).map((img, index) => {
                                            return <img src={'data:image/png;base64,' + img} alt="" className="picture" key={index} />
                                        })
                                    }</div>
                                </div>
                                <Divider>评论</Divider>
                                <Table columns={tableColumns2}
                                    rowKey={record => record.commentID}
                                    dataSource={this.state.passageResource[3]}
                                    pagination={{
                                        total: this.state.passageResource[3].length, showSizeChanger: false,
                                    }} />
                                <Card title="评论一下叭~" bordered={false} hoverable style={{ width: "100%" }}>
                                    <TextArea rows={10} placeholder="有什么有趣的事分享给大家捏..." value={this.state.inputval} onChange={this.setinput} />
                                    <Button type="primary" danger block onClick={this.sent}>
                                        发射！！！
                                    </Button>
                                </Card>
                                <Divider>下载文章资源</Divider>
                                <Table columns={tableColumns3}
                                    rowKey={record => record.address}
                                    dataSource={this.state.passageResource[1]}
                                    pagination={false} />
                                <Divider orientation="right">发布时间:{this.state.passageResource[0].time}</Divider>
                            </Modal>
                            <Table columns={tableColumns}
                                rowKey={record => record.id}
                                dataSource={this.state.dataSource.data}
                                pagination={{
                                    total: this.state.dataSource.count, showSizeChanger: false,
                                    onChange: (page, pageSize) => this.change(page, pageSize)
                                }} loading={this.state.loading}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
