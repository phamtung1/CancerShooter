var Quiz1Correct = (function (game) {
    var button;

    function nextStage() {
        game.state.start('Quiz2');
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            Helper.loadResources();
            game.load.image('label', 'assets/images/label.png');
        },

        create: function () {
            Helper.addBackground();
            Helper.addSmallTitle("Đáp án của bạn hoàn toàn chính xác!", 0);
            var manName = game.userChoice === CONFIG.TYPE1 ? CONFIG.TYPE1MAN : CONFIG.TYPE2MAN;
            var drugName = game.userChoice === CONFIG.TYPE1 ? CONFIG.TYPE1DRUG : CONFIG.TYPE2DRUG;
            var text = game.add.text(0, 500, "1. Hoạt chất của " + manName + " là gì?", CONFIG.questionFontStyle);
            Helper.center(text);

            var label = game.add.image(game.world.centerX, game.world.height - 400, 'label');
            label.anchor.set(0.5);

            text = game.add.text(game.world.centerX, game.world.height - 400, drugName.toUpperCase(), CONFIG.answerFontStyle);
            text.anchor.set(0.5);
            if (game.userChoice === CONFIG.TYPE1) {
                Helper.addMan(game.world.centerX - 400, game.world.height - 300, 'man1');
            } else {
                Helper.addMan(game.world.centerX + 400, game.world.height - 300, 'man2');
            }
            Helper.addButton(game.world.width - 200, game.world.height - 150, nextStage, 'Tiếp tục', 0.7);
        },

        update: function () {

        }

    };
}(App));