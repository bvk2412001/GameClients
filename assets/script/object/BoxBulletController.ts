import { _decorator, Component, Node, SpriteFrame, Input, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxBulletController')
export class BoxBulletController extends Component {
    @property(SpriteFrame)
    private listSprifrace: SpriteFrame[] = [];

    // hang thu i cua box
    private _i: number;
    public get i(): number {
        return this._i;
    }
    public set i(value: number) {
        this._i = value;
    }
    // hang thu j cua box
    private _j: number;
    public get j(): number {
        return this._j;
    }
    public set j(value: number) {
        this._j = value;
    }
    
    private _typeBox: number;
    public get typeBox(): number {
        return this._typeBox;
    }
    public set typeBox(value: number) {
        this._typeBox = value;
    }
    private callBack: CallableFunction
    start() {

    }

    setUp(hang , cot, callBack){
        this.i = hang;
        this.j = cot;
        this.callBack = callBack;

        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    private onTouchStart(){
        this.callBack(this);
        this.node.getComponent(Sprite).spriteFrame = this.listSprifrace[this.typeBox];
    }

    update(deltaTime: number) {
        
    }
}


