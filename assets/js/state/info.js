var Info = (function (game) {
    var MAX_PAGE_INDEX = 4;
    var _img;
    var _currentPage = 1;
    var _backButton, _nextButton, _closeButton, _text;

    function close() {
        game.state.start(game.prevState);
    }

    function gotoPage(pageIndex) {
        _backButton.alpha = 1;
        _nextButton.alpha = 1;
        var image = game.add.image(game.world.centerX, game.world.centerY - 20, game.userChoice === CONFIG.TYPE1 ? 'doc1-' + _currentPage : 'doc2-' + _currentPage);
        image.anchor.set(0.5, 0.5);
        _text.setText(_currentPage);
        if (pageIndex <= 1) {
            _backButton.alpha = 0.3;
            return;
        }
        if (pageIndex >= MAX_PAGE_INDEX) {
            _nextButton.alpha = 0.3;
            return;
        }
    }
    function back() {
        if (_currentPage > 1) {
            gotoPage(--_currentPage);
            _closeButton.visible = false;
        }
    }
    function next() {
        if (_currentPage < MAX_PAGE_INDEX) {
            gotoPage(++_currentPage);
            if(_currentPage === MAX_PAGE_INDEX)
            {
                _closeButton.visible = true;
            }
        }
    }
    return {
        preload: function () {
            game.stage.backgroundColor = CONFIG.background;
            Helper.loadResources();
            game.load.image('arrow-left', 'assets/images/arrow-left.png');
            game.load.image('arrow-right', 'assets/images/arrow-right.png');
            game.load.image('close', 'assets/images/close.png');
            if (game.userChoice === CONFIG.TYPE1) {
                game.load.image('doc1-1', 'assets/images/doc/type1/1.png');
                game.load.image('doc1-2', 'assets/images/doc/type1/2.png');
                game.load.image('doc1-3', 'assets/images/doc/type1/3.png');
                game.load.image('doc1-4', 'assets/images/doc/type1/4.png');
            } else {
                game.load.image('doc2-1', 'assets/images/doc/type2/1.png');
                game.load.image('doc2-2', 'assets/images/doc/type2/2.png');
                game.load.image('doc2-3', 'assets/images/doc/type2/3.png');
                game.load.image('doc2-4', 'assets/images/doc/type2/4.png');
            }

        },

        create: function () {
            _currentPage = 1;
            Helper.addBackground();
            _img = game.add.image(game.world.centerX, game.world.centerY - 20, game.userChoice === CONFIG.TYPE1 ? 'doc1-1' : 'doc2-1');
            _img.anchor.set(0.5, 0.5);

            _backButton = game.add.button(game.world.centerX - 50, game.world.height - 50, 'arrow-left', back, this);
            _backButton.anchor.set(0.5);
            _nextButton = game.add.button(game.world.centerX + 60, game.world.height - 50, 'arrow-right', next, this);
            _nextButton.anchor.set(0.5);
            _text = game.add.text(game.world.centerX + 10, game.world.height - 50, _currentPage, CONFIG.contentFontStyle);
            _text.anchor.set(0.5);

            _closeButton = game.add.button(game.world.width - 60, 60, 'close', close, this);
            _closeButton.anchor.set(0.5);
            _closeButton.visible = false;
        },

        update: function () {

        }
    };
}(App));