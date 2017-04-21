var Quiz2Correct = (function (game) {
    var button;

    function nextStage() {
        game.state.start('GameEnd');
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            Helper.loadResources();
        },

        create: function () {
            Helper.addBackground();

            var manName = game.userChoice === CONFIG.TYPE1 ? CONFIG.TYPE1MAN : CONFIG.TYPE2MAN;
            Helper.addSmallTitle("Đáp án của bạn hoàn toàn chính xác!", 1);

            var left = 200;
            var text = game.add.text(left, 450, "2. Chỉ định của " + manName + " là?", CONFIG.questionFontStyle);

            var top = 550;
            var step = 70;
            if (game.userChoice === CONFIG.TYPE1) {
                game.add.text(left, top, "a. Hóa trị bước 1 và bước 2 ung thư phổi không tế bào nhỏ giai đoạn tiến triển tại chỗ và di căn", CONFIG.contentFontStyle);
                game.add.text(left, top + step, "b. Hóa trị hỗ trợ sau phẫu thuật ung thư vú giai đoạn sớm, hóa trị ung thư vú di căn", CONFIG.contentFontStyle);
                game.add.text(left, top + step * 2, "c. Hóa trị ung thư đầu-cổ tiến triển tại chỗ", CONFIG.contentFontStyle);
                game.add.text(left, top + step * 3, "d. Hóa trị ung thư tiền liệt tuyến kháng nội tiết", CONFIG.contentFontStyle);
            } else {
                text = game.add.text(left, top, "a. Điều trị hỗ trợ ung thư đại tràng giai đoạn III sau khi cắt bỏ hoàn toàn khối u nguyên phát", CONFIG.contentFontStyle);
                text = game.add.text(left, top + step, "b. Điều trị ung thư đại-trực tràng di căn", CONFIG.contentFontStyle);
            }
            var label = game.add.image(game.world.centerX, game.world.height - 150, 'label');
            label.anchor.set(0.5);

            if (game.userChoice === CONFIG.TYPE1) {
                text = game.add.text(game.world.centerX, game.world.height - 150, "e. Tất cả các ý trên", CONFIG.answerFontStyle);

                Helper.addMan(game.world.centerX - 400, game.world.height - 150, 'man1', 0.7);
            }
            else {
                text = game.add.text(game.world.centerX, game.world.height - 150, "c. Tất cả các ý trên", CONFIG.answerFontStyle);

                Helper.addMan(game.world.centerX + 400, game.world.height - 150, 'man2', 0.7);
            }
            text.anchor.set(0.5);
            Helper.addButton(game.world.width - 200, game.world.height - 150, nextStage, 'Tiếp tục', 0.7);
        },

        update: function () {

        }

    };
}(App));