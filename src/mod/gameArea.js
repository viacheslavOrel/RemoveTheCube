import cube from './cube';

export default class GameArea {
    #removeCubeCallBack;
    #gameAreaNode;

    #removeCubeMethod;

    #cellQuantity;
    #fields;
    #cubeQuantity;

    constructor(removeCubeCallBack) {
        this.#removeCubeCallBack = removeCubeCallBack;

        this.#gameAreaNode = document.createElement('div');
        this.#gameAreaNode.classList.add('border', 'h-100', 'd-flex', 'flex-wrap');

        this.#removeCubeMethod = this.#removeCube.bind(this);
    }

    #addCube() {
        const cubeObj = new cube();

        let position = Math.floor(Math.random() * this.#cellQuantity);

        while (this.#fields[position]) {
            position++;

            if (position >= this.#cellQuantity - 1) {
                position = position - this.#cellQuantity;
            }
        }
        this.#fields[position] = cubeObj;

        this.#gameAreaNode.querySelector(`div[data-number='${position}']`).appendChild(cubeObj.getCube(position));
        this.#cubeQuantity++;
    }

    #addCubes(min, max) {
        const cubeQuantity = Math.floor(Math.random() * (max - min + 1)) + min;

        for (let i = 0; i < cubeQuantity; i++) {
            this.#addCube();
        }
    }

    #removeCube(event) {
        const target = event.target;

        if (!target.classList.contains('cube')) return;

        const number = target.dataset.number;
        const point = this.#fields[number].point;
        target.remove();
        this.#fields[number] = null;
        this.#cubeQuantity--;

        if (this.#cubeQuantity === 0) {
            this.#addCubes(1, 2);
        } else {
            this.#addCubes(0, 2);
        }

        this.#removeCubeCallBack(point);
    }

    getNode() {
        return this.#gameAreaNode;
    }

    prepareGameField() {
        let cellWidth = 50;
        let cellHeight = 50;

        const gameFieldWidth = this.#gameAreaNode.clientWidth;
        const gameFieldHeight = this.#gameAreaNode.clientHeight;

        const columnQuantity = Math.round(gameFieldWidth / cellWidth);
        const rowQuantity = Math.round(gameFieldHeight / cellHeight);
        this.#cellQuantity = columnQuantity * rowQuantity;

        this.#fields = new Array(this.#cellQuantity);
        this.#cubeQuantity = 0;

        cellWidth = gameFieldWidth / columnQuantity;
        cellHeight = gameFieldHeight / rowQuantity;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.#cellQuantity; i++) {
            const cell = document.createElement('div');
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;
            cell.classList.add('position-relative');
            cell.setAttribute('data-number', i);

            fragment.appendChild(cell);
        }

        this.#gameAreaNode.appendChild(fragment);

        this.#addCubes(1, 5);

        this.startGame();
    }

    startGame() {
        this.#gameAreaNode.addEventListener('click', this.#removeCubeMethod);
    }

    stopGame() {
        this.#gameAreaNode.removeEventListener('click', this.#removeCubeMethod);
    }

    clear() {
        this.#gameAreaNode.innerHTML = '';
        this.#fields = new Array(this.#cellQuantity);
    }
}