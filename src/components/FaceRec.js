import React from 'react';
import '../CSS/facerec.css';

const FaceRec = ({ imageUrl , box}) => {
	return (
		<div className='center mb4'>
		<div className='absolute mt2'>
			<img id='inputimage' alt='' src={imageUrl} width='480px' heigth='auto' />
			<div className='boundingbox' style={{top:box.toprow, right:box.rightcol , bottom:box.bottomrow, left:box.leftcol}}></div>
		</div>
		</div>
	);
} 

export default FaceRec;