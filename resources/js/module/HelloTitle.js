import $ from 'jquery';
export default class HelloTitle {
    constructor() {
        this.$title = $('#js-title');
    }

    bindEvents() {
        $(window).on('load', ()=>{
            this.$title.text('Hello Taro!');
        });
    }
}