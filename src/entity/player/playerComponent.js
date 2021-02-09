const BaseComponent = require("../../baseComponent");
const PlayerState = require("./playerState");
const EventSystem = require("../../event");

class PlayerComponent extends BaseComponent {

    constructor(playerBodyComponent) {
        super();
        this.playerBodyComponent = playerBodyComponent;
        this.direction = "e";
        this.isFacingLeft = false;
        this.state = new PlayerState(this);
        this.on("newPlayerControlsMove",(inputs) => {
            this.handleMoveInputs(inputs);
        });
    }

    handleMoveInputs(inputs) {
        let direction = this.getDirection(inputs);
        if(direction !== "0") {
            this.direction = direction;
            this.playerBodyComponent.move(this.direction);
            this.state.doAction("move");
        }
        else {
            this.playerBodyComponent.stopMoving();
            this.state.doAction("stopMoving");
        }
        if(inputs.left && !inputs.right) {
            this.isFacingLeft = true;
        }
        else if(!inputs.left && (inputs.right || inputs.up || inputs.down)) {
            this.isFacingLeft = false;
        }
    }

    getDirection(inputs) {
        if(inputs.up && !inputs.down) {
            return "n";
        }
        else if(inputs.down && !inputs.up) {
            return "s";
        }
        else if(inputs.left && !inputs.right) {
            return "w";
        }
        else if(inputs.right && !inputs.left) {
            return "e";
        }
        else {
            return "0";
        }
    }

    stateChanged(newState, prevState) {
        
    }

    update() {
        
    }

    
}

module.exports = PlayerComponent;