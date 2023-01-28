// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    jumpSpeed: cc.v2({ x: 0, y: 300 }),
    maxJumpDistance: 300,
    jumpSprite: {
      default: null,
      type: cc.SpriteFrame,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  onLoad() {
    this.animation = this.node.getComponent(cc.Animation);
    this.sprite = this.node.getComponent(cc.Sprite);
    // keyboard press
    // any key is down
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
      switch (event.keyCode) {
        case cc.macro.KEY.space:
          this.jumpKeyPressed = true;
          break;
      }
    });

    // any key switch froim down -> up ( key hold released)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
      switch (event.keyCode) {
        case cc.macro.KEY.space:
          this.jumpKeyPressed = false;
          this.isJumping = false;
          break;
      }
    });

    // touch screen
    this.node.parent.ont(cc.Node.EventType.TOUCH_START, () => {
      this.jumpKeyPressed = true;
    });

    this.node.parent.ont(cc.Node.EventType.TOUCH_END, () => {
      this.jumpKeyPressed = false;
      this.isJumping = false;
    });
  },

  start() {
    this.body = this.getComponent(cc.RigidBody);
    this.isJumping = false;
    this.jumpKeyPressed = false;
    this.touching = false; // if hero is touching platform surface
    this.startJumpY = 0;
  },

  onBeginContact() {
    this.touching = true;
  },

  onEndContact() {
    this.touching = false;
  },

  onCollisionEnter(other, self) {
    if (other.node.name === "diamond") {
      other.node.destroy();
      this.node.emit("score");
    }
  },

  // onCollisionStay(){

  // },

  // onCollisionExit(){

  // }

  animate() {
    if (this.touching) {
      // hero is on the platform
      if (!this.animation.getAnimationState("running").isPlaying) {
        this.animation.start("running");
      }
    } else {
      // hero is in the air
      if (this.animation.getAnimationState("running").isPlaying) {
        this.animation.stop();
        this.sprite.spriteFrame = this.jumpSprite;
      }
    }
  },

  update(dt) {
    if (this.jumpKeyPressed) {
      this.jump();
    }
    this.animate();

    if (this.node.y < -cc.winSize.height / 2) {
      this.node.emit("die");
    }
  },

  jump() {
    if (this.touching) {
      this.startJumpY = this.node.y;
      this.jumpFinished = false;
      this.isJumping = true;
      this.body.linearVelocity = this.jumpSpeed;
    } else if (this.isJumping && !this.jumpFinished) {
      const jumpDistance = this.node.y - this.startJumpY;
      if (jumpDistance < this.maxJumpDistance) {
        this.body.linearVelocity = this.jumpSpeed;
      } else {
        this.jumpFinished = true;
      }
    }
  },
});
