// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const tileSize = 64;

cc.Class({
    extends: cc.Component,

    properties: {
        coinsOffsetMin: 100,
        coinsOffsetMax: 200,
        tile: {
            default: null,
            type: cc.Prefab 
        },
        diamond: {
            default: null,
            type: cc.Prefab 
        }
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        // this.init(5,200,0);
    },

    init(tilesCount, x, y){
        
        this.active = true;
        this.node.removeAllChildren();

        this.node.setPosition(cc.v2(x,y));
        
        for(let i=0; i< tilesCount; ++i){
            // intialze the node form prefab;
            const tile = cc.instantiate(this.tile);
            // make the created node a child of platform node
            this.node.addChild(tile);
            // set it to the correct posuition
            tile.setPosition(i*tile.width, 0);
        }

        this.node.width = tileSize * tilesCount ;
        this.node.height = tileSize;

        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;

        collider.offset.x = this.node.width/2 - tileSize/2;
        collider.apply();

        this.createDiamands();
    },

    createDiamands(){
        this.node.children.forEach( tile => {
            if(Math.random() <=0.4){
                const y = this.coinsOffsetMin + Math.random() * (this.coinsOffsetMax - this.coinsOffsetMin);
                const diamond = cc.instantiate(this.diamond);
                tile.addChild(diamond);
                diamond.setPosition(0, y);
            }

        })
    },
    // onLoad () {},



    update (dt) {
        if(this.active){
            this.node.x -= 150*dt;
            const platformRight = this.node.x + this.node.width;

            if(platformRight < -cc.winSize.width/2){
                this.active = false;
            }
        }
    },
});
