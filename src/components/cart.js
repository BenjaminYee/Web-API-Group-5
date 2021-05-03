import React, { Component } from 'react';
import {CartArray} from "../actions/foodActions";
import {CharityArray} from "../actions/cartActions";
import {connect} from 'react-redux';
import { Card } from 'react-bootstrap';
import { render } from '@testing-library/react';



class Cart extends Component{
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
        for (var i = 0; i<CharityArray.length; i++){
            charities.push(
                <div className='col-sm-3 p-3'>
                    <Card style={{width: '20rem'}}>
                        <Card.Img variant="top" src={CharityArray[i].imageUrl} height="200vw"/>
                        <Card.Body>
                            <Card.Title>{CharityArray[i].name}</Card.Title>
                            <Card.Text>
                                <p className='description'>{CharityArray[i].description}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )

        }

        return(<div>
            <div>{items}</div>
            <div>{charities}</div>
            <div><h2>Total price: {total}</h2></div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Cart)
