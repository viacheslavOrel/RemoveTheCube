;import $ from 'jquery'
import 'bootstrap';

export default class SaveResult {
    #formContainer;
    #point;
    #name;

    #saveCallBack;

    constructor(saveCallBack) {
        this.#saveCallBack = saveCallBack;

        this.#formContainer = this.#createFormContainer();

        const modalDialog = this.#createmodalDialog();
        this.#formContainer.appendChild(modalDialog);

        const modalContent = this.#createModalContent();
        modalContent.appendChild(this.#createModalHeader());
        modalContent.appendChild(this.#createModalBody());
        modalContent.appendChild(this.#createFooter());
        modalDialog.appendChild(modalContent);
    }

    #createFormContainer() {
        const node = document.createElement('div');
        node.classList.add('modal', 'fade');
        node.id = 'saveProgress';
        node.setAttribute('data-backdrop', 'static');
        node.setAttribute('data-keyboard', 'false');
        node.tabIndex = -1;
        node.setAttribute('role', 'dialog');
        node.setAttribute('aria-labelledby', 'saveProgressLabel');
        node.setAttribute('aria-hidden', 'true');

        return node;
    }

    #createmodalDialog() {
        const node = document.createElement('div');
        node.classList.add('modal-dialog', 'modal-dialog-centered');

        return node;
    }

    #createModalContent() {
        const node = document.createElement('div');
        node.classList.add('modal-content');

        return node;
    }

    #createModalHeader() {
        const node = document.createElement('div');
        node.classList.add('modal-header');
        node.insertAdjacentHTML('beforeend',`<h5 class="modal-title" id="staticBackdropLabel">SAVE PROGRESS</h5>`);

        const btn = document.createElement('button');
        btn.classList.add('close');
        btn.type = 'button';
        btn.setAttribute('data-dismiss', 'modal');
        btn.setAttribute('aria-label', 'Close');
        btn.insertAdjacentHTML('beforeend','<span aria-hidden="true">&times;</span>');
        node.appendChild(btn);

        return node;
    }

    #createFooter() {
        const node = document.createElement('div');
        node.classList.add('modal-footer');

        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary');
        btn.type = 'button';
        btn.innerText = 'SAVE';
        btn.addEventListener('click', this.#saveData.bind(this));
        node.appendChild(btn);

        return node;
    }

    #createModalBody() {
        const node = document.createElement('div');
        node.classList.add('modal-body');

        const form = document.createElement('form');
        node.appendChild(form);

        form.appendChild(this.#createPointsInput());
        form.appendChild(this.#createNameInput());

        return node;
    }

    #createPointsInput() {
        this.#point = document.createElement('input');
        this.#point.classList.add('form-control-plaintext');
        this.#point.id = 'staticPoint';
        this.#point.type = 'text';
        this.#point.setAttribute('readonly', 'readonly');

        const formGroupRow = document.createElement('div');
        formGroupRow.classList.add('form-group', 'row');

        formGroupRow.insertAdjacentHTML('afterbegin', '<label for="staticEmail" class="col-2 col-form-label">Your score:</label>')

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('col-10');
        inputContainer.appendChild(this.#point);

        formGroupRow.appendChild(inputContainer);

        return formGroupRow;
    }

    #createNameInput() {
        this.#name = document.createElement('input');
        this.#name.type = 'text';
        this.#name.id = 'inputName';
        this.#name.classList.add('form-control');

        const formGroupRow = document.createElement('div');
        formGroupRow.classList.add('form-group', 'row');
        formGroupRow.insertAdjacentHTML('afterbegin', '<label for="inputPassword" class="col-2 col-form-label">Name:</label>');

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('col-10');
        inputContainer.appendChild(this.#name);

        formGroupRow.appendChild(inputContainer);

        return formGroupRow;
    }

    #saveData() {
        this.#saveCallBack(this.#name.value, this.#point.value);
        $(this.#formContainer).modal('hide');
    }

    showForm(points) {
        this.#point.setAttribute('value', points);
        $(this.#formContainer).modal('show');
    }

    getNode() {
        return this.#formContainer;
    }
}