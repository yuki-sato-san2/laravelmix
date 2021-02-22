import $ from 'jquery';
export default class HelloTitle {
    constructor() {
        this.$title = $('#js-title');
        this.bindEvents();
    }

    bindEvents() {
        $(window).on('load', ()=>{
            this.$title.text('Hello Taro!');
        });
    }
}