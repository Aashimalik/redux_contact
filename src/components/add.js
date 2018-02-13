import React,{ Component } from 'react';
import {Http} from '../lib/Http';
import {connect} from 'react-redux';
import { Form,Button } from 'react-bootstrap';
import { Field ,reduxForm} from 'redux-form';
import {FormField} from '../common/FormField';
import PlaceField from './address';
import  { geocodeByAddress } from 'react-places-autocomplete'


class CreateContact extends Component{
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.handleupdateclick = this.handleupdateclick.bind(this);
        this.addSelect=this.addSelect.bind(this);
        this.checkadress=this.checkadress.bind(this);
        
    }

    checkadress(placee){
        let place=placee["0"]
        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'long_name',
            country: 'long_name',
            postal_code: 'short_name'
          };
    
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                if(addressType==='locality'){
                this.props.change("State",val)
                }
                else if(addressType==='administrative_area_level_1'){
                    this.props.change("City",val)
                }
                else if(addressType==='country'){
                    this.props.change("Country",val)
                }
            
            }
            }
            
    }
    

    addSelect(value){
        geocodeByAddress(value)
        .then(results => this.checkadress(results))
        .catch(error => console.error(error))
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
         if(router.pathname==='/add' && oldPath===`/edit/${id}`){
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
     
        const {  handleSubmit, submitting} = this.props
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
                component={FormField} type="text"
                name="phno" label="Phone Number"
                placeholder="Enter Phone No" 
                />
                <Field 
                component={FormField} type="email"
                name="email" label="email"
                placeholder="Enter email address" 
                />       
                <Field 
                name="address"
                type="text"
                component={PlaceField}
                _onChange={this.addSelect}
                />
                <Field 
                component={FormField} type="text"
                name="State" label="State"
                />
                <Field 
                readOnly="readOnly"
                component={FormField} type="text"
                name="City" label="City"
                />
                <Field 
                component={FormField} type="text"
                name="Country" label="Country"
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
    const { router } = state
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


