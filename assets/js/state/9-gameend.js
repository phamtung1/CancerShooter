var GameEnd = (function (game) {
    function info() {
        game.prevState = 'GameEnd';
        game.state.start('Info');
    }

    function start() {
        game.state.start('Welcome');
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

            Helper.addSmallTitle("Chúc mừng quý khách.", 0);
            Helper.addSmallTitle("đã tiêu diệt được các tế bào ung thư", 1);
            Helper.addSmallTitle("và hoàn thành phần trả lời câu hỏi!", 2);

            Helper.addButton(game.world.centerX / 2, game.world.centerY + 200, info, "Thông tin \nsản phẩm");
            Helper.addMan(200, game.world.centerY + 200, 'funman1', 0.8);
            Helper.addMan(game.world.centerX - 200, game.world.centerY + 200, 'funman2', 0.78);

            Helper.addButton(game.world.centerX / 2 * 3, game.world.centerY + 200, start, "Bắt đầu");
            Helper.addMan(game.world.centerX + 100, game.world.centerY + 200, 'man2', 0.8);
            Helper.addMan(game.world.width - 150, game.world.centerY + 200, 'man1', 0.78);
        },
    };
}(App));