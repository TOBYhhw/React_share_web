import React, { Component } from 'react'
import { Layout } from 'antd';
import "./Contents.css"
import Home from './Home/Home';
import Resource from './Resource/Resource';
import Logining from './Logining/Logining';
import Register from './Register/Register';
import { Route, Switch, Redirect } from "react-router-dom"
const { Content } = Layout;
export default class Contents extends Component {
    render() {
        return (
            <Content style={{ padding: '0 50px' }}>
                <Switch>
                    <Route path="/index/home" component={Home} />
                    <Route path="/index/resource" component={Resource} />
                    <Route path="/index/logining" component={Logining} />
                    <Route path="/index/register" component={Register} />
                    <Redirect to="/index/home" />
                </Switch>
            </Content>
        )
    }
}
