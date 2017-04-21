var Quiz1 = (function (game) {
    var button;

    function nextStage1() {
        if (game.userChoice === CONFIG.TYPE1) {
            game.state.start('Quiz1Correct');
        }
        else {
            game.state.start('Quiz1Fail');
        }
    }

    function nextStage2() {
        if (game.userChoice === CONFIG.TYPE2) {
            game.state.start('Quiz1Correct');
        }
        else {
            game.state.start('Quiz1Fail');
        }
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            Helper.loadResources();
        },

        create: function () {
            Helper.setUp();
            Helper.addBackground();
           
            var manName = game.userChoice === CONFIG.TYPE1 ? CONFIG.TYPE1MAN : CONFIG.TYPE2MAN;
            Helper.addSmallTitle("Trước khi kết thúc,", 0);
            Helper.addSmallTitle("xin mời Quý khách tìm hiểu về \"chiến binh\" " + manName, 1);

            var text = game.add.text(0, 500, "1. Hoạt chất của " + manName + " là gì?", CONFIG.questionFontStyle);
            Helper.center(text);

            var top = game.world.height - 300;
            Helper.addButton(500, top, nextStage1, CONFIG.TYPE1DRUG);
            Helper.addButton(game.world.width - 500, top, nextStage2, CONFIG.TYPE2DRUG);
        },

        update: function () {

        }

    };
}(App));