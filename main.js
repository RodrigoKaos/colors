var d = document,
content = d.querySelector('.content');

Array.from({ length: 1000 }).map(() => {
	var el = d.createElement('div');
	el.classList.add('pixel');
	content.appendChild(el);
});

var pixels = Array.from(d.querySelectorAll('.pixel'));

var colorClass = 'black';

pixels.map( el => {

	let pressed = false;
	
	var changeColor = () => {
		if( pressed ){
			el.classList.add(colorClass);
		}
	};	

	content.addEventListener('mousedown', e => {
		pressed = true;
		el.addEventListener('mouseover', changeColor );
	});
	
	content.addEventListener('mouseup', e => {
		pressed = false;
		el.removeEventListener('mouseover', changeColor );		
	});

});

// pixels.map( el => 
// 	el.addEventListener('mouseover', e => el.classList.add('black') ) 
// );

/*

for (var i = 0; i < 1000; i++) {
	var el = d.createElement('div');
	el.classList.add('pixel');
	content.appendChild(el);
}

var pixels = d.querySelectorAll('.pixel');
pixels = Array.from(pixels);
console.log(pixels);

for (var i = pixels.length - 1; i >= 0; i--) {
	pixels[i].addEventListener('mouseover', function(e){
		this.classList.add('active');
		console.log('over');
	});
}

*/