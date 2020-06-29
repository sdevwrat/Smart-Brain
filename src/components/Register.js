import React from 'react';

const validEmailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

class Register extends React.Component {
		constructor(props){
		super(props);
		this.state ={
			email: '',
			password: '',
			name:'',
			email_error:null,
			name_error:null,
			pass_error:null
		}
	}

	onEmailchange =(event)=>{
		this.setState({ email : event.target.value});
		if(validEmailRegex.test(event.target.value)===false || event.target.value===0){
				this.setState({ email_error :'invalid email address'});
			}
		else{
			this.setState({ email_error :null});
		}
	}
	onPassswordChange =(event)=>{
		this.setState({	password: event.target.value})
		if(event.target.value.length<6){
				this.setState({ pass_error :'Length of password should be atleast 6 '});
			}
		else{
			this.setState({ pass_error :null});
		}

	}
	onNamechange = (event) => {
		this.setState({ name : event.target.value})
		if(event.target.value.length<4){
				this.setState({ name_error :'Name should have length atleast 4'});
			}
		else{
			this.setState({ name_error :null});
		}
	}
	onsubmit = (e) =>{
		e.preventDefault();
		if(this.state.name_error || this.state.email_error || this.state.pass_error || !this.state.email.length || !this.state.password.length || !this.state.name.length)
			alert('Enter valid credentials');
		else{
			fetch('https://brain-face-server.herokuapp.com/register', { 
					method : 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({	
						password: this.state.password,
						email: this.state.email,
						name:this.state.name
					}) 
				})
				.then(response => response.json())
				.then(user => {
						if (user!=="Exist") {
							this.props.loadUser(user)
							this.props.onroutechange('home');
						}
						else{
							alert("Email already Registered");
						}
					})
		}
	}
	render(){
	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center sbg">
			<main className="pa4 black-80">
			  <form className="measure">
			      <legend className="f2 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="fl db fw6 lh-copy f6" htmlFor="name" >Name</label>
			        <input onChange={this.onNamechange}
			      	className="pa2 input-reset ba bg-transparent hover-bg-black  w-100" type="text" name="name"  id="name" placeholder="Ex: John"/>
  					{this.state.name.length>0 && 
  						<p className='text-left valid'>{this.state.name_error}</p>
  					}
			      </div>
			      <div className="mt3">
			        <label className="fl db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
			        <input onChange={this.onEmailchange}  
			        className="pa2 input-reset ba bg-transparent hover-bg-black w-100" type='email' name="email-address"  id="email-address" placeholder="Ex: test@gmail.com"/>
  					{this.state.email.length>0 &&<p className='text-left valid'>{this.state.email_error}</p>}
  					</div>
			      <div className="mv3">
			        <label className="fl db fw6 lh-copy f6" htmlFor="password" >Password</label>
			        <input onChange={this.onPassswordChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black w-100" type="password" name="password"  id="password" placeholder="Ex: qwerty@123"/>
  					{this.state.password.length>0 && <p className='text-left valid'>{this.state.pass_error}</p>}
			      </div>
			    <div className="lh-copy mt3">
			      <input onClick={this.onsubmit} 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
			      type="submit" value="Register" />
			    </div>
			  </form>
			</main>
		</article>
	);
}
}

export default Register;