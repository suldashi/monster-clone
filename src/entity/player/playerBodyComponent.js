const Vec2 = require("../../physics/vec2");

class PlayerBodyComponent {
    constructor(bodyComponent) {
        this.bodyComponent = bodyComponent;
        this.speed = 300;
    }

    getDirectionVector(direction) {
        switch(direction) {
            case "n":
                return new Vec2(0, -this.speed);
            case "s":
                return new Vec2(0, this.speed,);
            case "e":
                return new Vec2(this.speed,0);
            case "w":
                return new Vec2(-this.speed,0);
            case "0":
                return new Vec2(0,0);
        }
    }

    stopMoving() {
        this.bodyComponent.setVelocity(new Vec2(0,0));
    }

    move(playerDirection) {
        this.bodyComponent.setVelocity(this.getDirectionVector(playerDirection));
    }

    update(delta) {

    }
}

module.exports = PlayerBodyComponent;