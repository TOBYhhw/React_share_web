import React, { Component } from 'react'
import { Breadcrumb, Table, Card, message, Button, Popconfirm, Modal, Divider, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiGetPassage, apiUploadImg, apiRemoveResource, apiDownResource, apiRemovePassage, apiGetPassageResource, apiCreatePassage, apiCreateComment, apiUploadResource, apiRemoveComment, apiGetFileCount } from "../../../../request/api/passage"
import "./ResourcePage.css"

const { TextArea } = Input;
export default class ResourcePage extends Component {
    state = {
        inputval: '',
        inputval2: '',
        inputval3: '',
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
        isModalVisible: false,
        isModalVisible2: false
    }
    componentDidMount = () => {
        this.getdata()
        window.sessionStorage.setItem("key", "resourcepage")
    }
    setinput = (e) => {
        this.setState({ inputval: e.target.value })
    }
    setinput2 = (e) => {
        this.setState({ inputval2: e.target.value })
    }
    setinput3 = (e) => {
        this.setState({ inputval3: e.target.value })
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
    sent2 = () => {
        if (this.state.inputval2 === "" || this.state.inputval3 === "") {
            message.error('请输入内容噢亲~');
        }
        else {
            const data = {
                content: this.state.inputval3,
                title: this.state.inputval2
            }
            apiCreatePassage(data).then((res) => {
                if (res.status === 200) {
                    message.success("创建成功！")
                    this.setState({
                        inputval2: "",
                        inputval3: ""
                    })
                    this.getdata();
                    this.setState({
                        isModalVisible2: false
                    })
                }
                else {
                    message.error("创建失败")
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
            console.log(Object.values(this.state.passageResource[2]));
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
    handleOk2 = () => {
        this.setState({
            isModalVisible2: false
        })
    };

    handleCancel2 = () => {
        this.setState({
            isModalVisible2: false
        })
    };
    deleteResource = (text, record) => {
        const data = {
            resourcesID: record.id
        }
        apiRemoveResource(data).then((res) => {
            if (res.status === 200) {
                message.success("删除成功！")
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
                message.error("删除失败！")
            }
        }).catch((res) => {
            console.log(res);
        })
    };
    deletehall = (text, record) => {
        console.log(record.commentID);
        const data = {
            commentID: record.commentID
        }
        apiRemoveComment(data).then((res) => {
            console.log(res);
            if (res.data === "deleteSuccessfully!") {
                message.success("删除成功！")
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
                message.error("删除失败！")
            }
        }).catch((res) => {
            console.log(res);
        })
    }
    confirm = (text, record) => {
        const data = {
            passageID: record.id
        }
        apiRemovePassage(data).then((res) => {
            console.log(res);
            if (res.data === "isOk") {
                message.success("删除成功！")
                this.getdata()
            } else {
                message.error("删除失败！")
            }
        }).catch((res) => {
            console.log(res);
        })
    }
    cancel = () => {
        message.error('您取消了删除!');
    }
    getfilecount = () => {
        apiGetFileCount().then((res) => {
            if (res.status === 200) {
                message.success("当前文件数量为:" + res.data)
            } else {
                message.error("获取失败")
            }
        }).catch((res) => {
            console.log(res);
        })
    }
    create = () => {
        this.setState({
            isModalVisible2: true
        })
    }
    upload = (file) => {
        let data = new FormData();
        data.append("file", file);
        data.append("passageID", this.state.passageResource[0].id);
        apiUploadResource(data)
            .then((res) => {
                if (res.status === 200) {
                    message.success("上传成功！")
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
                    message.error("上传失败！")
                }
            }).catch((res) => {
                console.log(res);
            })
        return false;
    }
    upload2 = (file) => {
        let data = new FormData();
        data.append("file", file);
        data.append("passageID", this.state.passageResource[0].id);
        apiUploadImg(data)
            .then((res) => {
                if (res.status === 200) {
                    message.success("上传成功！")
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
                    message.error("上传失败！")
                }
            }).catch((res) => {
                console.log(res);
            })
        return false;
    }
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
                        <Button type="primary" danger>
                            删除文章
                        </Button>
                    </Popconfirm>

                )
            }
        ]
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
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm
                        title="确认要删除吗?"
                        onConfirm={() => this.deletehall(text, record)}
                        onCancel={() => this.cancel()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            删除评论
                        </Button>
                    </Popconfirm>

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
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm
                        title="确认要删除吗?"
                        onConfirm={() => this.deleteResource(text, record)}
                        onCancel={() => this.cancel()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger >
                            删除
                        </Button>
                    </Popconfirm>

                )
            }

        ]
        return (
            <div> <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>ResourcePage</Breadcrumb.Item>
                <Breadcrumb.Item> <Button type="primary" onClick={this.create}>创建文章</Button></Breadcrumb.Item>
                <Breadcrumb.Item> <Button type="primary" onClick={this.getfilecount}>查看文件个数</Button></Breadcrumb.Item>
            </Breadcrumb>
                <div className="site-layout-content"> <div className="site-card-border-less-wrapper">
                    <Modal title="创建文章" visible={this.state.isModalVisible2} onOk={this.handleOk2} onCancel={this.handleCancel2} >
                        <Input placeholder="请输入文章标题" value={this.state.inputval2} onChange={this.setinput2} />
                        <br />
                        <br />
                        <TextArea placeholder="请输入文章内容" value={this.state.inputval3} onChange={this.setinput3} />
                        <Button type="primary" onClick={this.sent2} block>发送！</Button>
                    </Modal>
                    <Card title="文章" bordered={false} style={{ width: '100%' }} hoverable>
                        <Modal title="文章详细" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} width={2000} >
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
                            <br></br>
                            <br></br>
                            <Upload className='upload' beforeUpload={this.upload}>
                                <Button icon={<UploadOutlined />}>上传文章资源</Button>
                            </Upload>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Upload className='upload' beforeUpload={this.upload2}>
                                <Button icon={<UploadOutlined />}>上传图片资源</Button>
                            </Upload>
                            <br></br>
                            <br></br>
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
                </div></div>
            </div>
        )
    }
}
