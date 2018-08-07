var d = document,
content = d.querySelector('.content');

Array.from({ length: 1000 }).map(() => {
	var el = d.createElement('div');
	el.classList.add('pixel');
	content.appendChild(el);
});

var pixels = Array.from(d.querySelectorAll('.pixel'));

var colors = [
	'black',
	'yellow',
	'red',
	'green',
	'blue',
	'gray',
	'white'
];

activeColor = colors[0];

colors.map( color => {
	var el = d.createElement('div');
	el.classList.add(color);
	el.addEventListener('mousedown', e => activeColor = el.className );
	d.querySelector('.control').appendChild(el);	
});

pixels.map( el => {

	let isPressed = false; //FIX
	
	var changeColor = () => { //FIX REMOVE OLD COLOR SELECTOR
		if( isPressed ){
			el.classList.add(activeColor);
		}
	};	

	content.addEventListener('mousedown', e => {
		isPressed = true;
		el.addEventListener('mouseover', changeColor );
	});
	
	content.addEventListener('mouseup', e => {
		isPressed = false;
		el.removeEventListener('mouseover', changeColor );		
	});

});

d.querySelector('.save').addEventListener('click', e => {

	var canvas = d.createElement('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width = content.width;
	canvas.height = content.height;

	html2canvas(content).then( canvas => {		
		
		fetch(canvas.toDataURL("image/png"))
		.then(res => res.blob())
		.then(blob => saveAs(blob, 'img.png'));
	
	});	
});
