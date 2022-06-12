import React, { Component } from 'react'
import "./Index.css"
import { Layout } from 'antd';
import LayoutIndex from './LayoutIndex/LayoutIndex'
import Contents from './content/Contents'
import Foot from './Foot/Foot';
export default class Index extends Component {
    render() {
        return (
            <Layout className="layout">
                <LayoutIndex></LayoutIndex>
                <Contents></Contents>
                <Foot></Foot>
            </Layout>
        )
    }
}
