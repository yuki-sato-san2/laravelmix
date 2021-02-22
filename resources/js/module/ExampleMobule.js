export default class ExampleModule {
    constructor() {
        this.text = 'Hi ';
    }

    alert(name = 'hoge') {
        alert(this.text + name);
    }
}