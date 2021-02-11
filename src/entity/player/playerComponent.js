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
        this.isMoving = false;
        this.latestInput = null;
        this.on("newPlayerControlsMove",(inputs) => {
            this.isMoving = inputs.up || inputs.down || inputs.left || inputs.right;
            this.latestInput = inputs;
            this.handleMoveInputs();
        });
        this.onStartedMoving = () => {}
    }

    handleMoveInputs() {
        this.state.doAction("move");
    }

    stopMoving() {
        this.playerBodyComponent.stopMoving();
        this.state.doAction("stopMoving");
    }

    finishedMovingTile() {
        if(this.isMoving) {
            let direction = this.getDirection(this.latestInput);
            this.direction = direction;
            this.playerBodyComponent.move(this.direction);
            this.setIsFacingLeft();
            this.onStartedMoving();
        }
        else {
            this.playerBodyComponent.stopMoving();
            this.state.doAction("stopMoving");
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

    setIsFacingLeft(inputs = this.latestInput) {
        if(inputs.left && !inputs.right) {
            this.isFacingLeft = true;
        }
        else if(!inputs.left && (inputs.right || inputs.up || inputs.down)) {
            this.isFacingLeft = false;
        } 
    }

    stateChanged(newState, prevState) {
        if(newState==="running") {
            let direction = this.getDirection(this.latestInput);
            if(direction !== "0") {
                this.direction = direction;
                this.playerBodyComponent.move(this.direction);
                this.setIsFacingLeft();
                this.onStartedMoving();
            }
        }
    }

    update() {
        
    }

    
}

module.exports = PlayerComponent;