import ExampleMobule from './module/ExampleMobule';
import HelloTitle from './module/HelloTitle';

let exampleMobule = new ExampleMobule();
new HelloTitle();

window.addEventListener('load', ()=>{
    exampleMobule.alert('Taro');
});