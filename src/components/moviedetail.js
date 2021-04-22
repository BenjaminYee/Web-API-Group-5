// Item details- calaories, desc, etc...

import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem, Form, Button} from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';
import runtimeEnv from '@mars/heroku-js-runtime-env'


// need to finish
class Review extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.submitReivew = this.review.bind(this);
        this.state = {
            details:{
                rating: 3,
                comment: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    // work in progress
    review() {
        const env = runtimeEnv();
        let rev = {
            'movieid': this.props.movieId,
            'comment': this.state.details.comment,
            'rating': this.state.details.rating
        };
        let formBody = [];
        for (let property in rev) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(rev[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        };

        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            body: formBody
        })
        .then((response) => {
            if (!response || !response.status) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) => {
            console.log("res: "+JSON.stringify(res));
            window.location.reload();
        })
        .catch((e) => console.log(e));
    }

    render(){
        return (
            <Form className='form-horizontal'>
                <Form.Group controlId="rating">
                    <Form.Label>Moving rating out of 5</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.rating} type="text" placeholder="Enter your moving rating" />
                </Form.Group>

                <Form.Group controlId="comment">
                    <Form.Label>Your comment about the movie</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.comment}  type="text" placeholder="Comment" />
                </Form.Group>
                <Button onClick={this.review}>Submit Review</Button>
            </Form>
        )
    }
}


class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.characters.map((characters, i) =>
                                <p key={i}>
                                    <b>{characters.actorName}</b> {characters.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.name}</b>&nbsp; {review.comment}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                </Card>
            )
        }
        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

