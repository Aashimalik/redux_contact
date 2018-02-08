import React,{ Component } from 'react';




class xyz extends Component{
	render(){
		return (<Abc name='from parent' />);

	}
}

class Abc extends Component{
 render(){
 	// const {name}=this.props;
 	const k=this.props.name;
		return (<h1 >{k}</h1>);

	}
}

export default xyz;