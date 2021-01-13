const resizeCanvas = () => {
  const canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const init = () => {
  resizeCanvas();
}

export {
  init,
}
