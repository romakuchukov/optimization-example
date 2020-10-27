import {
  app,
  add,
  proto,
  distance,
  maxWidth
} from './appVars';


app.init = function () {
  if (app.movers) {
    app.bodySize = document.body.getBoundingClientRect();
    for (var i = 0; i < app.movers.length; i++) {
      document.body.removeChild(app.movers[i]);
    }
    document.body.appendChild(proto);
    app.ballSize = proto.getBoundingClientRect();
    document.body.removeChild(proto);
    app.maxHeight = Math.floor(app.bodySize.height - app.ballSize.height);
  }
  for (var i = 0; i < app.count; i++) {
    var mover = proto.cloneNode();
    var top = Math.floor(Math.random() * (app.maxHeight));
    if (top === app.maxHeight) {
      mover.classList.add('up');
    } else {
      mover.classList.add('down');
    }
    mover.style.left = (i / (app.count / maxWidth)) + 'vw';
    mover.style.top = top + 'px';
    document.body.appendChild(mover);
  }
  app.movers = document.querySelectorAll('.mover');
};

app.update = function (timestamp) {
  for (var i = 0; i < app.count; i++) {
    var mover = app.movers[i];
    var pos = mover.classList.contains('down') ? mover.offsetTop + distance : mover.offsetTop - distance;

    if (pos < 0) pos = 0;
    if (pos > app.maxHeight) pos = app.maxHeight;
    mover.style.top = pos + 'px';
    if (mover.offsetTop === 0) {
      mover.classList.remove('up');
      mover.classList.add('down');
    }
    if (mover.offsetTop === app.maxHeight) {
      mover.classList.remove('down');
      mover.classList.add('up');
    }
  }
  app.frame = window.requestAnimationFrame(app.update);
}

document.querySelector('.stop').addEventListener('click', function (e) {
  if (app.enableApp) {
    cancelAnimationFrame(app.frame);
    e.target.textContent = 'Start';
    app.enableApp = false;
  } else {
    app.frame = window.requestAnimationFrame(app.update);
    e.target.textContent = 'Stop';
    app.enableApp = true;
  }
});

add.addEventListener('click', function (e) {
  cancelAnimationFrame(app.frame);
  app.count += app.incrementor;
  app.init();
  app.frame = requestAnimationFrame(app.update);
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
      cancelAnimationFrame(app.frame);
      app.init();
      app.frame = requestAnimationFrame(app.update);
  }
}, 500);

window.addEventListener('resize', onResize);

add.textContent = 'Add ' + app.incrementor;
document.body.removeChild(proto);
proto.classList.remove('.proto');
app.init();
window.app = app;
app.frame = window.requestAnimationFrame(app.update);
