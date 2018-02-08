import React,{ Component } from 'react';

class Counter extends Component{
    constructor(props){
        super(props)
        this.state={
            count:0
        }
        this.handleclick=this.handleclick.bind(this)
        this.handleclickm=this.handleclickm.bind(this)
    }

    handleclick(){
        this.setState(prevState =>  ({count: prevState.count + 1}));
    }

    handleclickm(){
       return this.state.count<=0 ?  
       this.setState({ count: 0}) : 
       this.setState((prevState)=> ({count: prevState.count -1 }));
    }

    render(){
        const  {count}=this.state;
        return(
            <div>
                <h3>Counter: {count}</h3>
                <button type="button" onClick={this.handleclick}>+</button><br />
                <button type="button" onClick={this.handleclickm}>-</button>
            </div>
        )
    }

}



export default Counter;