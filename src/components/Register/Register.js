import React from 'react';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			email:'',
			password:''
		}
	}
	onNameChange=(event)=>{
		this.setState({name:event.target.value});
	}

	onEmailChange=(event)=>{
		this.setState({email:event.target.value});
	}

	onPasswordChange=(event)=>{
		this.setState({password:event.target.value});
	}

	onRegister=()=>{
		fetch('http://localhost:3001/register',{
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if(user){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}

	render(){
	return(
		<article className="br3 shadow-5 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="center f1 fw6 ph0 mh0">Register</legend>
		      <div className="mt3">
		        <label className="db2 fw6 lh-copy f5" htmlFor="name">Name</label>
		        <input 
		        	onChange={this.onNameChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="name"  
			        id="name"
		        />
		      </div>
		      <div className="mt3">
		        <label className="db2 fw6 lh-copy f5" htmlFor="email-address">Email</label>
		        <input 
		        	onChange={this.onEmailChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address"
		        />
		      </div>
		      <div className="mv3">
		        <label className="db2 fw6 lh-copy f5" htmlFor="password">Password</label>
		        <input 
		        	onChange={this.onPasswordChange}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password"
		        />
		      </div>
		    </fieldset>
		    <div className="">
		      <input 
		      onClick={this.onRegister}
		      className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		      type="submit" 
		      value="Register"/>
		    </div>
		  </div>
		</main>
	</article>
		);
   }
}


export default Register;