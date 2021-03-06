const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let cw = window.innerWidth;
let ch = window.innerHeight;
const fireworks = [];
const particles = [];
let limiterTotal = 5;
let limiterTick = 0;
let timerTotal = 24;
let timerTick = 0;
let hue = 120;
let mx;
let my;
let isDown = false;
const isTouch = 'ontouchstart' in window;
const startEventName = isTouch ? 'touchstart' : 'mousedown';
const moveEventName = isTouch ? 'touchmove' : 'mousemove';
const endEventName = isTouch ? 'touchend' : 'mouseup';
const getPixelRatio = function() {
  const backingStore = ctx.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
};
const ratio = getPixelRatio();

canvas.style.width = cw + 'px';
canvas.style.height = ch + 'px';

canvas.width = cw * ratio;
canvas.height = ch * ratio;
ctx.scale(ratio, ratio);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateDistance(p1x, p1y, p2x, p2y) {
  var xDistance = p1x - p2x,
    yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Firework(sx, sy, tx, ty) {
  this.x = sx;
  this.y = sy;
  this.sx = sx;
  this.sy = sy;
  this.tx = tx;
  this.ty = ty;
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;
  this.coordinates = [];
  this.coordinateCount = 3;

  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = 2;
  this.acceleration = 1.05;
  this.brightness = random(50, 70);
  this.targetRadius = 1;
}

Firework.prototype.update = function(index) {
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);

  if (this.targetRadius < 8) {
    this.targetRadius += 0.3;
  } else {
    this.targetRadius = 1;
  }

  this.speed *= this.acceleration;

  const vx = Math.cos(this.angle) * this.speed;
  const vy = Math.sin(this.angle) * this.speed;
  this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty);
    fireworks.splice(index, 1);
  } else {
    this.x += vx;
    this.y += vy;
  }
};

Firework.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1],
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
  ctx.stroke();
};

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.coordinates = [];
  this.coordinateCount = 5;
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);
  this.friction = 0.95;
  this.gravity = 1;
  this.hue = random(hue - 50, hue + 50);
  this.brightness = random(50, 80);
  this.alpha = 1;
  this.decay = random(0.015, 0.03);
}

Particle.prototype.update = function(index) {
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);
  this.speed *= this.friction;
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  this.alpha -= this.decay;

  if (this.alpha <= this.decay) {
    particles.splice(index, 1);
  }
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1],
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
  ctx.stroke();
};

function createParticles(x, y) {
  var particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y));
  }
}

function loop() {
  requestAnimFrame(loop);
  hue = random(0, 360);

  ctx.globalCompositeOperation = 'destination-out';
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';

  ctx.fillStyle = 'pink';
  ctx.font = `bold ${12 * ratio}px arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Miss Pan', cw / 2, ch / 2 - 20 - 12 * ratio);
  ctx.fillText('Love You Forever', cw / 2, ch / 2 - 10);

  let i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  i = particles.length;
  while (i--) {
    particles[i].draw();
    particles[i].update(i);
  }

  if (timerTick >= timerTotal) {
    if (!isDown) {
      fireworks.push(new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  if (limiterTick >= limiterTotal) {
    if (isDown) {
      fireworks.push(new Firework(cw / 2, ch, mx, my));
      limiterTick = 0;
    }
  } else {
    limiterTick++;
  }
}

var Box = function(x, y, w, h, s) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.s = s;
  this.a = Math.random() * Math.PI * 2;
  this.hue = Math.random() * 360;
};

Box.prototype = {
  constructor: Box,
  update: function() {
    this.a += Math.random() * 0.5 - 0.25;
    this.x += Math.cos(this.a) * this.s;
    this.y += Math.sin(this.a) * this.s;
    this.hue += 5;
    if (this.x > WIDTH) this.x = 0;
    else if (this.x < 0) this.x = WIDTH;
    if (this.y > HEIGHT) this.y = 0;
    else if (this.y < 0) this.y = HEIGHT;
  },
  render: function(ctx) {
    ctx.save();
    ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 50%, 1)';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.fillRect(-this.w, -this.h / 2, this.w, this.h);
    ctx.restore();
  },
};

const Circle = function(x, y, tx, ty, r) {
  this.x = x;
  this.y = y;
  this.ox = x;
  this.oy = y;
  this.tx = tx;
  this.ty = ty;
  this.lx = x;
  this.ly = y;
  this.r = r;
  this.br = r;
  this.a = Math.random() * Math.PI * 2;
  this.sx = Math.random() * 0.5;
  this.sy = Math.random() * 0.5;
  this.o = Math.random() * 1;
  this.delay = Math.random() * 200;
  this.delayCtr = 0;
  this.hue = Math.random() * 360;
};

Circle.prototype = {
  constructor: Circle,
  update: function() {
    if (this.delayCtr < this.delay) {
      this.delayCtr++;
      return;
    }

    this.hue += 1;
    this.a += 0.1;

    this.lx = this.x;
    this.ly = this.y;

    if (!clickToggle) {
      this.x += (this.tx - this.x) * this.sx;
      this.y += (this.ty - this.y) * this.sy;
    } else {
      this.x += (this.ox - this.x) * this.sx;
      this.y += (this.oy - this.y) * this.sy;
    }

    this.r = this.br + Math.cos(this.a) * (this.br * 0.5);
  },
  render: function(ctx) {
    ctx.save();
    ctx.globalAlpha = this.o;
    ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 50%, 1)';
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (clickToggle) {
      ctx.save();
      ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, 50%, 1)';
      ctx.beginPath();
      ctx.moveTo(this.lx, this.ly);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.restore();
    }
  },
};

canvas.addEventListener(startEventName, function(e) {
  e.preventDefault();
  isDown = true;
});

canvas.addEventListener(moveEventName, function(e) {
  const p = isTouch ? e.touches[0] : e;
  mx = p.pageX - canvas.offsetLeft;
  my = p.pageY - canvas.offsetTop;
});

canvas.addEventListener(endEventName, function(e) {
  e.preventDefault();
  isDown = false;
});

window.onload = loop;
