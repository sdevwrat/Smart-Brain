import React from 'react';

class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			error:null
		};
		this.onEmailchange = this.onEmailchange.bind(this);
		this.onPassswordChange= this.onPassswordChange.bind(this);
		 this.onsubmitSignin = this.onsubmitSignin.bind(this);
	}

	onEmailchange = (event) => {
		this.setState({ signInEmail : event.target.value,
		error:null})
	}
	onPassswordChange = (event) => {
		this.setState({
			signInPassword: event.target.value,
			error:null
		})
	}
	onsubmitSignin (e){
		e.preventDefault();
		if(this.state.signInEmail && this.state.signInPassword){
			fetch('https://brain-face-server.herokuapp.com/signin', { 
			method : 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({	
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.onroutechange('home');
				}
				else{
					this.setState({error:"Incorrect Email or Password"});
				}
			})
		}
		else
			this.setState({error:'Enter valid Email and Password'});
	}
	render(){
		const{ onroutechange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center sbg">
				<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="fl db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
				        <input onChange={this.onEmailchange}
				         className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
				         type="email" name="email-address"  id="email-address" placeholder="Enter email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="fl db fw6 lh-copy f6" htmlFor="password" >Password</label>
				        <input onChange = {this.onPassswordChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black w-100" type="password" name="password"  id="password" placeholder="Enter password"/>
				      </div>
				    </fieldset>
  						<p className='text-left valid'>{this.state.error}</p>
				    <div className="lh-copy mt3">
				      <input onClick= {this.onsubmitSignin} 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      type="submit" value="Sign in" />
				    </div> 
				    <div className="lh-copy mt3">
				      <p  onClick={() =>onroutechange('Register')} className="pointer f6 link dim black db">Register</p>
				    </div>
				  </form>
				</main>
			</article>
		);
	}
}

export default Signin;