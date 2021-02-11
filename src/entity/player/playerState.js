class PlayerState {
	constructor(playerComponent) {
        this.playerComponent = playerComponent;
		this._stateName = 'idle';
		this.stateTransitions = [];
		this.separator = "@";
		this.defineStateTransition('idle', 'move', "running");
		this.defineStateTransition('running', 'stopMoving', 'idle');
	}

	defineStateTransition(currentState, action, nextState) {
		this.stateTransitions[currentState+this.separator+action] = nextState;
	}

	doAction(action, data) {
		const prevState = this._stateName;
		if(this.stateTransitions[prevState+this.separator+action] || this.stateTransitions["*"+this.separator+action]) {
			this._stateName = this.stateTransitions[prevState+this.separator+action]
				?this.stateTransitions[prevState+this.separator+action]
				:this.stateTransitions["*"+this.separator+action]
			if (prevState !== this._stateName) {
				this.playerComponent.stateChanged(this.stateName, prevState, data);
			}
		}
	}

	get stateName() {
		return this._stateName;
	}
}

module.exports = PlayerState;
