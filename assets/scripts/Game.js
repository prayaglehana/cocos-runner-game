let Globals = require("Globals");

cc.Class({
  extends: cc.Component,

  properties: {
    hero: {
      default: null,
      type: cc.Node,
    },
    score: {
      default: null,
      type: cc.Label,
    },
    bgMusic: {
      default: null,
      type: cc.AudioClip,
    },
    dimaondSound: {
      default: null,
      type: cc.AudioClip,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    if (!cc.audioEngine.isMusicPlaying()) {
      cc.audioEngine.playMusic(this.bgMusic, true);
    }

    Globals.score = 0;
    this.enablePhysics();
    this.hero.on("score", () => {
      cc.audioEngine.play(this.dimaondSound);
      ++Globals.score;
      this.score.string = Globals.score.toString();
    });

    this.hero.once("die", () => {
      cc.director.loadScene("Score");
    });
  },

  enablePhysics() {
    let physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;

    let collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;

    // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
    // cc.PhysicsManager.DrawBits.e_pairBit |
    // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    // cc.PhysicsManager.DrawBits.e_jointBit |
    // cc.PhysicsManager.DrawBits.e_shapeBit;
  },

  start() {},

  // update (dt) {},
});
