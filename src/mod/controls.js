export default class Controls {
    static START_TEXT = 'START';
    static PAUSE_TEXT = 'PAUSE';

    #startStopBtn;
    #resetBtn;

    #startStopCallBack;
    #resetCallBack;

    constructor(startStopCallBack, resetCallBack) {
        this.#startStopCallBack = startStopCallBack;
        this.#resetCallBack = resetCallBack;

        this.#startStopBtn = this.#createStartStopBtn();
        this.#startStopBtn.addEventListener('click', this.#startStopClick.bind(this));

        this.#resetBtn = this.#createResetBtn();
        this.#resetBtn.addEventListener('click', this.#reset.bind(this));
    }

    #createStartStopBtn() {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary', 'col');
        btn.setAttribute('type', 'button');
        btn.innerText = Controls.START_TEXT;

        return btn;
    }

    #createResetBtn() {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-danger', 'col');
        btn.setAttribute('type', 'button');
        btn.innerText = 'NEW GAME';

        return btn;
    }

    #startStopClick() {
        if (this.#startStopBtn.innerText === Controls.START_TEXT) {
            this.#startStopBtn.innerText = Controls.PAUSE_TEXT;

            this.#resetBtn.setAttribute('disabled', 'disabled');

            this.#startStopCallBack(Controls.START_TEXT);
        } else {
            this.#startStopBtn.innerText = Controls.START_TEXT;

            this.#resetBtn.removeAttribute('disabled');

            this.#startStopCallBack(Controls.PAUSE_TEXT);
        }
    }

    #reset() {
        this.#startStopBtn.innerText = Controls.START_TEXT;
        this.#startStopBtn.removeAttribute('disabled');
        this.#resetCallBack();
    }

    getNode() {
        const controlsNode = document.createElement('div');
        controlsNode.classList.add('col-4', 'btn-group');
        controlsNode.setAttribute('role', 'group');

        controlsNode.appendChild(this.#startStopBtn);
        controlsNode.appendChild(this.#resetBtn);

        return controlsNode;
    }

    endGame() {
        this.#startStopBtn.setAttribute('disabled', 'disabled');
        this.#resetBtn.removeAttribute('disabled');
    }
}