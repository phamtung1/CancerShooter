var Guide = (function (game) {
    var button;

    function nextStage() {
        game.state.start('ChooseCancer');
    }

    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
           
        },

        create: function () {
            Helper.addBackground();

            Helper.addTitle("HƯỚNG DẪN");

            var leftMargin = 200;
            var top = 300;
            var step = 80;
            game.add.text(leftMargin, top, "1. Quý khách chọn " + CONFIG.TYPE1NAME + " hoặc " + CONFIG.TYPE2NAME + ".", CONFIG.contentFontStyle);
            game.add.text(leftMargin, top + step, "2. Chọn hoạt chất phù hợp " + CONFIG.TYPE1DRUG + " hoặc " + CONFIG.TYPE2DRUG + " được đại diện bởi hai \"chiến binh\".", CONFIG.contentFontStyle);
            game.add.text(leftMargin, top + step * 2, "3. Chiến binh đứng tại chỗ và quay 90 độ qua trái và ngược lại quay phải", CONFIG.contentFontStyle);
            game.add.text(leftMargin, top + step * 3, "4. Nhấp vào chiến binh để bắn.", CONFIG.contentFontStyle);
            game.add.text(leftMargin, top + step * 4, "5. Sau 45s, nếu diệt được >= 10 tế bào ung thư, quý khách đã loại trừ được bệnh ung thư.", CONFIG.contentFontStyle);

            var man1 = Helper.addMan(100, game.world.height - 250, 'man1');
            var man2 = Helper.addMan(game.world.width - 200, game.world.height - 250, 'man2');
            game.add.tween(man1).to({ x: game.world.centerX - 200 }, 800, Phaser.Easing.Linear.None, true, 500)
                .onComplete.add(function () {
                    game.add.audio('sword').play();
                    game.add.tween(man1.scale).to({ x: man1.scale.x * -1 }, 800, Phaser.Easing.Linear.None, true, 0);
                });
            game.add.tween(man2).to({ x: game.world.centerX + 200 }, 800, Phaser.Easing.Linear.None, true, 500)
                .onComplete.add(function () {
                    game.add.tween(man2.scale).to({ x: man1.scale.x * -1 }, 800, Phaser.Easing.Linear.None, true, 0)
                        .onComplete.add(function () {
                            Helper.addButton(game.world.width - 350, game.world.height - 200, nextStage, "BẮT ĐẦU", 0.8);
                        });
                });
        }
    };
}(App));