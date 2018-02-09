import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

 class  PlaceField extends Component{
     constructor(props){
         super(props);
         this.handleSelect=this.handleSelect.bind(this);
     }
    
      handleSelect = (address, placeId) => {
        // console.log("addres",address)
        const { _onChange }=this.props
       _onChange(address);
      
      
      }
      render(){
          console.log(this.props)
          const {input} =this.props
        return(
            <PlacesAutocomplete 
            inputProps={{
              ...input
            }}
            onSelect={this.handleSelect}
          />
            )
      }
   
}

export default PlaceField



// AIzaSyAfQ1iEt1jvI_uyiXmwXvbJIxL-_HDInMo     google Api key
