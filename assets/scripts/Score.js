const Globals = require("./Globals");

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scoreLabel.string = `Score : ${Globals.score.toString()}`;
        // canvas touch
        this.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            cc.director.loadScene('Game');
        })
    },

    // update (dt) {},
});
