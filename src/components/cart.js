import React, { Component } from 'react';
import {CartArray} from "../actions/foodActions";
import {CharityArray, fetchCharities} from "../actions/cartActions";
import {connect} from 'react-redux';
import { Card } from 'react-bootstrap';
import { render } from '@testing-library/react';
import {ceil} from "mathjs";
import {cartTotal} from '../actions/foodActions'
import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Cart extends Component{

    componentDidMount(){
        const {dispatch} = this.props
        dispatch(fetchCharities())
    }

    roundTotal(total) {
        console.log(total);
        // Get the checkbox
        var checkBox = document.getElementsByName("boxes");
        console.log(checkBox.length)
        // Get the output text
        var text = document.getElementById("text");
        var valuetotal = document.getElementById("valuetotal");

        // If the checkbox is checked, display the output text
        for (var i = 0; i< checkBox.length; i++) {
            if (checkBox[i].checked == true) {
                total = ceil(total);
                text.style.display = "block";
                valuetotal.innerHTML = "Total price: " + total;
                cartTotal[0] = total
                console.log(total);
            } else {
                text.style.display = "none";
                console.log("hit else in roundtotla")
            }
        }
    }

    render(){
        const items = []
        const charities = []

        var total = 0
        for(var i = 0; i < CartArray.length; i++){
            items.push(
            <div class ='col-sm-3 p-3'>
                <Card  style={{ width: '20rem' }}>
                <Card.Img variant="top" src={CartArray[i].imageUrl} height="200vw"/>
                <Card.Body >
                    <Card.Title>{CartArray[i].name}</Card.Title>
                    <Card.Text>
                    <p class='price'>Price: {CartArray[i].cost}</p>
                    <p class='calories'>Calories: {CartArray[i].calories}</p>
                    </Card.Text>
                </Card.Body>
                </Card>
            </div>

            )
            total = total + CartArray[i].cost
        }
        cartTotal[0] = total
        for (var i = 0; i<this.props.charities.length; i++){
            charities.push(
                <div className='col-sm-3 p-3'>
                    <Card style={{width: '20rem'}}>
                        <Card.Img variant="top" src={this.props.charities[i].imageUrl} height="200vw"/>
                        <Card.Body>
                            <Card.Title>{this.props.charities[i].name}</Card.Title>
                            <Card.Text>
                                <p className='description'>{this.props.charities[i].description}</p>
                                <p id="text" style={{display:"none"}}>charity added!</p>
                            </Card.Text>
                            <input name="boxes" type="checkbox" id="myCheck" onClick={()=>this.roundTotal(total)}/>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        return(<div>
            <section>{items}</section>
            <section>{charities}</section>
            <div><h2 id="valuetotal" ><p style={{display:"block"}}>Total price: {total}</p></h2></div>
            <LinkContainer to={'/checkOut'}>
                <Nav.Link><button>Check Out</button></Nav.Link>
            </LinkContainer>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        charities: state.charity.charities
    }
}

export default connect(mapStateToProps)(Cart)
