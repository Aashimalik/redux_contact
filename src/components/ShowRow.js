import React,{ Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import * as moment from 'moment';
import { DropdownButton,MenuItem } from 'react-bootstrap';
import { statusLabel } from '../lib/helper';

 
class ShowRow extends Component{

    render(){
    
    	const {user,handledeleteclick,active,inactive,handlecheckbox}=this.props;
    	      return(

             <tr>
                                    <td >                                
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="selectAll" onChange={(e)=>handlecheckbox(e,user)}/>
                                    <label htmlFor="selectAll"></label> 
                                    </span>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.phno}</td>
                                    <td>{user.email}</td>
                                    <td>{moment(user.created_at).format('MMM DD, YYYY')}</td>
                                    <td>{statusLabel(user.status) }</td>
                                    <td>
                                    <DropdownButton value="" bsSize="xsmall" bsStyle="primary" title="Action" id="bg-nested-dropdown">
                                    <LinkContainer to={"/particular/"+user._id}><MenuItem  eventKey="1">view</MenuItem></LinkContainer>
                                    <LinkContainer to={"/edit/"+user._id}><MenuItem   eventKey="2">Edit</MenuItem></LinkContainer>
            <MenuItem onClick={()=>handledeleteclick(user)} eventKey="3">Delete</MenuItem>
            <MenuItem  onClick={()=>active(user)} eventKey="4">Active</MenuItem>
            <MenuItem onClick={()=>inactive(user)} eventKey="5">Inactive</MenuItem>
		</DropdownButton>
        </td>
                                    {/* <td>
                                    <Link to={"/particular/"+user._id}><Button bsStyle="success">View</Button></Link>
                                    </td>
                                    <td>
                                <Link to={"/edit/"+user._id}><Button bsStyle="primary" >Edit</Button></Link>
                                    </td>
                                    <td><Label bsStyle="primary">Canceled</Label>
                              <Button bsStyle="primary"  onClick={()=>handledeleteclick(user)}>Delete</Button>
                                    </td> */}
                                </tr>
        );
    }
}
export default ShowRow;