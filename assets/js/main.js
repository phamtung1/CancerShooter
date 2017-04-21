var App = new Phaser.Game(CONFIG.WIDTH, CONFIG.HEIGHT, Phaser.CANVAS, 'shooting');

window.onload = function () {

    App.state.add('Welcome', Welcome);
    App.state.add('Guide', Guide);
    App.state.add('ChooseCancer', ChooseCancer);
    App.state.add('ChooseDrug', ChooseDrug);
    App.state.add('DrugFail', DrugFail);
    App.state.add('Game1', Game1);
    App.state.add('Game2', Game2);
    App.state.add('GameFail', GameFail);
    App.state.add('Quiz1', Quiz1);
    App.state.add('Quiz1Correct', Quiz1Correct);
    App.state.add('Quiz1Fail', Quiz1Fail);
    App.state.add('Quiz2', Quiz2);
    App.state.add('Quiz2Correct', Quiz2Correct);
    App.state.add('Quiz2Fail', Quiz2Fail);
    App.state.add('GameEnd', GameEnd);
    App.state.add('Info', Info);

    App.state.start('Welcome');

    App.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;


};