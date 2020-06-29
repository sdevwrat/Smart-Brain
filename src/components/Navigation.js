import React from 'react';

const Navigation = ({issigned, onroutechange}) => {
		if(issigned){
				return (
				<nav style={{display:'flex',justifyContent:'flex-end'}}>
					<p onClick={() => onroutechange('signout')}  className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				</nav>
			);
		}
		else{
			return(
				<nav style={{display:'flex',justifyContent:'flex-end'}}>
					<p onClick={() => onroutechange('signin')}  className='f3 link dim black underline pa3 pointer'>Sign in</p>
					<p onClick={() => onroutechange('Register')}  className='f3 link dim black underline pa3 pointer'>Register</p>
				</nav>
			);
		}
} 

export default Navigation;