import React,{ Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import DashboardNav from './DashboardNav'

import { LinkContainer } from 'react-router-bootstrap';
class Header extends  Component{
	constructor(props){
		super(props);
		this.state={
			token:'',
			
		}
	}
	render(){
		return(
		 <Navbar>
    		<Navbar.Header>
      			<Navbar.Brand>
        			Contact Book
      			</Navbar.Brand>
    		</Navbar.Header>
	    	<Nav  pullRight={false}>
			<LinkContainer exact={true} to="/">
			<NavItem  eventKey={1}>Home</NavItem>
		   	</LinkContainer> 
			
			{/* <LinkContainer to="/add">
		   	<NavItem eventKey={2} >Add Contact</NavItem>
		   	</LinkContainer>
			<LinkContainer to="/show?page=1">
		   	<NavItem eventKey={3} >Show Contact</NavItem>
		   	</LinkContainer> */}
			{/* <LinkContainer to="/Counter">
			<NavItem eventKey={4} >Counter</NavItem>
			   </LinkContainer>  */}
			   {/* <Button onClick={()=>{delete_cookie('token')}} bsSize="small" bsStyle="primary">Logout</Button> */}
	
	    	</Nav>
			<DashboardNav />
  		</Navbar>
		);
	
		
	}
}

export default Header;