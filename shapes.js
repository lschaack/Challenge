(function() {
	"use strict";
	// quickly avoiding null error, would fix better w/more time
	var area;

	window.onload = function() {
		document.getElementById('shape-button').onclick = createShape;
		document.getElementById('clear-button').onclick = clearAll;
		area = document.getElementById('shape-area');
	};

	function createShape() {
		// var area = document.getElementById('shape-area');
		var newShape = document.createElement('div');
		newShape.onclick = reportInfo;
		newShape.className = 'shape'; // make sure this line is actually necessary
		setRandomProperties(newShape);
		addText(newShape);
		area.appendChild(newShape); // area.appendChild(newShape); // WATCH OUT FOR THIS
		return newShape;
	}

	function setRandomProperties(shape) {
		var minAvailableSpace = Math.min(window.innerHeight, window.innerWidth);
		// Maximum side length should be the shortest of width/height of available screen space
		var sideLength = Math.random() * minAvailableSpace;
		// exclusive range, so shape will never be exactly square or circular
		var radius = Math.random() * (sideLength - 1) + 1;
		var top = Math.random() * (window.innerHeight - sideLength);
		var left = Math.random() * (window.innerWidth - sideLength);
		// really elegant solution to hex color generation found online 
		var color = Math.floor(Math.random() * 16777215).toString(16);
		shape.style.height = sideLength + 'px';
		shape.style.width = sideLength + 'px';
		shape.style.top = top + 'px';
		shape.style.left = left + 'px';
		shape.style.borderRadius = radius + 'px';
		shape.style.backgroundColor = '#' + color;
	}

	function addText(shape) {
		var text = document.getElementById('text-field').value;
		var field = document.createElement('p');
		field.innerHTML = text; // maybe just .innerHTML
		shape.appendChild(field)
	}

	function clearAll() {
		while (area.firstChild) {
		    area.removeChild(area.firstChild);
		}
	}

	function reportInfo() {
		var style = window.getComputedStyle(this, null);
		var color = style.getPropertyValue('background-color')
		var text = this.firstChild.innerHTML;
		alert('Color: ' + color + ', text: ' + text); // add text also
	}
})();