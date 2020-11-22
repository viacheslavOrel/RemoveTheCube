export default class Point {
    constructor() {
        this.pointValue = 0;

        this.pointNode = document.createElement('p');
        this.pointNode.classList.add('border', 'text-center', 'font-weight-bold');
        this.pointNode.innerHTML = this.pointValue;
    }

    getNode() {
        const pointWrapper = document.createElement('div');
        pointWrapper.classList.add('col-3');

        const label = document.createElement('p');
        label.classList.add('mb-0');
        label.innerHTML = 'Points';
        pointWrapper.appendChild(label);

        pointWrapper.appendChild(this.pointNode);

        return pointWrapper;
    }

    addPoint(quantity) {
        this.pointValue += quantity;
        this.pointNode.innerHTML = this.pointValue;
    }

    reset() {
        this.pointValue = 0;
        this.pointNode.innerHTML = this.pointValue;
    }
}