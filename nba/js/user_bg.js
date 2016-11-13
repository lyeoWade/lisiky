var canvas = $('canvas')[0];
var context = canvas.getContext('2d');

function Dot() {
  this.alive = true;
  this.x = Math.round(Math.random() * canvas.width);
  this.y = Math.round(Math.random() * canvas.height);
  this.diameter = Math.random() * 7;
  this.colorIndex = Math.round(Math.random() * 3);
  this.colorArray = ['rgba(240,131,0,', 'rgba(134,247,192,', 'rgba(250,159,238,', 'rgba(50,153,187,'];
  this.alpha = 0.1;
  this.color = this.colorArray[this.colorIndex] + this.alpha + ')';

  this.velocity = {x: Math.round(Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7, y: Math.round(Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7};
}

Dot.prototype = {
  Draw: function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
    context.fill();
  },

  Update: function() {
    if(this.alpha < 0.8) {
     // console.log(this.color);
      this.alpha += 0.01;
      this.color = this.colorArray[this.colorIndex] + this.alpha + ')';
     // console.log('===' + this.color);
    }
    
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
      this.alive = false;
    }
  }
};

var EntityArray = [];

function Initialize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for(var x = 0; x < 100; x++) {
    EntityArray.push(new Dot());
  }

  Update();
}

function Update() {
  if(EntityArray.length < 100) {
    for(var x = EntityArray.length; x < 100; x++) {
      EntityArray.push(new Dot());
    }
  }

  EntityArray.forEach(function(dot) {
    dot.Update();
  });

  EntityArray = EntityArray.filter(function(dot) {
    return dot.alive;
  });

  Draw();

  requestAnimationFrame(Update);
}

function Draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  EntityArray.forEach(function(dot) {
    dot.Draw();
  });
}

$(window).resize(function() {
  EntityArray = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 调用这个函数
if(document.getElementsByClassName){
	Initialize();
};
