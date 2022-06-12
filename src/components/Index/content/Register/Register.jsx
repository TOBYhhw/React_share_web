import React, { Component } from 'react'
import { apiRegister } from "../../../../request/api/user"
import { Breadcrumb, Input, Card, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./Register.css"
export default class Register extends Component {
    state = {
        name: '',
        password: '',
    }
    setname = (e) => {
        this.setState({ name: e.target.value })

    }
    setpassword = (e) => {
        this.setState({ password: e.target.value })

    }
    sent = () => {
        const data = {
            password: this.state.password,
            username: this.state.name
        }
        apiRegister(data).then((res) => {
            if (res.data === false) {
                message.error("该用户名已存在");
            } else {
                message.success("注册成功")
                this.props.history.push("/index/logining")
                window.sessionStorage.setItem("key", "logining")
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    clear = () => {
        this.setState({ name: "" })
        this.setState({ password: "" })
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Register</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <Card title="用户注册" hoverable className='card1'>
                        <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} value={this.state.name} onChange={this.setname} />
                        <Input.Password size="large" placeholder="请输入密码" value={this.state.password} onChange={this.setpassword} />
                        <div className='box'>
                            <Button type="primary" shape="round" className='btn1' onClick={this.sent}>注册</Button>
                            <Button type="primary" shape="round" className='btn2' onClick={this.clear}>重置</Button>
                        </div>

                    </Card>
                </div>
            </div>
        )
    }
}
