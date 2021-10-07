export default class ExampleModule {
	constructor() {
		this.text = 'Hi ';
	}

	alert(name = 'hoge') {
		console.log(this.text + name);
	}
}
