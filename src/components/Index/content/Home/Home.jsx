import React, { Component } from 'react'
import LunBoTu from './LunBoTU/LunBoTu';
import Hall from '../Hall/Hall';
import { Breadcrumb } from 'antd';
export default class Home extends Component {
    render() {
        return (
            <div> <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
                <div className="site-layout-content">
                    <LunBoTu></LunBoTu>
                    <br />
                    <Hall></Hall>
                </div>
            </div>
        )
    }
}
