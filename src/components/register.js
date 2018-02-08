import React,{ Component } from 'react';

class register extends Component{

    render(){
        return(
            <div className="container">
            <div className="col-md-5">
                <div className="form-area">  
                    <form >
                        <div className="form-group">
                            <input type="text"  className="form-control" id="name"  placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <input type="text"   className="form-control" id="phno" placeholder="Password" required />
                        </div>
                        
                    <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Sign up</button>
                    </form>
                </div>
            </div>

        </div>
        )
    }

}


export default register;