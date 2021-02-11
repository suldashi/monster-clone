function attachSchedulersToPlayer(playerEntity, playerComponent, schedulingSystem) {
    let stepMover = schedulingSystem.createScheduler();
    stepMover.addTask(333.33, () => {
        stepMover.reset();
        playerComponent.finishedMovingTile();
    });
    playerComponent.onStartedMoving = () => {
        stepMover.start();
    }
    playerEntity.attachComponents(stepMover);
}

module.exports = {
    attachSchedulersToPlayer
}