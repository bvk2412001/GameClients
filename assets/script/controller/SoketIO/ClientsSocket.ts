import { _decorator, Component, Node, director, Game, game } from 'cc';
import { Configs } from '../../utils/Configs';
const { ccclass, property } = _decorator;
import { GameController } from '../GameController';
import { MenuController } from '../MenuController';

@ccclass('ClientsSocket')
export class ClientsSocket extends Component {
    public static URL = 'http://localhost:3000/';
    public socket;
    public static ins: ClientsSocket;
    public yourName: string | null = null;
    public roomName: string | null = null;

    start() {
        // add node là root node
        if (ClientsSocket.ins == null) {
            ClientsSocket.ins = this;
            director.addPersistRootNode(this.node);
        }
    }

    public ConnectServer(menuController: MenuController) {
        let play = (socketio) => {
            //kết nối sever
            this.socket = socketio.connect(ClientsSocket.URL);
            this.onMenuListenFromServer(menuController)
        }
        //
        if (typeof io === 'undefined') {
            play(require("socket.io"));
        }
        else {
            play(io);
        }
    }

    public onMenuListenFromServer(menuController: MenuController) {
        //nhận thông báo kết nối sever thành công
        this.socket.on(Configs.SERVER_HELLO_CLIENTS, (data) => {
            menuController.isShowUIInputName = true;
            menuController.showUiInputName();
        })


        //nhận thông báo là host
        this.socket.on(Configs.YOU_ARE_HOST, (dataTranfer) => {
            menuController.isShowUIInputName = false;
            menuController.showUiInputName();
            menuController.isShowUIWaiting = true;
            menuController.showUiWaiting();

            ClientsSocket.ins.yourName = dataTranfer.data.hostName;
            ClientsSocket.ins.roomName = dataTranfer.data.roomName;
        })

        //nhận thông báo đã đủ người chơi
        this.socket.on(Configs.ALL_CLIENTS_IN_ROOM, (dataTranfer) => {
            if (ClientsSocket.ins.yourName == null) {
                ClientsSocket.ins.yourName = dataTranfer.data.playerName;
                ClientsSocket.ins.roomName = dataTranfer.data.roomName;
            }

            director.loadScene(Configs.GAME_SCENE_NAME);
        })


    }

    public onGameControllerListenFromServer(gameController: GameController) {


        //nhận thông báo người chơi sẵn sàng
        this.socket.on(Configs.CLIENT_READY, (data) => {
            if (data.data.playerName == ClientsSocket.ins.yourName) {
                gameController.onChangeState(Configs.STATE_PLAYER_READY)
            }
        })

        //nhận thông báo người chơi hủy sẵn sàng
        this.socket.on(Configs.CLIENT_UNREADY, (data) => {
            if (data.data.playerName == ClientsSocket.ins.yourName) {
                gameController.onChangeState(Configs.STATE_PLAYER_UNREADY)
            }
        })

        //nhận thông báo tất cả người chơi sẵn sàng
        this.socket.on(Configs.ALL_CLIENTS_ARE_READY, (data) => {
            gameController.onShowMapBullet();
        })

        this.socket.on(Configs.CLIENTS_FIRE, (data) =>{
            if(data.data.playerName != this.yourName)
                gameController.checkBoxBuletIsTrue(data);
        })

        this.socket.on(Configs.IS_HIT, (data)=>{
            if(data.data.playerName == this.yourName){
                 gameController.setFrameHitBullet(data);
            }
            else{
                gameController.setFrameHitShip(data)
            }
        })
        this.socket.on(Configs.NEXT_TURN, (data)=>{
            if(data.data.playerName != this.yourName){
                gameController.isTurn = true;
            }
            else{
                gameController.isTurn = false;
            }
        })

        this.socket.on(Configs.WIN_GAME, (data)=>{
            console.log(data.data.playerName, ClientsSocket.ins.yourName)
            if(data.data.playerName == ClientsSocket.ins.yourName){
                gameController.uiWin.active = true;
                gameController.lblWin.string = "YOU LOSE"
            }
            else{
                gameController.uiWin.active = true;
                gameController.lblWin.string = "YOU WIN"
            }
        })
    }
}


