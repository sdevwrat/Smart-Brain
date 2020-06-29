import React from 'react';
import '../CSS/link.css';
const Imagelink = ({onInputChange,onSubmit}) => {
	return (
		<div>
			<p className='f3'> This brain will detect faces in your pic..</p>
			<div className='center'>
			<div className='form center pa4 br3 shadow-5'>
				<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} placeholder="Paste an image link here"/>
				<button className='w-30 grow f4 link dib whit bg-light-purple pointer' onClick={onSubmit} >Detect</button>
			</div>
			</div>
		</div>
	);
}

export default Imagelink;