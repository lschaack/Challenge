// Lucas Schaack
// Clover Web Dev Internship Challenge

(function() {
	"use strict";
	// quickly avoiding null error, would fix better w/more time
	var area;
	// const shapes[];

	window.onload = function() {
		document.getElementById('shape-button').onclick = createShape;
		document.getElementById('clear-button').onclick = clearAll;
		area = document.getElementById('shape-area');
	};

	/*
	 * Attempted large shift to class-based shapes to make velocity updating (and everything really)
	 * much easier, but couldn't get it done in the time allotted. Hopefully it's apparent where I
	 * was going with this. 
	*/
	class shape {
		constructor(sideLength, radius, top, left, color, vX, vY) {
			this.sideLength = sideLength;
			this.radius = radius;
			this.top = top;
			this.left = left;
			this.color = color;
			this.vX = vX;
			this.vY = vY;
			this.updateLocation();
		}

		updateLocation() {
			newHorizPos = this.left + vX;
			newVertiPos = this.top - vY;
			vertiCollision = (newHorizPos > 0 &&
								 newHorizPos + this.sideLength < window.innerWidth);
			horizCollision = (newVertiPos > 0 &&
								   newVertiPos + this.sideLength < window.innerHeight);
			if (!vertiCollision && !horizCollision) {
				this.top -= vY;
				this.left += vX;
			} else {
				collide(vertiCollision, horizCollision);
			}
		}

		collide(vertiCollision, horizCollision) {
			if (vertiCollision) {
				this.vY = -this.vY;
			}
			if (horizCollision) {
				this.vX = -this.vX;
			}
		}
	}

	// with shape class, would push new shape onto the global shapes array once properties were set.
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
		alert('Color: ' + color + ', text: ' + text);
	}
})();