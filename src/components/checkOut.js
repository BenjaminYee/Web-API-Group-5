import React, { Component } from 'react';
import {connect} from 'react-redux';
import {cartTotal} from '../actions/foodActions'


class CheckOut extends Component{
    render(){

        return(<div>
            <div><p>Thank You For Your Purchase</p></div>
            <div><h2>Total price: {cartTotal[0]}</h2></div>
        </div>)
    }
}
const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(CheckOut)
