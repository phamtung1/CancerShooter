var Welcome = (function (game) {

    function nextStage() {
        if (game.scale.isFullScreen) {
            //    game.scale.stopFullScreen();
        }
        else {
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;//SHOW_ALL;
            game.scale.setMaximum();
            //   game.scale.setScreenSize(true);
            game.scale.pageAlignVertically = false;
            game.scale.pageAlignHorizontally = false;
            game.scale.startFullScreen(false);
        }
        game.state.start('Guide');
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            Helper.loadResources();
        },

        create: function () {
            Helper.addBackground();

            var man1 = game.add.sprite(game.world.centerX - 250, game.world.centerY + 300, 'man1');
            var man2 = game.add.sprite(game.world.centerX + 250, game.world.centerY + 300, 'man2');
            man1.anchor.set(0.5, 0.5);
            man1.scale.x *= -1;
            Helper.addTweenWalk(man1);
            game.add.tween(man1).to({ x: 300 }, 1000, Phaser.Easing.Linear.None, true, 0)
                .onComplete.add(function () {
                    game.add.tween(man1.scale).to({ x: man1.scale.x * -1 }, 1000, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.add(function () {
                            game.add.tween(man1).to({ x: game.world.centerX - 400 }, 1000, Phaser.Easing.Linear.None, true, 0)
                        });
                });

            man2.anchor.set(0.5, 0.5);
            man2.scale.x *= -1;
            Helper.addTweenWalk(man2);
            game.add.tween(man2).to({ x: game.world.width - 300 }, 1000, Phaser.Easing.Linear.None, true, 0)
                .onComplete.add(function () {
                    game.add.tween(man2.scale).to({ x: man2.scale.x * -1 }, 1000, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.add(function () {
                            game.add.tween(man2).to({ x: game.world.centerX + 400 }, 1000, Phaser.Easing.Linear.None, true, 0)
                        });
                });


            var group = Helper.addButton(game.world.centerX, game.world.centerY + 250, nextStage, "HƯỚNG DẪN", 0.5);
            game.add.tween(group.button.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None, true);
            game.add.tween(group.text.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None, true);

            Helper.addSmallTitle("Chào mừng Quý khách tham gia chương trình", 0);
            Helper.addSmallTitle("chống bệnh Ung thư vú và Ung thư Đại trực tràng", 1);
        },
        update: function () {

        }
    };
}(App));