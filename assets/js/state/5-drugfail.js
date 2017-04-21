var DrugFail = (function (game) {
    var button;

    function back() {
        game.state.start('ChooseDrug');
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            Helper.loadResources();
        },

        create: function () {
            Helper.addBackground();
            Helper.addSmallTitle("Quý khách vui lòng chọn lại hoạt chất phù hợp", 0);

            var cancerName = game.userChoice === CONFIG.TYPE1 ? CONFIG.TYPE1NAME : CONFIG.TYPE2NAME;
            Helper.addSmallTitle("để chiến đấu với bệnh " + cancerName, 1);

            if (game.userChoice === CONFIG.TYPE1) {
                Helper.addMan(400, game.world.centerY + 120, 'man1');
                Helper.addButton(game.world.centerX + 500, game.world.height - 400, back, "QUAY LẠI", 0.8);

            } else {
                Helper.addMan(game.world.width - 500, game.world.centerY + 120, 'man2');
                Helper.addButton(500, game.world.height - 400, back, "QUAY LẠI", 0.8);
            }

        }
    };
}(App));