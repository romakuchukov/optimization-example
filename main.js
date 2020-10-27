let frame;
let movers;
let incrementor = 10;

const app = {};
const proto = document.querySelector('.proto');

const bodySize = document.body.getBoundingClientRect();
const ballSize = proto.getBoundingClientRect();

const maxHeight = Math.floor(bodySize.height - ballSize.height);
const maxWidth = 97; // 100vw - width of square (3vw)

const distance = 3;
const add = document.querySelector('.add');


app.count = 100;
app.enableApp = true;



app.init = function () {
  if (movers) {
    bodySize = document.body.getBoundingClientRect();
    for (var i = 0; i < movers.length; i++) {
      document.body.removeChild(movers[i]);
    }
    document.body.appendChild(proto);
    ballSize = proto.getBoundingClientRect();
    document.body.removeChild(proto);
    maxHeight = Math.floor(bodySize.height - ballSize.height);
  }
  for (var i = 0; i < app.count; i++) {
    var mover = proto.cloneNode();
    var top = Math.floor(Math.random() * (maxHeight));
    if (top === maxHeight) {
      mover.classList.add('up');
    } else {
      mover.classList.add('down');
    }
    mover.style.left = (i / (app.count / maxWidth)) + 'vw';
    mover.style.top = top + 'px';
    document.body.appendChild(mover);
  }
  movers = document.querySelectorAll('.mover');
};

app.update = function (timestamp) {
  for (var i = 0; i < app.count; i++) {
    var mover = movers[i];
    var pos = mover.classList.contains('down') ? mover.offsetTop + distance : mover.offsetTop - distance;
    if (pos < 0) pos = 0;
    if (pos > maxHeight) pos = maxHeight;
    mover.style.top = pos + 'px';
    if (mover.offsetTop === 0) {
      mover.classList.remove('up');
      mover.classList.add('down');
    }
    if (mover.offsetTop === maxHeight) {
      mover.classList.remove('down');
      mover.classList.add('up');
    }
  }
  frame = window.requestAnimationFrame(app.update);
}

document.querySelector('.stop').addEventListener('click', function (e) {
  if (app.enableApp) {
    cancelAnimationFrame(frame);
    e.target.textContent = 'Start';
    app.enableApp = false;
  } else {
    frame = window.requestAnimationFrame(app.update);
    e.target.textContent = 'Stop';
    app.enableApp = true;
  }
});

add.addEventListener('click', function (e) {
  cancelAnimationFrame(frame);
  app.count += incrementor;
  app.init();
  frame = requestAnimationFrame(app.update);
});

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var onResize = debounce(function () {
  if (app.enableApp) {
      cancelAnimationFrame(frame);
      app.init();
      frame = requestAnimationFrame(app.update);
  }
}, 500);

window.addEventListener('resize', onResize);

add.textContent = 'Add ' + incrementor;
document.body.removeChild(proto);
proto.classList.remove('.proto');
app.init();
window.app = app;
frame = window.requestAnimationFrame(app.update);
