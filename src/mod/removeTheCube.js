import points from './points';
import timer from './timer';
import controls from './controls';
import gameArea from './gameArea';
import resultTable from './resultTable';
import resultForm from './saveResult';

export default class RemoveTheCube{
    #isNewGame;

    #pointCounter; 
    #timer;
    #controls;
    #gameArea;
    #resultTable;
    #resultForm;

    constructor() {
        this.#isNewGame = true;

        this.#pointCounter = new points();
        this.#timer = new timer(60, this.#endGame.bind(this));
        this.#controls = new controls(this.#changeState.bind(this), this.#resetGame.bind(this));
        this.#gameArea = new gameArea(this.#addPoints.bind(this));
        this.#resultTable = new resultTable();
        this.#resultForm = new resultForm(this.#saveProgress.bind(this));
    }

    render($inputPoint) {
        const container = document.createElement('div');
        container.classList.add('container', 'vh-100');

        container.appendChild(this.#resultForm.getNode());

        const containerRow = document.createElement('div');
        containerRow.classList.add('row', 'vh-100');
        container.appendChild(containerRow);

        containerRow.appendChild(this.#generateGameBlock());
        containerRow.appendChild(this.#generateTechnicalNode());
        
        $inputPoint.appendChild(container);
    }

    #endGame() {
        this.#gameArea.stopGame();
        this.#controls.endGame();
        this.#resultForm.showForm(this.#pointCounter.pointValue);
    }

    #changeState(state) {
        if (this.#isNewGame) {
            this.#isNewGame = false;
            this.#timer.start();
            this.#gameArea.prepareGameField();
            this.#gameArea.startGame();
        } else if (state === controls.START_TEXT) {
            this.#timer.start();
            this.#gameArea.startGame();
        } else {
            this.#timer.stop();
            this.#gameArea.stopGame();
        }
    }

    #resetGame() {
        this.#timer.reset();
        this.#pointCounter.reset();
        this.#gameArea.clear();
        this.#isNewGame = true;
    }

    #generateGameBlock() {
        const gameBlockNode = document.createElement('div');
        gameBlockNode.classList.add('col-9', 'd-flex', 'flex-column', 'mb-2');

        gameBlockNode.insertAdjacentHTML('afterbegin', `
        <div class='row'>
            <h1 class='col-12'>Remove the cube</h1>
        </div>`);

        const controlRow = document.createElement('div');
        controlRow.classList.add('row', 'justify-content-between', 'mb-2');
        controlRow.appendChild(this.#controls.getNode());
        controlRow.appendChild(this.#pointCounter.getNode());
        controlRow.appendChild(this.#timer.getNode());
        gameBlockNode.appendChild(controlRow);

        gameBlockNode.appendChild(this.#gameArea.getNode());

        return gameBlockNode;
    }

    #generateTechnicalNode() {
        const sideBar = document.createElement('div');
        sideBar.classList.add('col-3', 'd-flex', 'flex-column', 'mb-2');

        sideBar.appendChild(this.#generateRules());

        sideBar.insertAdjacentHTML("beforeend", `<div class='row'><h2>Results</h2></div>`)

        sideBar.appendChild(this.#resultTable.resultNode);

        return sideBar;
    }

    #generateRules() {
        const node = document.createElement('div');

        node.insertAdjacentHTML('afterbegin', `
            <div class='row'><h2>Game rules</h2></div>
            <div class='row align-items-center mb-1'>
                <div class='position-relative' style="width: 50px; height: 50px">
                    <div class='cube cube-1'></div>
                </div>
                <p class='col-8 mb-0'>1-pints</p>
            </div>
            <div class='row align-items-center mb-1'>
                <div class='position-relative' style="width: 50px; height: 50px">
                    <div class='cube cube-2'></div>
                </div>
                <p class='col-8 mb-0'>4-pints</p>
            </div>
            <div class='row align-items-center mb-1'>
                <div class='position-relative' style="width: 50px; height: 50px">
                    <div class='cube cube-3'></div>
                </div>
                <p class='col-8 mb-0'>9-pints</p>
            </div>
            <div class='row align-items-center mb-1'>
                <div class='position-relative' style="width: 50px; height: 50px">
                    <div class='cube cube-4'></div>
                </div>
                <p class='col-8 mb-0'>16-pints</p>
            </div>
        `);

        return node;
    }

    #addPoints(quantity) {
        this.#pointCounter.addPoint(quantity);
    }

    #saveProgress(name, points) {
        this.#resultTable.addResult(name, points);
    }
}