var Game2 = (function (game) {
    var START_ANGLE = 70;
    var END_ANGLE = -20;
    var FIRE_RATE = 1000;
    var MAN_ANGLE_OFFSET = 120;
    var MAN_ANCHORX = 0.54;
    var MAN_ANCHORY = 1;
    var BULLET_DISTANCE = 100;
    var MAX_ENEMY_COUNT = 15;
    var NUM_BULLET = 3;
    var NUM_ENEMY = 5;

    var _secondLeft;

    var _enemyKilled = 0;
    var _enemyLeft = MAX_ENEMY_COUNT;
    var _bulletLeft;
    var _activeBullet;
    var nextFire = 0;
    var _enemies = [];
    var timer, timerEvent, timerText;
    var _angle = 1;
    var _sword;
    var _isFired;
    var _line1;
    var _bullets;

    var _progressText;
    var _enemyArea;

    function init() {
        _secondLeft = 45;
        _enemyKilled = 0;
        _enemyLeft = MAX_ENEMY_COUNT;
        _bulletLeft = 6000 - NUM_BULLET;
        nextFire = 0;
        _enemies = [];
        _angle = 1;
    }
    function fire() {
        if (game.time.now > nextFire) {
            _isFired = true;
            _line1.visible = false;
            nextFire = game.time.now + FIRE_RATE;
        }
    }
    function endTimer() {
        if (_enemyKilled >= 10) {
            game.state.start('Quiz1');
        } else {
            game.state.start('GameFail');
        }
    }

    function addEnemy() {
        if (_enemyLeft == 0) {
            return;
        }

        _enemyLeft--;
        var x, y;
        while (true) {
            x = Helper.randomInt(100, game.world.width - 100);
            y = Helper.randomInt(0, game.world.height - 100);
            if (_enemyArea.contains(x, y)) {
                break;
            }
        }
        var enemy = game.add.sprite(x, y, 'virus2');
        enemy.__index = _enemies.length;
        enemy.scale.set(0.1);
        enemy.anchor.set(0.5);

        Helper.addTweenWalk(enemy, Helper.randomInt(1, 9));
        _enemies.push(enemy);
        var scale = Helper.randomInt(2, 5) / 10;
        game.add.tween(enemy.scale).to({ x: scale, y: scale }, 600, Phaser.Easing.Linear.None, true);

        return enemy;
    }
    function createFirstEnemies() {
        for (var i = 0; i < NUM_ENEMY; i++) {
            addEnemy();
        }
    }

    function killEnemy(enemy) {
        _enemyKilled++;
        _enemies.splice(enemy.__index, 1);
        enemy.frame = 1;

        game.add.tween(enemy.scale).to({ x: 0.1, y: 0.1 }, 600, Phaser.Easing.Linear.None, true)
            .onComplete.add(function () {
                enemy.kill();
                _progressText.setText(_enemyKilled.toString());

                // check win
                if (_enemyKilled === 10) {
                    game.state.start('Quiz1');
                    return;
                }
                // add enemy
                addEnemy();
                for (var i = 0; i < _enemies.length; i++) {
                    _enemies[i].__index = i;
                }
            });
    }
    function createBulletsPanel() {
        Helper.addButton(game.world.width - 200, game.world.height - 250, null, CONFIG.TYPE2DRUG, 0.7);
        _bullets = [];
        for (var i = NUM_BULLET - 1; i >= 0; i--) {
            var bullet = Helper.addMan(game.world.width - i * 110 - BULLET_DISTANCE, game.world.height - 100, 'man22', 0.3);
            _bullets.push(bullet);
        }
    }

    function createActiveBullet() {
        if (_bullets.length == 0) {
            return;
        }
        _isFired = false;
        if (_sword) {
            _sword.kill();
        }
        var bullet = _bullets.shift();
        bullet.angle = END_ANGLE;
        _angle = 1;
        var destination = getActiveBulletPosition();
        game.add.tween(bullet.scale).to({ x: 0.5, y: 0.5 }, 200, Phaser.Easing.Linear.None, true);
        var tween1 = game.add.tween(bullet).to(destination, 900, Phaser.Easing.Linear.None, true);
        _activeBullet = bullet;
        _activeBullet.tweens.walk.stop();
        _activeBullet.anchor.set(MAN_ANCHORX, MAN_ANCHORY);

        _activeBullet.checkWorldBounds = true;
        _activeBullet.outOfBoundsKill = true;
        _activeBullet.events.onOutOfBounds.add(createActiveBullet, this);

        game.physics.arcade.enable(_activeBullet);

        tween1.onComplete.add(function () {

            if (!_line1) {
                _line1 = game.add.sprite(_activeBullet.left + _activeBullet.width * MAN_ANCHORX, _activeBullet.top + _activeBullet.height * MAN_ANCHORY, 'line');
            }

            _sword = game.add.sprite(_activeBullet.left + _activeBullet.width * MAN_ANCHORX, _activeBullet.top + _activeBullet.height * MAN_ANCHORY, 'sword');
            _sword.anchor.set(-4, 0.3);
            _sword.alpha = 0;
            game.physics.enable(_sword, Phaser.Physics.ARCADE);

            game.physics.enable(_activeBullet, Phaser.Physics.ARCADE);
            setTimeout(function () {
                _activeBullet.inputEnabled = true;
                _activeBullet.events.onInputDown.add(fire, this);
                _line1.visible = true;
            }, 100);
            _activeBullet.__isLive = true;
            addBullet();
            game.world.bringToTop(_activeBullet);
            game.world.bringToTop(_sword);
        });
    }
    function addBullet() {
        if (_bullets.length == NUM_BULLET) {
            return;
        }
        var lastTween;
        for (var i = 0; i < _bullets.length; i++) {
            var bullet = _bullets[i];
            lastTween = game.add.tween(bullet).to({ x: bullet.x - BULLET_DISTANCE }, 400, Phaser.Easing.Linear.None, true);
        }
        if (_bulletLeft > 0) {
            var newBullet = Helper.addMan(game.world.width - BULLET_DISTANCE, game.world.height - 100, 'man22', 0.1);
            _bullets.push(newBullet);
            game.add.tween(newBullet.scale).to({ x: 0.3, y: 0.3 }, 500, Phaser.Easing.Linear.None, true);
            _bulletLeft--;
        }
    }
    function getActiveBulletPosition() {
        return {
            x: game.world.centerX,
            y: game.world.height - 100
        };
    }
    function createEnemyArea() {
        var poly = new Phaser.Polygon();
        poly.setTo([
            { x: 400, y: 30 },
            { x: game.world.centerX - 100, y: 30 },
            { x: game.world.centerX + 350, y: game.world.height - 600 },
            { x: game.world.centerX + 290, y: game.world.height - 400 },
            { x: game.world.centerX - 350, y: game.world.height - 400 },
            { x: game.world.centerX - 550, y: game.world.height - 600 },
        ]);

        return poly;
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            game.load.spritesheet('virus2', 'assets/images/virus2.png', 400, 335);
            game.load.image('line', 'assets/images/line.png');
            game.load.image('sword', 'assets/images/sword.png');
            game.load.image('progressbar', 'assets/images/progressbar.png');
            game.load.image('body2', 'assets/images/body2.png');

            Helper.loadResources();
        },

        create: function () {
            init();

            Helper.addBackground();
            game.physics.startSystem(Phaser.Physics.ARCADE);

            _enemyArea = createEnemyArea();
            // body image
            var body = game.add.image(game.world.width - game.cache.getImage('body2').width, 0, 'body2');


            // time
            Helper.addButton(game.world.width - 160, 60, null, '', 0.5);
            timer = game.time.create();
            timerEvent = timer.add(Phaser.Timer.SECOND * _secondLeft, endTimer);
            timer.start();
            timerText = game.add.text(game.world.width - 155, 60, "60s", CONFIG.bigCaptionFontStyle);
            timerText.anchor.set(0.5);
            // progress bar
            var progressbar = game.add.image(220, game.world.height - 100, 'progressbar');
            progressbar.anchor.set(0.5);
            progressbar.scale.set(0.6);

            // progress text 
            _progressText = game.add.text(270, game.world.height - 80, "0", CONFIG.bigCaptionFontStyle);
            _progressText.anchor.set(0.5);

            createFirstEnemies();
            createBulletsPanel();
            createActiveBullet();

            // enemy area
            //   Helper.drawPolygon(_enemyArea, 0.3);
        },

        update: function () {

            if (!_line1 || !_sword) {
                return;
            }
            if (_isFired) {
                game.physics.arcade.velocityFromAngle(_activeBullet.angle - MAN_ANGLE_OFFSET, 1000, _activeBullet.body.velocity);
                game.physics.arcade.velocityFromAngle(_sword.angle, 1000, _sword.body.velocity);
            } else if (_activeBullet.__isLive) {
                _activeBullet.angle += _angle;
                if (_activeBullet.angle < END_ANGLE) {
                    _angle = 1;
                } else if (_activeBullet.angle > START_ANGLE) {
                    _angle = -1;
                }
            }

            // progress text
            _line1.angle = _activeBullet.angle - MAN_ANGLE_OFFSET;
            _sword.angle = _activeBullet.angle - MAN_ANGLE_OFFSET;

            for (var i = 0; i < _enemies.length; i++) {
                var enemy = _enemies[i];
                if (_sword.alive && enemy.alive && Helper.checkOverlap(_sword, enemy)) {
                    _activeBullet.kill();
                    _sword.kill();
                    killEnemy(enemy);
                    createActiveBullet();
                    break;
                }
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
        shutdown: function () {
            _line1 = null;
            game.world.removeAll();
        }
    };

}(App));