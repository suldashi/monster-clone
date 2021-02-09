const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");

class PlayerRenderComponent extends RenderComponent {
    constructor(bodyComponent,playerComponent,resources,scene) {
        super();
        this.bodyComponent = bodyComponent;
        this.playerComponent = playerComponent;

        this.resources = resources;
        this.scene = scene;
        this.scale = 3;
        this.reflectedX = this.playerComponent.isFacingLeft;
        this.spriteName = this.getSpriteName();
        this.displaySprite(this.spriteMap(this.spriteName));
    }

    getSpriteName() {
        return this.playerComponent.state.stateName+"-"+this.playerComponent.direction;
    }

    update() {
        if(this.reflectedX !== this.playerComponent.isFacingLeft) {
            this.reflectedX = this.playerComponent.isFacingLeft;
            this.sprite.scale.x*=-1;
        }
        if(this.spriteName !== this.getSpriteName()) {
            this.spriteName = this.getSpriteName();
            this.destroy();
            this.displaySprite(this.spriteMap(this.spriteName));
        }
        const activeCamera = this.scene.activeCamera.cameraPosition;
        this.sprite.x = this.bodyComponent.position.x + activeCamera.x;
        this.sprite.y = this.bodyComponent.position.y + activeCamera.y;
    }

    playAnimation(animationTextures, animationSpeed) {
        this.animation = animationTextures;
        this.sprite = new PIXI.AnimatedSprite(this.animation);
        this.sprite.updateAnchor = true;
        this.sprite.scale.x = this.sprite.scale.y = this.scale;
        if(this.reflectedX) {
            this.sprite.scale.x*=-1;
        }
        this.sprite.animationSpeed = animationSpeed;
        this.sprite.play();
        this.scene.pixiStage.addChild(this.sprite);
    }

    displaySprite(spriteName) {
        if(typeof spriteName === "string") {
            this.playAnimation(this.resources.animations[spriteName],1/6);
        }
        else {
            this.playAnimation(spriteName.flatMap(x => this.resources.animations[x]),1/6);
        }
        this.update();
    }

    spriteMap(playerState) {
        let sprites = {
            "idle-n":"idle-n",
            "idle-w":"idle-e",
            "idle-e":"idle-e",
            "idle-s":"idle-s",
            "running-n":["idle-n", "running-n", "idle-n", "running-n2"],
            "running-w":["idle-e", "running-e"],
            "running-e":["idle-e", "running-e"],
            "running-s":["idle-s", "running-s", "idle-s", "running-s2"],
        }
        return sprites[playerState];
    }

    destroy() {
        this.sprite.destroy();
    }
}

module.exports = PlayerRenderComponent;