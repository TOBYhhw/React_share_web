import React, { Component } from 'react'
import { Layout } from 'antd';
import LayoutAdmin from './LayoutAdmin/LayoutAdmin';
import Contents from './content/Contents';
import Foot from './Foot/Foot';
export default class MyAdmin extends Component {
    render() {
        return (
            <Layout className="layout">
                <LayoutAdmin></LayoutAdmin>
                <Contents></Contents>
                <Foot></Foot>
            </Layout>
        )
    }
}
