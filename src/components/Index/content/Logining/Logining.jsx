import React, { Component } from 'react'
import { Breadcrumb, Tabs, Input, Card, Button, message } from 'antd';
import { AndroidOutlined, UserOutlined } from '@ant-design/icons';
import { apiLogin } from "../../../../request/api/user"
import "./Logining.css"
const { TabPane } = Tabs;
export default class Logining extends Component {
    state = {
        username: '',
        userpassword: '',
        adminname: '',
        adminpassword: ''
    }
    setusername = (e) => {
        this.setState({ username: e.target.value })
    }
    setuserpassword = (e) => {
        this.setState({ userpassword: e.target.value })
    }
    sentuser = () => {
        const data = {
            password: this.state.userpassword,
            username: this.state.username
        }
        apiLogin(data)
            .then((response) => {
                if (this.state.username === "admin" && this.state.userpassword === "admin") {
                    alert("你没有权限访问！")
                } else {
                    if (response.data.code !== 200) {
                        console.log("登录失败:" + response.data.message);
                        if (response.data.data === "无用户") {
                            message.error('不存在该用户！');
                        } else {
                            message.error('密码错误！');
                        }
                    } else {
                        message.success('登录成功！');
                        this.setState({
                            username: '',
                            userpassword: ''
                        })
                        console.log(response);
                        window.sessionStorage.setItem("token", response.data.data.token);
                        window.sessionStorage.setItem("username", this.state.username);
                        window.sessionStorage.setItem("userID", response.data.data.userID);
                        this.props.history.push('/index/home')
                        window.sessionStorage.setItem("key", "home")
                    }
                }
            })
            .catch((error) => {
                console.log("请求失败", error.message);
            });
    }
    clearuser = () => {
        this.setState({
            username: '',
            userpassword: ''
        })
    }
    movetoregister = () => {
        this.props.history.push('/index/register')
        window.sessionStorage.setItem("key", "register")
    }
    setadminname = (e) => {
        this.setState({ adminname: e.target.value })
    }
    setadminpassword = (e) => {
        this.setState({ adminpassword: e.target.value })
    }
    sentadmin = () => {
        const data = {
            password: this.state.adminpassword,
            username: this.state.adminname
        }
        apiLogin(data)
            .then((response) => {
                if (this.state.adminname === "admin" && this.state.adminpassword === "admin") {
                    if (response.data.code !== 200) {
                        console.log("登录失败:" + response.data.message);

                    } else {
                        message.success('登录成功！');
                        this.setState({
                            adminname: '',
                            adminpassword: ''
                        })
                        console.log(response);
                        window.sessionStorage.setItem("token", response.data.data.token);
                        window.sessionStorage.setItem("username", this.state.adminname);
                        window.sessionStorage.setItem("userID", response.data.data.userID);
                        this.props.history.push('/myadmin/hallpage')
                        window.sessionStorage.setItem("key", "hallpage")
                    }
                } else {
                    alert("你没有权限访问！")
                }
            })
            .catch((error) => {
                console.log("请求失败", error.message);
            });
    }
    clearadmin = () => {
        this.setState({
            adminname: '',
            adminpassword: ''
        })
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Login</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <Tabs defaultActiveKey="1" centered animated>
                        <TabPane
                            tab={
                                <span>
                                    <UserOutlined />
                                    用户登录
                                </span>
                            }
                            key="1"
                        >
                            <Card title="用户登录" hoverable className='card' >
                                <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} value={this.state.username} onChange={this.setusername} />
                                <Input.Password size="large" placeholder="请输入密码" value={this.state.userpassword} onChange={this.setuserpassword} />
                                <div className='box'>
                                    <Button type="primary" shape="round" className='btn1' onClick={this.sentuser}>登录</Button>
                                    <Button type="primary" shape="round" className='btn2' onClick={this.clearuser}>重置</Button>
                                    <Button type="link" className='btn3' onClick={this.movetoregister}>没有账号?点击注册</Button>
                                </div>

                            </Card>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <AndroidOutlined />
                                    管理员登录
                                </span>
                            }
                            key="2"
                        >
                            <Card title="管理员登录" hoverable className='card'>
                                <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} value={this.state.adminname} onChange={this.setadminname} />
                                <Input.Password size="large" placeholder="请输入密码" value={this.state.adminpassword} onChange={this.setadminpassword} />
                                <div className='box'>
                                    <Button type="primary" shape="round" className='btn1' onClick={this.sentadmin}>登录</Button>
                                    <Button type="primary" shape="round" className='btn2' onClick={this.clearadmin}>重置</Button>
                                </div>
                            </Card>
                        </TabPane>
                    </Tabs>

                </div>
            </div>
        )
    }
}
