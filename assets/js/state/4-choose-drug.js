var ChooseDrug = (function (game) {
    function nextStage1() {
        if (game.userChoice === CONFIG.TYPE1) {
            game.state.start('Game1');
        }
        else {
            game.state.start('DrugFail');
        }
    }

    function nextStage2() {
        if (game.userChoice === CONFIG.TYPE2) {
            game.state.start('Game2');
        }
        else {
            game.state.start('DrugFail');
        }
    }
    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
        },

        create: function () {
            Helper.addBackground();
            var scaleValue = 0.7;
            Helper.addTitle("CHỌN HOẠT CHẤT");

            Helper.addButton(game.world.centerX / 2, game.world.centerY - 50, nextStage1, CONFIG.TYPE1DRUG).button.scale.set(1.5, 1);
            Helper.addButton(game.world.centerX / 2 * 3, game.world.centerY - 50, nextStage2, CONFIG.TYPE2DRUG).button.scale.set(1.5, 1);

            var left = 250;
            var step = 230;
            Helper.addMan(left, game.world.height - 300, 'man1', 0.7);
            Helper.addMan(left + step, game.world.height - 300, 'man1', 0.7);
            Helper.addMan(left + step * 2, game.world.height - 300, 'man1', 0.7);

            var left = game.world.centerX + 250;
            Helper.addMan(left, game.world.height - 300, 'man22', 0.7);
            Helper.addMan(left + step, game.world.height - 300, 'man22', 0.7);
            Helper.addMan(left + step * 2, game.world.height - 300, 'man22', 0.7);
        },
    };
}(App));