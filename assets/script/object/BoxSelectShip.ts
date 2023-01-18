import { _decorator, Component, Node, SpriteFrame, Sprite, Input } from 'cc';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('BoxSelectShip')
export class BoxSelectShip extends Component {
    // vị trí hàng
    private _i: number;
    public get i(): number {
        return this._i;
    }
    public set i(value: number) {
        this._i = value;
    }

    // vị trí cột
    private _j: number;
    public get j(): number {
        return this._j;
    }

    public set j(value: number) {
        this._j = value;
    }

    //spriteFrame
    @property(SpriteFrame)
    listSpriteFrame: SpriteFrame[] = []

    private _typeBox = Configs.DEFAUL_FRAME_BOX_SHIP;
    public get typeBox() {
        return this._typeBox;
    }
    public set typeBox(value) {
        this._typeBox = value;
    }

    private callBack: CallableFunction

    setUp(hang, cot, callback) {
        this.i = hang;
        this.j = cot;
        this.node.getComponent(Sprite).spriteFrame = this.listSpriteFrame[Configs.DEFAUL_FRAME_BOX_SHIP];
        this.callBack = callback;
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart() {
        this.callBack(this);
        this.onSetFrame();
    }

    onSetFrame(){
        this.node.getComponent(Sprite).spriteFrame = this.listSpriteFrame[this.typeBox];
    }

   
}


