var player;
var enemyList = {};
var healingPointsList = {};

/** 
 * @param {Number} x the x position
 * @param {Number} y the y position
 * @param {Number} width the width of the entity
 * @param {Number} height the height of the entity
 * @param {String} color the color of the entity
 * @param {Number} vx the x velocity of the entity
 * @param {Number} vy the y velocity of the entity
 */
function Entity(x, y, width, height, color, vx, vy) {
    var self = {
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        vx: vx,
        vy: vy
    }
    self.id = Math.random();
    
    self.goToCenter = function() {
        self.x = frame.getCanvas().width / 2 - self.width / 2;
        self.y = frame.getCanvas().height / 2 - self.height / 2;
    }

    self.draw = function() {
        rect(frame.getContext(), self.x, self.y, self.width, self.height, true, false, self.color);
    }

    self.updatePosition = function() {
        if(self.x < 0 || self.x + self.width > frame.getCanvas().width) {
            self.vx *= -1;
        }
        if(self.y < 0 || self.y + self.height > frame.getCanvas().height) {
            self.vy *= -1;
        }
        
        self.x += self.vx;
        self.y += self.vy;
    }
    self.update = function() {
        self.updatePosition();
        self.draw();
    }
    self.setSpeed = function(vx, vy) {
        self.vx - vx;
        self.vy = vy;
    }

    return self;
}

/** 
 * @param {Number} x the x position
 * @param {Number} y the y position
 * @param {Number} width the width of the entity
 * @param {Number} height the height of the entity
 * @param {String} color the color of the entity
 * @param {Number} vx the x velocity of the entity
 * @param {Number} vy the y velocity of the entity
 */
function Character(x, y, width, height, color, vx, vy) {
    var self = Entity(x, y, width, height, color, vx, vy);
    return self;
}

/** 
 * @param {Number} x the x position
 * @param {Number} y the y position
 * @param {Number} width the width of the enemy
 * @param {Number} height the height of the enemy
 * @param {String} color the color of the enemy
 * @param {Number} vx the x velocity of the enemy
 * @param {Number} vy the y velocity of the enemy
 * @param {Number} lifeTime the lifetime of the entity
 * @param {Boolean} isHarming can the enemy harm the player
 */
function generateEnemy(x, y, width, height, color, vx, vy, lifeTime, isHarming) {
    var x = x;
    var y = y;
    var lifeTime = lifeTime;
    var width = width;
    var height = height;
    var color = color || 'red';
    var vx = vx;
    var vy = vy;
    var enemyIsHarming = isHarming;
    if(isNull(enemyIsHarming)) {
        enemyIsHarming = true;
    }

    
    var enemyID = Enemy(x, y, width, height, color, vx, vy, lifeTime, enemyIsHarming);
    return enemyID;
}

/** 
 * @param {Number} x the x position
 * @param {Number} y the y position
 * @param {Number} width the width of the enemy
 * @param {Number} height the height of the enemy
 * @param {String} color the color of the enemy
 * @param {Number} vx the x velocity of the enemy
 * @param {Number} vy the y velocity of the enemy
 * @param {Number} lifeTime the lifetime of the enemy
 * @param {Boolean} isHarming can the enemy harm the player
 */
function Enemy(x, y, width, height, color, vx, vy, lifeTime, isHarming) {
    var self = Character(x, y, width, height, color, vx, vy)
    var lifeCounter = 0;
    self.isHarming = isHarming;
    var update = self.update;
    self.update = function() {
        lifeCounter++;
        if(lifeCounter > lifeTime) {
            delete enemyList[self.id]
        }
        self.updatePosition();
        self.draw();
        if(getCollisionTwoRects(self, player) && self.isHarming && !player.invincible) {
            if(HPSystem) {
                player.HP--
                if(player.canBeInvincible)
                    player.invincibilityTime = player.invincibilityAddingTime;
            }
            else {
                //console.log("GOTCHA!");
                Stop();
            }
        }
    }

    enemyList[self.id] = self;
    return self.id;
}

/** 
 * @param {Number} x the x position
 * @param {Number} y the y position
 * @param {Number} width the width of the healing point
 * @param {Number} height the height of the healing point
 * @param {String} color the color of the healing point
 * @param {Number} vx the x velocity of the healing point
 * @param {Number} vy the y velocity of the healing point
 * @param {Number} lifeTime the lifetime of the healing point
 */
