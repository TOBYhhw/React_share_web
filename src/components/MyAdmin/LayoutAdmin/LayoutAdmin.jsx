import React, { Component } from 'react'
import "./LayoutAdmin.css"
import { withRouter } from "react-router-dom"
import { Layout, Menu, message } from 'antd';
import { ReadOutlined, CommentOutlined, UserOutlined, UserDeleteOutlined, TeamOutlined } from '@ant-design/icons';
import imgURL from "../../../../src/css/5.jpg"
const { Header } = Layout;
class LayoutAdmin extends Component {
    componentDidMount = () => {
        window.sessionStorage.setItem("key", "hallpage")
    }
    select = (e) => {
        if (e.key === "admin") {
            return
        }
        if (e.key === "LOGOUT") {
            window.sessionStorage.removeItem("token")
            window.sessionStorage.removeItem("username")
            message.success("注销成功！")
            this.props.history.push("/index/home")
            window.sessionStorage.setItem("key", "home")
            return
        }
        this.props.history.push(`/myadmin/${e.key}`)
        window.sessionStorage.setItem("key", e.key)
    }
    render() {
        return (
            <Header>
                <div className="logo" >
                    <img src={imgURL} alt="" width="100px" height="50px" className='img' />
                </div>
                <Menu onClick={this.select} theme="dark" mode="horizontal" defaultSelectedKeys={['hallpage']} selectedKeys={[window.sessionStorage.getItem("key")]}>
                    <Menu.Item key="hallpage" icon={<CommentOutlined />}>
                        公告和留言管理
                    </Menu.Item>
                    <Menu.Item key="resourcepage" icon={<ReadOutlined />}>
                        文章管理
                    </Menu.Item>
                    <Menu.Item key="userpage" icon={<UserOutlined />}>
                        用户管理
                    </Menu.Item>
                    <Menu.Item key="admin" icon={<UserDeleteOutlined />}>
                        {window.sessionStorage.getItem("username")}
                    </Menu.Item>
                    <Menu.Item key="LOGOUT" icon={<TeamOutlined />}>
                        注销
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}
export default withRouter(LayoutAdmin)
