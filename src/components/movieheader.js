import React, { Component } from 'react';
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {logoutUser} from "../actions/authActions";

class MovieHeader extends Component {
    logout() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                <a href="/">
                    <Navbar.Brand> Food App</Navbar.Brand>
                       </a>
                    <Nav>
                        <LinkContainer to="/foodlist">
                            <Nav.Link disabled={!this.props.loggedIn}>Food Menu</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/cart/' + (this.props.selectedMovie ? this.props.selectedMovie._id : '')}>
                            <Nav.Link disabled={!this.props.loggedIn}>Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signin">
                            <Nav.Link>{this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Log Out {localStorage.getItem('username')}</button> : 'Login'}</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn : state.auth.loggedIn,
        username : state.auth.username,
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieHeader);