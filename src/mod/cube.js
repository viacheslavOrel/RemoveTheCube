import { head } from "lodash";

export default class Cube {
    constructor() {
        const cubeType = Math.floor(Math.random() * 4) + 1;
        this.point = cubeType * cubeType;
        this.cell = document.createElement('div');
        this.cell.classList.add('cube', `cube-${cubeType}`);
    }

    getCube(number) {
        this.cell.setAttribute('data-number', number);

        return this.cell;
    }
}