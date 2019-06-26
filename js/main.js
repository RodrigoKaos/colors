const content = document.querySelector('.content');
const colors = ['black', 'yellow', 'red', 'green', 'blue', 'gray', 'white'];
let activeColor = colors[0];
let isPressed = false;

const canvasDiv = createCanvasDiv();
createColorPanel();
setListeners();

function createCanvasDiv(){
	const canvas = document.createElement('div');
	canvas.classList.add('canvas');
	
	const length = 8 * 8;
	Array.from({ length: length }).map(() => {
		let el = document.createElement('div');
		el.classList.add('pixel');
		canvas.appendChild(el);
	});
	
	content.appendChild(canvas);
	return canvas;
}

function createColorPanel(){
	const colorPanel = document.createElement('div');
	colorPanel.classList.add('color-panel');

	colors.map( color => {
		let el = document.createElement('div');
		el.classList.add(color);
		colorPanel.appendChild(el);
	});
	document.querySelector('.control').appendChild(colorPanel);	
}

function selectColor(){
	const event = window.event;
	const el = event.target;
	const isButton = colors.includes(el.classList.value);
	if( isButton ){
		activeColor = el.className
		//TODO: add active state to color button...
	}
}

function changeColor(){
	
	if(!isPressed){
		return;
	}

	const event = window.event;
	const element = event.target;
	const aux = element.classList.value.split(" ");

	if( aux.length > 1 && [aux].pop() != activeColor ){
		aux.pop();
		element.classList.value = aux.join(" ");
	}
	element.classList.add(activeColor);
}

function handleSave(){
	const canvas = document.createElement('canvas');	
	canvas.width = content.width;
	canvas.height = content.height;
	saveImage(content, canvas);	
}

function saveImage(content, canvas){
	html2canvas(content).then( canvas => {		
		fetch(canvas.toDataURL("image/png"))
		.then(res => res.blob())
		.then(blob => saveAs(blob, 'img.png'));
	});
}

function setListeners(){
	document.querySelector('.color-panel').addEventListener('mousedown', selectColor);
	document.querySelector('.save').addEventListener('click', handleSave);

	canvasDiv.addEventListener('mousedown', () => {
		isPressed = true;
		canvasDiv.addEventListener('mousemove',changeColor);
	});
	
	document.addEventListener('mouseup', () => {
		isPressed = false;
		canvasDiv.removeEventListener('mousemove', changeColor);
	});
	
	canvasDiv.addEventListener('mouseleave', () => isPressed = false);
	canvasDiv.addEventListener('dragend', () => isPressed = false);
}