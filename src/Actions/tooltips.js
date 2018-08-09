export const mouseIn = (e, crypto) => ({
    type: 'MOUSE_IN',
    name: crypto,
    mouseX: e.pageX,
    mouseY: e.pageY
  });

  export const mouseMove = (e) => ({
    type: 'MOUSE_MOVE',
    mouseX: e.pageX,
    mouseY: e.pageY
  });

  export const mouseOut = () => ({
    type: 'MOUSE_OUT',
  });