function HealingPoint(x, y, width, height, color, vx, vy, lifeTime) {
    var self = Entity(x, y, width, height, color, vx, vy);
    var lifeCounter = 0;
    var lifeTime = lifeTime;
    self.update = function() {
        self.updateHealing();
        self.updatePosition();
        self.updateLifetime();
        self.draw();
    }
    self.updateHealing = function() {
        if(getCollisionTwoRects(self, player)) {
            player.HP++;
            delete healingPointsList[self.id]
        }
    }
    self.updateLifetime = function() {
        lifeCounter++;
        if(lifeCounter > lifeTime) {
            delete healingPointsList[self.id];
        }
    }
    healingPointsList[self.id] = self;
    return self;
}

/** 
 * @param {Number} x the x position
 * @param {Number} y the y position
 * @param {Number} width the width of the healing point
 * @param {Number} height the height of the healing point
 * @param {String} color the color of the healing point
 * @param {Number} vx the x velocity of the healing point
 * @param {Number} vy the y velocity of the healing point
 * @param {Number} lifeTime the lifetime of the healing point
 * @param {Boolean} isMoving is the healing point moving
 * @param {Number} maxSpeed what is the max speed of the healing point (if moving)
 */

function generateHealingPoint(x, y, width, height, color, isMoving, maxSpeed, lifeTime) {
    var width = width || 20;
    var height = height || 20;
    var x = x || generateLocation(width);
    var y = y || generateLocation(width);
    var color = color || 'green';
    var vx = 0;
    var vy = 0;
    var isMoving = isMoving;
    var maxSpeed = maxSpeed || 2;
    var lifeTime = lifeTime || 1500;
    if(isNull(isMoving)) {
        isMoving = true;
    }
    if(isMoving) {
        vx = Math.random() * maxSpeed * 2 - maxSpeed;
        vy = Math.random() * maxSpeed * 2 - maxSpeed;
    }
    HealingPoint(x, y, width, height, color, vx, vy, lifeTime);
}

/**
 * @param {Number} x the x position
 * @param {Number} y the y position
 * @param {Number} width the width of the player
 * @param {Number} height the height of the player
 * @param {String} color the color of the player
 * @param {Number} speed the speed of the player
 */
function Player(x, y, width, height, color, speed) {
    var self = Character(x, y, width, height, color, 5, 5);
    self.speed = speed;
    self.updatePosition = function() {
        if(self.keyDown && self.y + self.height <= frame.getCanvas().height) {
            self.y += self.speed;
            if(self.y + self.height > frame.getCanvas().height)
                self.y = frame.getCanvas().height - self.height;
        }
        if(self.keyUp && self.y >= 0) {
            self.y -= self.speed;   
            if(self.y < 0) 
                self.y = 0;
            }
        if(self.keyRight && self.x + self.width <= frame.getCanvas().width) {
            self.x += self.speed;
            if(self.x + self.width > frame.getCanvas().width) 
                self.x = frame.getCanvas().width - self.width;
        }
        if(self.keyLeft && self.x >= 0) {
            self.x -= self.speed
            if(self.x < 0) {
                self.x = 0;
            }
        }
    }

    self.HP = 10;

    self.heal = function(HP)  {
        self.HP += HP;
    }

    self.damage = function(HP) {
        self.HP -= HP;
    }

    self.invincible = false;

    self.canBeInvincible = true;
    
    self.invincibilityAddingTime = 50;

    self.invincibilityTime = 0;

    self.blinking = false;

    self.doBlinking = function() {
        if(self.opacity > 1 || self.opacity < 0.5) {
            self.opacityMove *= -1;
        }
        self.opacity += self.opacityMove;
        self.color = 'rgba(0, 255, 0,' + self.opacity + ')';
    }

    self.opacity = 1;
    self.opacityMove = -0.05;

    self.updateInvincibility = function() {
        if(self.invincibilityTime > 0) {
            self.invincible = true;
            self.invincibilityTime--
        } 
        else {
            self.invincible = false;
        }
        if(self.invincible) {
            self.doBlinking();
        }
        else {
            self.opacity = 1;
            self.color = 'rgba(0, 255, 0, 1)'
        }

    }

    self.reset = function() {
        self.goToCenter();
        self.speed = 1;
    }

    var oldUpdate = self.update;
    self.update = function() {
        oldUpdate();
        self.updateInvincibility();
        if(self.HP <= 0 && HPSystem) {
           Stop();
        }
    }
    self.keyDown = false;
    self.keyUp = false;
    self.keyLeft = false;
    self.keyRight = false;

    return self;
}