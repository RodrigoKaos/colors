const colors = [
	'black',
	'yellow',
	'red',
	'green',
	'blue',
	'gray',
	'white'
];
let activeColor = colors[0];
const content = document.querySelector('.content');

createCanvas();


colors.map( color => {
	let el = document.createElement('div');
	el.classList.add(color);
	el.addEventListener('mousedown', e => activeColor = el.className );
	document.querySelector('.control').appendChild(el);	
});

Array.from(document.querySelectorAll('.pixel'))
	.map( el => {

		let isPressed = false; //FIX
		
		const changeColor = () => {
			if( isPressed ){
				let aux = el.classList.value.split(" ");
				
				if( aux.length > 1 && [aux].pop() != activeColor ){
					aux.pop();
					el.classList.value = aux.join(" ");
				}

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

document.querySelector('.save').addEventListener('click', e => {

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	canvas.width = content.width;
	canvas.height = content.height;

	html2canvas(content).then( canvas => {		
		
		fetch(canvas.toDataURL("image/png"))
		.then(res => res.blob())
		.then(blob => saveAs(blob, 'img.png'));
	
	});	
});

function createCanvas(){
	const canvas = document.createElement('div');
	canvas.classList.add('canvas');
	
	Array.from({ length: 1000 }).map(() => {
		let el = document.createElement('div');
		el.classList.add('pixel');
		canvas.appendChild(el);
	});
	
	content.appendChild(canvas);
}