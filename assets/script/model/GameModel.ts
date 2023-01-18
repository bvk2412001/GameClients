import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property(Node)
    uiNode: Node;
    @property(Label)
    levelLb:Label;

    gameScore=0;
    gameLevel;
    
    start() {

    }
}


