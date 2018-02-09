import React, { Component } from 'react';
import { FormGroup,ControlLabel,HelpBlock} from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete'

 class  PlaceField extends Component{
     constructor(props){
         super(props);
         this.handleSelect=this.handleSelect.bind(this);
       
     }
    
      handleSelect = (address, placeId) => {
        const { _onChange }=this.props
       _onChange(address);
       this.props.input.onChange(address)
      
      }

      render(){
         
          const {input,meta} =this.props
        return(
          <FormGroup validationState={!meta.touched ? null : (meta.error ? 'error' : null)}>
          <ControlLabel>Address</ControlLabel>
            <PlacesAutocomplete 
            inputProps={{
              ...input
            }}
            onSelect={this.handleSelect}
          />
          <HelpBlock>
        {meta.touched && meta.error ? meta.error : null}
        </HelpBlock>
          </FormGroup >
            )
      }
   
}

export default PlaceField



// AIzaSyAfQ1iEt1jvI_uyiXmwXvbJIxL-_HDInMo     google Api key
