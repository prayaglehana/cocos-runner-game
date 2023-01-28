cc.Class({
  extends: cc.Component,

  properties: {
    speed: 150,
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  move(node, offset) {
    // find x cord of right edge of current sprite
    const spriteRightX = node.x + node.width / 2;
    const screenLeftX = -cc.winSize.width / 2;

    if (spriteRightX <= screenLeftX) {
      //swap images
      node.x += node.width * 2 - offset;
    } else {
      node.x -= offset;
    }
  },

  update(dt) {
    this.node.children.forEach((node) => {
      this.move(node, dt * this.speed);
    });
  },
});
