import React,{ Component } from 'react';
import {Http} from '../lib/Http';
import {Loader} from './Loader';
import PaginationList from './Pagination';
import { Table,Checkbox} from 'react-bootstrap';
import ShowPopup from './ShowPopup';
import ShowRow from './ShowRow';


class ShowContact extends Component{
    constructor(props){
        super(props);
        this.state = {
            contacts: [],
            selectarr:[],
            isLoading:true,
            activePage:1,
            pageCount:0,
            smShow: false,
            user:{},
    
        };
        
        this.handleClick=this.handleClick.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handledeleteclick=this.handledeleteclick.bind(this);
        this.deleteclick=this.deleteclick.bind(this);
        this.active=this.active.bind(this);
        this.inactive=this.inactive.bind(this);
        this.handlecheckbox=this.handlecheckbox.bind(this);
    }
    inactive(user){
      
        user.status=false
        const {status}=user
        let id=user._id
        this.setState({
           user:user
         })
        Http.put(`adminapi/contact/update/${id}`,{status})
        .then((data) => {
           
        const {status}=data.contact;
        this.setState({
            status
        });
     })
        .catch((err)=>{
         console.log(err)})
    }

    active(user){
   
        user.status=true
        const {status}=user
        let id=user._id
        this.setState({
           user:user
         })
        
        Http.put(`adminapi/contact/update/${id}`,{status})
        .then((data) => {
        const {status}=data.contact;
      
        this.setState({
            status
        });
     })
        .catch((err)=>{
         console.log(err)})
    }

    handlestatusfclick(user){
        user.status=false
        const {status}=user
        let id=user._id
        this.setState({
           user:user
         })
        Http.put(`adminapi/contact/update/${id}`,{status})
        .then((data) => {
        const {status}=data.contact;
        this.setState({
            status
        });
     })
        .catch((err)=>{
         console.log(err)})
    }

    handledeleteclick(user) {
        this.setState({
            user:user,
            smShow:true
        })
        
    }
    
    deleteclick(){
        let id=this.state.user._id;
        Http.delete(`adminapi/contact/${id}`)
        .then((data) => {
            this.setState({
               smShow:false
            })
        this.componentDidMount()
        })
        .catch((err)=>{console.log(err)})
    }
     
    handleClick(event) {
        this.setState({
            activePage:event
        })
        
            this.httphandle(event)
    }

    searchParam(event){
        this.setState({
           activePage:event 
        })
       const {history}=this.props;
       history.push({search:`?page=${event}`})
    }
         
    httphandle(event){
    
       this.searchParam(event);
        return new Promise((resolve, reject) => {
            Http.get(`adminapi/api/contacts?page=${event}`)
            .then((data) => {
       
                this.setState({
                    contacts:data.contacts,
                    pageCount:data.pageCount,
                    isLoading:false,
                })  

            })
            .catch((err)=>{console.log(err)})
            });
    }

    componentDidMount(){
        const {history}=this.props
        let p=this.props.history.location.search
        let urlParts = p.split('=');
        let k=parseInt(urlParts[1],10);
        if(Number.isNaN(k)){
            history.push("/show?page=1")
            this.httphandle(1);
        }
         else{
            this.searchParam(k);
            this.httphandle(k);
        }
    } 

    toggleModal(){
        this.setState(function(prevState) {
            return {smShow: !prevState.smShow};
        })
    } 

    handlecheckbox(e,user){
           if(e.target.checked){
            this.state.selectarr.push(user._id);
            console.log("push",this.state.selectarr)
        }
        else if(!e.target.checked){
            let index=this.state.selectarr.indexOf(user._id);
            if(index > -1) this.state.selectarr.splice(index, 1);
            console.log( this.state.selectarr)
            document.getElementById('all').checked=false;

        }
        
    }


    selectAll(e,data){
        if(e.target.checked){
                data.map((data, index) => {
                this.state.selectarr.push(data._id);
                let inputs = document.querySelectorAll("input[type='checkbox']");
                for(let i = 0; i < inputs.length; i++){
                    inputs[i].checked = true;
                    }
                    return this.state.selectarr
                })
                console.log(this.state.selectarr)
            }
   
        else if(!e.target.checked){
           
            let array=[];
            this.setState({
                selectarr:array
            })
            this.setState({selectarr:[]})
            console.log(this.state.selectarr)
            let inputs = document.querySelectorAll("input[type='checkbox']");
            for(let i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;   
            }
        }
       
    }

    render(){
       
        const {contacts,pageCount}=this.state;
        const isLoading=this.state.isLoading;
        const activePage=this.state.activePage;
      
      // let smClose = () => this.setState({ smShow: false });
      // let smSet=()=> this.setState({ smShow: true});
        if(isLoading){
            return(
                // <div><h1>Data is loading</h1></div>
                <Loader/>
            ); 
        }
        else if(contacts.length>0){
            return(
                <div className="container">
                             <Table  striped bordered condensed hover>
                    <thead>
                        <tr className="bg-info">
                        <th><Checkbox id="all" inline  onChange={(e)=>this.selectAll(e,contacts)} >Select</Checkbox></th>
                            <th>Username</th>
                            <th>Phone No</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Status</th>
                           
                            {/* <th>Delete</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((user,index)=>{
                            return (
                                <ShowRow handlecheckbox={this.handlecheckbox} contacts={this.state.contacts} selectarr={this.state.selectarr} active={this.active} inactive={this.inactive} handledeleteclick={this.handledeleteclick} smShow={this.state.smShow} user={user} key={index}/>
      
                            );
                        })}
                    </tbody>
                </Table>
                <PaginationList items={pageCount} activePage={activePage} onSelect={this.handleClick}/> 
               <ShowPopup show={this.state.smShow} onHide={this.toggleModal} deleteclick={this.deleteclick}/>
                </div>           
            );
        }
        else if(contacts.length===0){
            return(
                <div><h1>No record found</h1></div>
            );
        }
    }   
}


export default ShowContact;
