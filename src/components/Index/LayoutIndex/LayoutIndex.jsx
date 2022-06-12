import React, { Component } from 'react'
import './LayoutIndex.css'
import { withRouter } from "react-router-dom"
import { Layout, Menu, message } from 'antd';
import { HomeOutlined, ReadOutlined, TeamOutlined, GatewayOutlined } from '@ant-design/icons';
import imgURL from "../../../../src/css/5.jpg"
const { Header } = Layout;
class LayoutIndex extends Component {
    componentDidMount = () => {
        window.sessionStorage.setItem("key", "home")
    }
    select = (e) => {
        if (e.key === "user") {
            return
        }
        if (e.key === "logout") {
            window.sessionStorage.removeItem("token")
            window.sessionStorage.removeItem("username")
            message.success("注销成功！")
            this.props.history.push("/index/home")
            window.sessionStorage.setItem("key", "home")
            return
        }
        if (e.key === "resource") {
            if (!window.sessionStorage.getItem("token")) {
                alert('请先登录！！')
                this.props.history.push("/index/logining")
                window.sessionStorage.setItem("key", "logining")
                return
            }
            else {
                this.props.history.push(`/index/${e.key}`)
                window.sessionStorage.setItem("key", e.key)
            }
        }
        this.props.history.push(`/index/${e.key}`)
        window.sessionStorage.setItem("key", e.key)
    }

    render() {
        return (
            <Header>
                <div className="logo" >
                    <img src={imgURL} alt="" width="100px" height="50px" className='img' />
                </div>
                <Menu onClick={this.select} theme="dark" mode="horizontal" defaultSelectedKeys={['home']} selectedKeys={[window.sessionStorage.getItem("key")]}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        主页
                    </Menu.Item>
                    <Menu.Item key="resource" icon={<ReadOutlined />}>
                        资源文章
                    </Menu.Item>
                    {window.sessionStorage.getItem("token") && window.sessionStorage.getItem("username") ? (<Menu.Item key="user" icon={<TeamOutlined />} >{window.sessionStorage.getItem("username")}</Menu.Item>) : (<Menu.Item key="logining" icon={<TeamOutlined />}>
                        登录
                    </Menu.Item>)}
                    {window.sessionStorage.getItem("token") && window.sessionStorage.getItem("username") ? (<Menu.Item key="logout" icon={<TeamOutlined />} >注销</Menu.Item>) : (<Menu.Item key="register" icon={<GatewayOutlined />}>
                        注册
                    </Menu.Item>
                    )}

                </Menu>
            </Header>
        )
    }
}
export default withRouter(LayoutIndex)
