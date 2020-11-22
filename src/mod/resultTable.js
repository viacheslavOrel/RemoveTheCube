export default class ResultTable {
    constructor() {
        this.resultNode = document.createElement('ul');
        this.resultNode.classList.add('list-group', 'border', 'h-100');

        console.log(localStorage[ResultTable.localStorageKey]);

        if (localStorage[ResultTable.localStorageKey]) {
            this.results = JSON.parse(localStorage[ResultTable.localStorageKey]);

            this.results.forEach(item => this.resultNode.appendChild(this._renderResult(item)));
        } else {
            this.results = new Array();
        }
    }

    static localStorageKey = "RemoveTheCube";

    _renderResult(result) {
        const resultWrapper = document.createElement('li');
        resultWrapper.classList.add('list-group-item');
        resultWrapper.insertAdjacentHTML('afterbegin', `<p class='mb-0'>${result.name} - ${result.points}</p>`)

        return resultWrapper;
    }

    addResult(nameValue, pointsValue) {
        const result = {
            name: nameValue,
            points: pointsValue
        }

        this.results.push(result);
        localStorage.setItem(ResultTable.localStorageKey, JSON.stringify(this.results));

        this.resultNode.appendChild(this._renderResult(result));
    }
}