import React, { Component } from 'react'
import { Layout } from 'antd';
import "./Contents.css"
import HallPage from './HallPage/HallPage';
import ResourcePage from './ResourcePage/ResourcePage';
import UserPage from './UserPage/UserPage';
import { Route, Switch, Redirect } from "react-router-dom"
const { Content } = Layout;
export default class Contents extends Component {
    render() {
        return (
            <Content style={{ padding: '0 50px' }}>
                <Switch>
                    <Route path="/myadmin/hallpage" component={HallPage} />
                    <Route path="/myadmin/resourcepage" component={ResourcePage} />
                    <Route path="/myadmin/userpage" component={UserPage} />
                    <Redirect to="/myadmin/hallpage" />
                </Switch>
            </Content>
        )
    }
}
