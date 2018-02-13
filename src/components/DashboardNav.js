import React,{Component} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {NavItem,Button,Nav} from 'react-bootstrap';
import {getCookie} from '../lib/helper';
import {delete_cookie} from '../lib/helper';

class DashboardNav extends Component{
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }
   
    render(){
     const  token=getCookie('token');
     
        return(
                <div>
                {token 
                ? <Nav pullRight={true}>
                        <LinkContainer to="/add">
		   	            <NavItem eventKey={1} >Add Contact</NavItem>
		   	            </LinkContainer> 
                        <LinkContainer to="/show?page=1">
		   	            <NavItem eventKey={2} >Show Contact</NavItem>
                        </LinkContainer> 
                        <LinkContainer to="/chat">
		            	<NavItem eventKey={3}>Chat </NavItem>
		   	            </LinkContainer>
                        <LinkContainer to="/logout">
		            	<NavItem eventKey={3}> <Button onClick={()=>delete_cookie('token')} bsSize="small" bsStyle="primary">Logout</Button></NavItem>
		   	            </LinkContainer>
                           <LinkContainer to="/myprofile">
		            	<NavItem eventKey={4}>Myprofile</NavItem>
		   	            </LinkContainer>
                          
                        </Nav>
                :   <Nav>
                            <LinkContainer to="/login">
                            <NavItem eventKey={4}> Login</NavItem>
                            </LinkContainer>
                        </Nav>
                           
                        }
                 </div>       
             
    
        );
    
}
}

export default DashboardNav;

