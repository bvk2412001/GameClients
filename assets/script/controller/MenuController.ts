import { _decorator, Component, Node, EditBox } from 'cc';
import { Configs } from '../utils/Configs';
import { ClientsSocket } from './SoketIO/ClientsSocket';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {

    @property(Node)
    private uiWaiting: Node;
    @property(Node)
    private uiInputName: Node;

    @property(EditBox)
    editBox: EditBox;

    private _isShowUIWaiting: boolean = false;

    private _isShowUIInputName: boolean = false;

    //get set isShowuiWating
    public get isShowUIWaiting() {
        return this._isShowUIWaiting;
    }

    public set isShowUIWaiting(value: boolean) {
        this._isShowUIWaiting = value;
    }

    //get set isShowuiInputName
    public get isShowUIInputName(): boolean {
        return this._isShowUIInputName;
    }
    public set isShowUIInputName(value: boolean) {
        this._isShowUIInputName = value;
    }

    //show ui watting
    public showUiWaiting() {
        if (!this._isShowUIWaiting)
            this.uiWaiting.active = false;
        else {
            this.uiWaiting.active = true;
        }
    }

    //show ui input name
    public showUiInputName() {
        if (!this._isShowUIInputName) {
            this.uiInputName.active = false;
        }
        else {
            this.uiInputName.active = true;
        }
    }

    start() {

    }

    update(deltaTime: number) {

    }

    onJoinGame(){
        ClientsSocket.ins.ConnectServer(this)
    }

    onAcceptName() {
        const dataTranfer = {
            data: {
                playerName: this.editBox.string

            }
        }
        ClientsSocket.ins.socket.emit(Configs.CLIENT_REGISTER_NAME, dataTranfer)
    }
}


