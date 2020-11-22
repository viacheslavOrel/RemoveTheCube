export default class Timer {
    constructor(time, endCallBack) {
        this.startMinute = Math.floor(time / 60);
        this.startSeconds = time % 60;
        
        this.endCallBack = endCallBack;

        this.minute = this.startMinute;
        this.seconds = this.startSeconds;

        this.minuteNode = document.createElement('span');
        this.minuteNode.innerText = this.minute;

        this.secondNode = document.createElement('span');
        this.secondNode.innerText = this.seconds.toString().padStart(2, '0');
    }

    getNode() {
        const timerNode = document.createElement('div');
        timerNode.classList.add('col-3');

        const label = document.createElement('p');
        label.classList.add('mb-0');
        label.innerHTML = 'Time left';
        timerNode.appendChild(label);

        const time = document.createElement('p');
        time.classList.add('border', 'text-center');
        time.appendChild(this.minuteNode);

        const delimiter = document.createElement('span');
        delimiter.innerHTML = ':';
        time.appendChild(delimiter);
        
        time.appendChild(this.secondNode);
        
        timerNode.appendChild(time);

        return timerNode;
    }

    start() {
        const nextTimeValue = this.nextTimeValue.bind(this);
        this.counter = setInterval(nextTimeValue, 1000);
    }

    stop() {
        clearInterval(this.counter);
    }

    reset() {
        this.minute = this.startMinute;
        this.seconds = this.startSeconds;
        this.minuteNode.innerText = this.minute;
        this.secondNode.innerText = this.seconds.toString().padStart(2, '0');
    }
    
    nextTimeValue() {
        if (this.seconds === 0) {
            if (this.minute === 0) {
                this.stop();
                this.endCallBack();
            } else {
                this.minute--;
                this.seconds = 59;
    
                this.minuteNode.innerText = this.minute;
                this.secondNode.innerText = this.seconds;
            }
        } else {
            this.seconds--;
            this.secondNode.innerHTML = this.seconds.toString().padStart(2, '0');
        }
    }
}