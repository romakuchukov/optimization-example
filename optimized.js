import {
  app,
  add,
  proto,
  distance,
  maxWidth
} from './appVars';


app.init = () => {
  if (app.movers) {
    app.bodySize = document.body.getBoundingClientRect();
    for (let i = 0; i < app.movers.length; i++) {
      document.body.removeChild(app.movers[i]);
    }
    document.body.appendChild(proto);
    app.ballSize = proto.getBoundingClientRect();
    document.body.removeChild(proto);
    app.maxHeight = Math.floor(app.bodySize.height - app.ballSize.height);
  }
  for (let i = 0; i < app.count; i++) {
    const mover = proto.cloneNode();
    const top = Math.floor(Math.random() * (app.maxHeight));
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

app.update = (timestamp) => {
  for (let i = 0; i < app.count; i++) {
    const mover = app.movers[i];
    let pos = parseInt(mover.style.top, 10);
    mover.classList.contains('down') ? pos += distance : pos -= distance;
    if (pos < 0) pos = 0;
    if (pos > app.maxHeight) pos = app.maxHeight;
    mover.style.top = pos + 'px';
    if (pos === 0) {
      mover.classList.remove('up');
      mover.classList.add('down');
    }
    if (pos === app.maxHeight) {
      mover.classList.remove('down');
      mover.classList.add('up');
    }
  }
  app.frame = window.requestAnimationFrame(app.update);
}

document.querySelector('.stop').addEventListener('click', (e) => {
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

add.addEventListener('click', (e) => {
  cancelAnimationFrame(app.frame);
  app.count += app.incrementor;
  app.init();
  app.frame = requestAnimationFrame(app.update);
});

const debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(null, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(null, args);
  };
};

const onResize = debounce(() => {
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
