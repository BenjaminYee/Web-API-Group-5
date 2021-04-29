import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import { Card, Button, Carousel } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class CharityList extends Component{
  constructor(props){
      super(props)
      this.handlesSelect = this.handlesSelect.bind(this)
  }

  componentDidMount(){
    const {dispatch} = this.props
    dispatch(fetchCharity())
  }

  handlesSelect(selectionIndex, e){
    const {dispatch} = this.props
    dispatch(setCharity(this.props.funds[selectedIndex]))
  }

  handleClick = (charity) => {
    const {dispatch} = this.props
    dispatch(fetchCharity(Charity))
  }

  render(){
    const CharityListCards = ({charityList}) => {
      if(!charityList){
        return <div>Loading....</div>
      }
      return (
          <div class="row">
              {charityList.map((charity) =>
              <div class="col-sm-3 p-3">
                  <Card  style={{ width: '20rem' }}>
                  <Card.Img variant="top" src={charity.imageUrl} height="200vw"/>
                  <Card.Body>
                      <Card.Title>{charity.name}</Card.Title>
                      <Card.Text>
                      <p>Description: {charity.description}</p>
                      </Card.Text>
                      <Button onClick={this.handleClick(charity)}>pick charity</Button>
                  </Card.Body>
                  </Card>
                  </div>
              )}

          </div>

      )
  }
  return (
      <CharityListCards charityList={this.props.charity} />
  )
}
}
const mapStateToProps = state => {
    return {
        charitys: state.charity.charitys
    }
}

export defult connect(mapStateToProps)(ChairityList)
