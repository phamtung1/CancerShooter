var Helper = (function (game) {

    function playButtonSound() {
        game.add.audio('sword').play();
    }
    return {
        setUp: function () {
            //   game.userChoice = CONFIG.TYPE1;
        },
        drawPolygon: function (polygon, alpha) {
            var graphics = game.add.graphics(0, 0);
            graphics.alpha = alpha || 1;
            graphics.beginFill(0xFF33ff);
            graphics.drawPolygon(polygon.points);
            graphics.endFill();
        },
        randomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        checkOverlap: function (spriteA, spriteB) {

            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();

            return Phaser.Rectangle.intersects(boundsA, boundsB);

        },
        loadResources: function () {
            game.load.image("background", "assets/images/background.jpg");
            game.load.image("logo", "assets/images/logo.png");
            game.load.spritesheet('button', 'assets/images/button.png', 480, 187);
            game.load.image('man1', 'assets/images/man1.png');
            game.load.image("man2", "assets/images/man2.png");
            game.load.image("man22", "assets/images/man22.png");
            game.load.image('sadman1', 'assets/images/sadman1.png');
            game.load.image("sadman2", "assets/images/sadman2.png");
            game.load.image('funman1', 'assets/images/funman1.png');
            game.load.image("funman2", "assets/images/funman2.png");
            game.load.image('label', 'assets/images/label.png');
            game.load.audio('sword', 'assets/sound/sword.mp3');
            game.load.image('body2', 'assets/images/body2.png');
            game.load.image('body', 'assets/images/body1.png');
        },
        addTweenWalk: function (element, angle) {
            return game.add.tween(element).to({ angle: angle || 5 }, 1000, function (k) { return Math.sin(Math.PI * 2 * k); }, true, 0, -1);
        },
        center: function (element) {
            element.x = (game.world.width - element.width) / 2;
        },
        centerFirstHalf: function (element) {
            element.x = game.world.width / 4 - element.width / 2;
        },
        centerSecondHalf: function (element) {
            element.x = game.world.width / 4 * 3 - element.width / 2;
        },
        addButton: function (left, top, onclick, caption, scale) {
            var button;
            if (onclick) {
                button = game.add.button(left, top, 'button', onclick, this, 1, 0, 2);
            } else {
                button = game.add.image(left, top, 'button');
            }

            button.anchor.set(0.5);
            text = game.add.text(left, top, caption, CONFIG.captionFontStyle);
            text.anchor.set(0.5);
            if (scale) {
                button.scale.setTo(scale, scale);
                text.scale.setTo(scale, scale);
            }
            if (button.onInputDown) {
                button.onInputDown.add(playButtonSound, game);
            }
            return {
                button: button,
                text: text
            };
        },
        addBackground: function () {
            game.add.sprite(0, 0, 'background');
        },
        addTitle: function (text) {
            var text = game.add.text(0, 150, text, CONFIG.largeTitleFontStyle);
            Helper.center(text);
        },
        addSmallTitle: function (text, line) {
            // line count from 0
            var text = game.add.text(0, (line || 0) * 100 + 250, text, CONFIG.mediumTitleFontStyle);
            Helper.center(text);
        },
        addMan: function (left, top, resource, scale, isStatic) {
            var man1 = game.add.sprite(left, top, resource);
            man1.anchor.set(0.5, 0.5);
            if (scale) {
                man1.scale.set(scale, scale);
            }
            if (!isStatic) {
                man1.tweens = {};
                man1.tweens.walk = Helper.addTweenWalk(man1);
            }
            return man1;
        }
    };
}(App));