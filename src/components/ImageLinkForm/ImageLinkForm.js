import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({onInputChange,onPictureSubmit})=>{
	return(
		<div>
			<p className="f3">
			{"This Genious Mind will detect faces in your pictures.Give it a shot."}
			</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input onChange={onInputChange} className="f4 pa2  shadow-5 w-70 center" type="text"/>
					<button onClick={onPictureSubmit} className="w-30  shadow-5 f4 link ph3 grow pv2 dib white bg-light-purple">Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;