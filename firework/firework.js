const requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout( callback, 1000 / 60 );
		};
})();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cw = window.innerWidth;
const ch = window.innerHeight;
const fireworks = [];
const particles = [];
const hue = 120;
const limiterTotal = 5;
const limiterTick = 0;
const timerTotal = 80;
const timerTick = 0;

let mousedown = false;
let mx;
let my;

canvas.width = cw;
canvas.height = ch;