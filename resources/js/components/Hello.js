export default class Hello {
    constructor() {
        this.target = document.getElementById('js-hello');
    }

    init() {
        if (!this.target) {
            return false;
        }
        
        this.target.addEventListener('click', () => {
            this.say();
        });
    }

    say() {
        console.log('こんにちは!');
    }
}