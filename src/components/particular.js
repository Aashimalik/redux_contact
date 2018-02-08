import React,{ Component } from 'react';
import {Http} from '../lib/Http';
import  { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

class ParticularContact extends Component{
 constructor(props){
 super(props);
 this.state={
     contact:{},
 }
 this.deleteclick=this.deleteclick.bind(this);
 
 }
deleteclick() {
   const {history}=this.props
       const {match}=this.props;
         let id=match.params.id;
        Http.delete(`adminapi/contact/${id}`)
        .then((data) => {
            console.log("insed error");
            this.setState({
               smShow:false
            })
          history.push('/show')
           
    })
        .catch((err)=>{console.log(err)})
    }          

 componentDidMount() {
     const {match}=this.props;
         let id=match.params.id;
        Http.get(`adminapi/contact/${id}`)
        .then((data) => {
     
         this.setState({
            contact:data.contact
           })
        })
        .catch((err)=>{console.log(err)})
    }

    
 render(){
    const {_id,name,phno,email,address}=this.state.contact;
     return(
    <div className="container">
    <div className="row">
    <div className="col-sm-4 col-sm-offset-1">
               
                <h1 className="h">{name}</h1>
                <p className="pr"><b>Phone no :</b>{phno}<br/>
            <b> Email : </b>{email}<br/>
        <b>Address: </b>{address}</p>
             
            </div>
        </div>
<Button bsStyle="info" onClick={this.deleteclick}>Delete</Button>
     
        <LinkContainer to={"/edit/"+_id}>
        <button  id="editbtn" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" ><i className="material-icons">mode_edit</i></button>
        </LinkContainer>
       
        {/* href={"/delete/"+_id} */}
    </div>
 
 
     )
 }
};

export default ParticularContact;
