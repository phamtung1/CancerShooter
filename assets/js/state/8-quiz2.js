var Quiz2 = (function (game) {
    var button;

    function chooseWrong() {
        game.state.start('Quiz2Fail');
    }
    function chooseRight() {
        game.state.start('Quiz2Correct');
    }
    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            Helper.loadResources();
        },

        create: function () {
            Helper.addBackground();

            var manName = game.userChoice === CONFIG.TYPE1 ? CONFIG.TYPE1MAN : CONFIG.TYPE2MAN;
            Helper.addSmallTitle("Trước khi kết thúc,", 0);
            Helper.addSmallTitle("xin mời Quý khách tìm hiểu về \"chiến binh\" " + manName, 1);

            var left = 200;
            var text = game.add.text(left, 450, "2. Chỉ định của " + manName + " là?", CONFIG.questionFontStyle);
            text = game.add.text(text.width + left, 465, "(Chọn câu trả lời đúng nhất)", CONFIG.contentFontStyle);

            var top = 550;
            var step = 70;
            if (game.userChoice === CONFIG.TYPE1) {
                text = game.add.text(left, top, "a. Hóa trị bước 1 và bước 2 ung thư phổi không tế bào nhỏ giai đoạn tiến triển tại chỗ và di căn", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseWrong, this);
                text = game.add.text(left, top + step, "b. Hóa trị hỗ trợ sau phẫu thuật ung thư vú giai đoạn sớm, hóa trị ung thư vú di căn", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseWrong, this);
                text = game.add.text(left, top + step * 2, "c. Hóa trị ung thư đầu-cổ tiến triển tại chỗ", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseWrong, this);
                text = game.add.text(left, top + step * 3, "d. Hóa trị ung thư tiền liệt tuyến kháng nội tiết", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseWrong, this);
                text = game.add.text(left, top + step * 4, "e. Tất cả các ý trên", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseRight, this);
            } else {
                text = game.add.text(left, top, "a. Điều trị hỗ trợ ung thư đại tràng giai đoạn III sau khi cắt bỏ hoàn toàn khối u nguyên phát", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseWrong, this);
                text = game.add.text(left, top + step, "b. Điều trị ung thư đại-trực tràng di căn", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseWrong, this);
                text = game.add.text(left, top + step * 2, "c. Cả hai ý trên", CONFIG.contentFontStyle);
                text.inputEnabled = true;
                text.events.onInputDown.add(chooseRight, this);
            }
        },

        update: function () {

        }

    };
}(App));