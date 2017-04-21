var Game = (function (game) {
    var FIRE_RATE = 500;
    var NUM_BULLET = 3;
    var bulletGroup;
    var currentBullet;
    var bow;
    var cursors;
    var nextFire = 0;
    var enemies;
    var enemiesTotal = 10;
    var enemiesAlive = 10;
    var timer, timerEvent, timerText;

    function nextStage() {
        this.state.start('Choice');
    }

    function fire() {
        if (game.time.now > nextFire && bulletGroup.countDead() > 0) {
            nextFire = game.time.now + FIRE_RATE;
            currentBullet.rotation = game.physics.arcade.moveToPointer(currentBullet, 1000, game.input.activePointer, 500);
            currentBullet.isFired = true;
            setTimeout(function () {
                createCurrentBullet();
            }, FIRE_RATE);

        }
    }
    function createEnemies() {
        enemies = [];
        for (var i = 0; i < enemiesTotal; i++) {
            var x = Math.floor((Math.random() * (game.world.width - 100)) + 10);
            var y = Math.floor((Math.random() * 200) + 1);
            var enemy = game.add.sprite(x, y, 'virus');
            enemy.scale.setTo(0.5, 0.5);
            enemy.animations.add('play', [0, 1], 3, true);
            enemies.push(enemy);
        }
    }
    function createBulletsPanel() {
        var scaleValue = 0.3;
        for (var i = 0; i < NUM_BULLET; i++) {
            var button = game.add.sprite(i * 50 + 30, game.world.height - 50, 'waterdrop');
            button.angle = -90;
            button.scale.setTo(scaleValue, scaleValue);
            button.animations.add('play', [0, 1], 3, true);
        }

        var graphics = game.add.graphics(0, 200);
        graphics.lineStyle(2, 0x2380be, 1);
        graphics.drawRoundedRect(20, 280, 150, 80);
    }

    function createBulletGroup() {
        bulletGroup = game.add.group();
        bulletGroup.enableBody = true;
        bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
        bulletGroup.createMultiple(30, 'waterdrop', 0, false);
        bulletGroup.setAll('scale.x', 0.3);
        bulletGroup.setAll('scale.y', 0.3);
        bulletGroup.setAll('anchor.x', 0.5);
        bulletGroup.setAll('anchor.y', 0.5);
        bulletGroup.setAll('outOfBoundsKill', true);
        bulletGroup.setAll('checkWorldBounds', true);

        createCurrentBullet();
    }
    function checkOverlap(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    }
    function createCurrentBullet() {

        currentBullet = bulletGroup.getFirstExists(false);
        currentBullet.animations.add('play', [0, 1], 3, true);
        currentBullet.reset(bow.x, bow.y);
        currentBullet.rotation = game.physics.arcade.angleToPointer(currentBullet);
        currentBullet.anchor.setTo(-0.3, 0.5);
        currentBullet.isFired = false;
        game.physics.arcade.enable(currentBullet);
    }
    function createBow() {
        var scaleValue = 0.3;
        bow = game.add.sprite(game.world.centerX - 10, game.world.height - 60, 'bow');
        bow.scale.setTo(scaleValue, scaleValue);
        bow.anchor.setTo(0.3, 0.5);

    }
    function bulletHitEnemy(enemy, bullet) {
        enemy.kill();
        bullet.kill();

        /*var destroyed = enemies[tank.name].damage();

        if (destroyed) {
            var explosionAnimation = explosions.getFirstExists(false);
            explosionAnimation.reset(tank.x, tank.y);
            explosionAnimation.play('kaboom', 30, false, true);
        }
*/
    }
    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            game.load.spritesheet('waterdrop', 'assets/images/waterdrop.png', 180, 100);
            game.load.image('bow', 'assets/images/bow.png');
            game.load.spritesheet('virus', 'assets/images/virus.png', 100, 100);
        },

        create: function () {
             Helper.addBackground();
            game.physics.startSystem(Phaser.Physics.ARCADE);
            timer = game.time.create();
            
            timerEvent = timer.add(Phaser.Timer.MINUTE * 1, this.endTimer, this);
            // Start the timer
            timer.start();

            createEnemies();
            createBulletsPanel();
            createBow();
            createBulletGroup();
            game.physics.enable(bulletGroup);

            cursors = game.input.keyboard.createCursorKeys();

           
            var graphics = game.add.graphics(0, 0);
             graphics.beginFill(0x0000FF);
            graphics.drawRect(game.world.width - 70, 0, game.world.width -10, 50);

             timerText = game.add.text(game.world.width - 55, 10, "60s", CONFIG.whiteFontStyle);
        },

        update: function () {

            /*for (var i = 0; i < bulletGroup.length; i++) {
                bulletGroup[i].animations.play('play');
            }*/
            for (var i = 0; i < enemies.length; i++) {
                var enemy = enemies[i];

                if (enemy.alive) {
                     for (var j = 0; j < bulletGroup.children.length; j++) {
                         var bullet = bulletGroup.children[j];
                    //game.physics.arcade.collide(tank, enemy);
                        if (bullet.isFired && checkOverlap(bullet, enemy)) {
                            bulletHitEnemy(enemy, bullet);
                        }
                     }

                }

                // move enemy
                enemy.animations.play('play');
                var x = 1;
                if (enemy.x > game.world.width) {
                    x = -1;
                } else if (enemy.x < 0) {
                    x = 1;
                }
                else if (enemy.xDirection !== undefined) {
                    x = enemy.xDirection;
                } else {
                    x = Math.floor((Math.random() * 3 - 1));

                }
                enemy.xDirection = x;
                enemy.x += x;
            }

            currentBullet.animations.play('play');

            bow.rotation = game.physics.arcade.angleToPointer(bow);
            if (!currentBullet.isFired) {
                currentBullet.rotation = game.physics.arcade.angleToPointer(currentBullet);
            }

            if (game.input.activePointer.isDown) {
                //  Boom!
                fire();
            }
        },
        render: function () {
            // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
            if (timer.running) {
              //  game.debug.text(Math.round((timerEvent.delay - timer.ms) / 1000), 2, 14, "#ff0");
                timerText.setText(Math.round((timerEvent.delay - timer.ms) / 1000) + "s");

            }
            else {
                game.debug.text("Done!", 2, 14, "#0f0");
            }
        },
    };
}(App));