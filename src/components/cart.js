import React, { Component } from 'react';
import { fetchFoods } from "../actions/foodActions";
import { setFood } from "../actions/foodActions";
import {connect} from 'react-redux';
import { Card, Button } from 'react-bootstrap';



class Cart extends Component{
    constructor(props){
        super(props)
        this.handlesSelect = this.handlesSelect.bind(this)
    }




    render(){
        const CartListCards = ({cartList}) => {
            return (
                <div class="row">
                    {cartList.map((cart) =>
                    <div class="col-sm-3 p-3">
                        <Card  style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={cart.imageUrl} height="200vw"/>
                        <Card.Body>
                            <Card.Title>{cart.name}</Card.Title>
                            <Card.Text>
                            <p>Price: {cart.cost}</p>
                            <p>Calories: {cart.calories}</p>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                        </div>
                    )}

                </div>

            )
        }
        return (
            <FoodListCards cartList={this.props.cart} />
        )
    }
}
