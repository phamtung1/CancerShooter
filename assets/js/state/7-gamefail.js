var GameFail = (function (game) {
    function info() {
        game.prevState = 'GameFail';
        game.state.start('Info');
    }

    function tryagain() {
        game.state.start('ChooseCancer');
    }
    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            game.load.image("sadman1", "assets/images/sadman1.png");
            game.load.image("sadman2", "assets/images/sadman2.png");
            Helper.loadResources();
        },

        create: function () {
            Helper.setUp();
            Helper.addBackground();
            var scaleValue = 0.7;

            Helper.addSmallTitle("Rất tiếc! Tế bào ung thư vẫn chưa được diệt sạch.", 0);
            Helper.addSmallTitle("Xin mời Quý khách tiếp tục thử lại", 1);

            Helper.addButton(game.world.centerX / 2 + 100, game.world.centerY + 200, info, "Thông tin \nsản phẩm");
            Helper.addButton(game.world.centerX / 2 * 3 - 100, game.world.centerY + 200, tryagain, "Thử lại");

            Helper.addMan(300, game.world.centerY + 200, 'sadman1', 0.8);
            Helper.addMan(game.world.width - 300, game.world.centerY + 200, 'sadman2', 0.78);
        },
    };
}(App));