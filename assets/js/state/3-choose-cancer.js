var ChooseCancer = (function (game) {
    function nextStage1() {
        game.userChoice = CONFIG.TYPE1;
        this.state.start('ChooseDrug');
    }

    function nextStage2() {
        game.userChoice = CONFIG.TYPE2;
        this.state.start('ChooseDrug');
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            game.load.image('cancer1', 'assets/images/cancer1.png');
            game.load.image('cancer2', 'assets/images/cancer2.png');
        },

        create: function () {
            Helper.addBackground();

            Helper.addTitle("CHỌN LOẠI UNG THƯ");

            game.add.button(200, game.world.height - 700, 'cancer1', nextStage1, this);

            game.add.button(game.world.centerX + 200, game.world.height - 700, 'cancer2', nextStage2, this);


            Helper.addMan(250, game.world.height - 300, 'man1', 0.7);
            Helper.addMan(game.world.width - 250, game.world.height - 300, 'man2', 0.7);
        }
    };
}(App));