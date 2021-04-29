import React, { Component } from 'react';
import { fetchFoods } from "../actions/foodActions";
import { setFood } from "../actions/foodActions";
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import { Card, Button, Carousel } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';



class FoodList extends Component{
    constructor(props){
        super(props)
        this.handlesSelect = this.handlesSelect.bind(this)
    }

    componentDidMount(){
        const {dispatch} = this.props
        dispatch(fetchFoods())
    }

    handlesSelect(selectedIndex, e){
        const {dispatch} = this.props
        dispatch(setFood(this.props.foods[selectedIndex]))
    }

    handleClick = (food) => {
        const {dispatch} = this.props
        dispatch(setFood(food))
    }


    render(){
        const FoodListCards = ({foodList}) => {
            if (!foodList){
                return <div>Loading...</div>
            }
            return (
                <div class="row">
                    {foodList.map((food) =>
                    <div class="col-sm-3 p-3">
                        <Card  style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={food.imageUrl} height="200vw"/>
                        <Card.Body>
                            <Card.Title>{food.name}</Card.Title>
                            <Card.Text>
                            <p>Price: {food.cost}</p>
                            <p>Calories: {food.calories}</p>
                            </Card.Text>
                            <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                        </Card>
                        </div>
                    )}

                </div>
                
            )
        }
        return (
            <FoodListCards foodList={this.props.foods} />
        )
    }
}


const mapStateToProps = state => {
    return {
        foods: state.food.foods
    }
}


export default connect(mapStateToProps)(FoodList)
