import React,{ Component } from 'react';
import {Http} from '../lib/Http';
import {connect} from 'react-redux';
import { Form,Button } from 'react-bootstrap';
import { Field, SubmissionError ,reduxForm } from 'redux-form';
import {FormField} from '../common/FormField';
import PlaceField from './address'


class CreateContact extends Component{
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.handleupdateclick = this.handleupdateclick.bind(this);
        this.addSelect=this.addSelect.bind(this);
    }

    addSelect(value){
        console.log("addselect",value)
    }

    handleupdateclick() {
        const { match } = this.props;
        let id = match.params.id;
        Http.get(`adminapi/contact/${id}`)
            .then((data) => {
                const { name, phno, email, address } = data.contact;
                this.props.initialize({ name, phno, email, address })
                
            })
            .catch((err) => { console.log(err) })
    }

    componentWillReceiveProps(newProps){
        const { router } = newProps;
        const {match}=this.props
        let oldPath=this.props.router.pathname;
        let id=match.params.id;
         if(router.pathname=='/add' && oldPath==`/edit/${id}`){
             this.props.initialize({})
         }
    }

    componentDidMount() {
        const { match } = this.props;
        if (match) {
            let id = match.params.id;
            if (id) { this.handleupdateclick(); }
        }
    }

    render() {
     
        const { handleSubmit, submitting,dispatch,router} = this.props
       
        return (
            <div className="container">
                <div className="col-md-5">
                <Form onSubmit={handleSubmit(this.formSubmit)}>
                <Field 
                component={FormField} type="text"
                name="name" label="Name"
                placeholder="Enter Name"
                />
                <Field 
                component={FormField} type="number"
                name="phno" label="Phone Number"
                placeholder="Enter Phone No" 
                />
                <Field 
                component={FormField} type="email"
                name="email" label="email"
                placeholder="Enter email address" 
                />       
                {/* <Field 
                component={FormField} type="text"
                name="address" label="address"
                placeholder="Enter  Address" 
                />  */}
                <Field 
                name="address"
                component={PlaceField}
                _onChange={this.addSelect}
                />
                <Button  bsStyle="primary" type="submit" disabled={submitting}>Submit</Button>
                </Form>
                </div>
            </div>
        )
    }

    formSubmit(values) {
        const { name, phno, email, address } = values;
        const { history } = this.props;
        const { match } = this.props;
        let id = match.params.id;
        if (id) {
            Http.put(`adminapi/contact/update/${id}`, { name, phno, email, address })
            .then((data) => {
                history.push('/show')
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
         Http.post(`adminapi/contact`, { name, phno, email, address })
            .then((data) => {
                const {dispatch,reset} = this.props
                console.log(dispatch(reset('addcontact')));
            })
            .catch((err) => { console.log(err) })
        }

    }
}

const mapStateToProps = (state) => {
    const { todos, form,router } = state
    return {
        router:router.location
    }
}

const addForm = reduxForm({
    form: 'addcontact',
    validate: (values) => {
        const errors = {};
        if(!values.name) {
            errors.name = 'Name is required';
        }
        if(!values.phno) {
            errors.phno = 'Mobile No is required';
        }
    	if(!values.email) {
            errors.email = 'Email is required';
         }
     if(!values.address) {
            errors.address = 'Address is required';
      }
      return errors;
      },
})(CreateContact)

export default connect(mapStateToProps) (addForm)