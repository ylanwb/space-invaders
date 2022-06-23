function PlayState(config, level) {
    this.config = config;
 
    //  Game state.
    this.invaderCurrentVelocity =  10;
    this.invaderCurrentDropDistance =  0;
    this.invadersAreDropping =  false;
    this.lastRocketTime = null;
 
    //  Game entities.
    this.ship = null;
    this.invaders = [];
    this.rockets = [];
    this.bombs = [];
}