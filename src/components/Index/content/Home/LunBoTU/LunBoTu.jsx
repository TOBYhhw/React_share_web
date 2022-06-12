import React, { Component } from 'react'
import { Carousel } from 'antd';
import imgURL1 from "./css/1.jpg"
import imgURL2 from "./css/2.jpg"
import imgURL3 from "./css/3.jpg"
import imgURL4 from "./css/4.jpg"


export default class LunBoTu extends Component {
    render() {
        return (
            <Carousel autoplay>
                <div>
                    <img src={imgURL1} alt="" width="100%" height="600px" />
                </div>
                <div>
                    <img src={imgURL2} alt="" width="100%" height="600px" />
                </div>
                <div>
                    <img src={imgURL3} alt="" width="100%" height="600px" />
                </div>
                <div>
                    <img src={imgURL4} alt="" width="100%" height="600px" />
                </div>
            </Carousel>
        )
    }
}
