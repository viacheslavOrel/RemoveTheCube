import "./app.scss";
import game from './mod/removeTheCube';

const gameObj = new game();
gameObj.render(document.querySelector('#root'));