import { _decorator, Component, Node, Label, Prefab, instantiate, SpriteFrame, Button, Sprite } from 'cc';
import { GameModel } from '../model/GameModel';
import { BoxBulletController } from '../object/BoxBulletController';
import { BoxSelectShip } from '../object/BoxSelectShip';
import { Configs, StateReady } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
import { Utils } from '../utils/Utils';
import { ClientsSocket } from './SoketIO/ClientsSocket';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Label)
    private lblName: Label

    @property(Label)
    private lblNumberShip: Label

    @property(Prefab)
    private boxSelectShip: Prefab

    @property(Prefab)
    private boxBullet

    @property(Node)
    private map: Node

    @property(Label)
    private lblReady: Label

    @property(Node)
    private btnReady: Node

    @property(Node)
    private mapBullet: Node



    private listBoxBullet: Node[] = []
    private listBoxShip: Node[] = []
    private stateReady = StateReady.UNREADY
    private totalShip = Configs.TOTAL_SHIP;
    private shipExists = 0
    private isTurn: boolean = false;
    start() {
        this.lblName.string = ClientsSocket.ins.yourName;
        this.createBox();
        this.onShowTitleNumberShip();
        ClientsSocket.ins.onGameControllerListenFromServer(this);
        ClientsSocket.ins.socket.on("khoa", (data) => {
            console.log(data);
        })
    }
    private createBox() {
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                let box = instantiate(this.boxSelectShip);
                box.getComponent(BoxSelectShip).setUp(i, j, (boxSelectShip: BoxSelectShip) => {
                    this.onClickBoxShip(boxSelectShip)
                })
                this.map.addChild(box)
                this.listBoxShip.push(box)
            }

        }
    }

    private createBoxBullet() {
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                let box = instantiate(this.boxBullet);
                box.getComponent(BoxBulletController).setUp(i, j, (boxBullet: BoxBulletController) => {
                    this.onClickBoxBullet(boxBullet);
                })
                this.mapBullet.addChild(box);
                this.listBoxBullet.push(box);
            }

        }
    }
    onClickBoxBullet(boxBullet: BoxBulletController) {
        if (boxBullet.typeBox === Configs.DEFAUL_FRAME_BOX_BULLET) {
            boxBullet.typeBox = Configs.CHOISE_FRAME_BOX_BULLET;
            const dataTranfer = {
                data: {
                    playerName: ClientsSocket.ins.yourName,
                    roomName: ClientsSocket.ins.roomName,
                    i: boxBullet.i,
                    j: boxBullet.j

                }
            }
            ClientsSocket.ins.socket.emit(Configs.CLIENTS_FIRE, dataTranfer)
        }
    }

    private onShowTitleNumberShip() {
        this.lblNumberShip.string = this.totalShip + "/5";
    }

    onClickBoxShip(boxSelectShip: BoxSelectShip) {
        if (boxSelectShip.typeBox == Configs.DEFAUL_FRAME_BOX_SHIP) {
            if (this.totalShip > 0) {
                this.totalShip--;
                console.log(this.totalShip);
                boxSelectShip.typeBox = Configs.CHOISE_FRAME_BOX_SHIP;
            }
        }
        else {
            if (boxSelectShip.typeBox == Configs.CHOISE_FRAME_BOX_SHIP) {
                this.totalShip++;
                boxSelectShip.typeBox = Configs.DEFAUL_FRAME_BOX_SHIP;
            }
        }

        this.onShowTitleNumberShip();
    }

    checkBoxBuletIsTrue(data) {
        let hit = false;
        this.listBoxShip.forEach(element => {
            let controller = element.getComponent(BoxSelectShip);
            if (controller.i == data.data.i && controller.j == data.data.j) {
                hit = true;
                controller.typeBox = Configs.HIT_FRAME_BOX_SHIP;
                controller.onSetFrame();
                const dataTranfer ={
                    data: {
                        playerName:data.data.playerName,
                        roomName:data.data.roomName,
                        i:data.data.i,
                        j: data.data.j,
                        isHit:true
                    }
                }
                ClientsSocket.ins.socket.emit(Configs.IS_HIT, dataTranfer)
                this.shipExists++;
                if(this.shipExists == 5){
                    const dataTranfer ={
                        data: {
                            playerName:ClientsSocket.ins.yourName,
                            roomName:data.data.roomName,
                            isHit:true
                        }
                    }
                    ClientsSocket.ins.socket(Configs.DIE_ALL_SHIP
                    )
                }
                return;
            }
        });

        if(hit == false){
            const dataTranfer ={
                data: {
                    playerName:data.data.playerName,
                    roomName:data.data.roomName,
                    i:data.data.i,
                    j: data.data.j,
                    isHit:false
                }
            }
            ClientsSocket.ins.socket.emit(Configs.IS_HIT, dataTranfer)
        }


    }

    onChangeState(state) {
        this.lblReady.string = state
    }


    onShowMapBullet() {
        this.btnReady.active = false;
        this.mapBullet.active = true;
        this.createBoxBullet();
    }

    onReady() {
        if (this.stateReady == StateReady.UNREADY) {
            this.stateReady = StateReady.READY
            const dataTranfer = {
                data: {
                    roomName: ClientsSocket.ins.roomName,
                    playerName: ClientsSocket.ins.yourName
                }
            }
            ClientsSocket.ins.socket.emit(Configs.CLIENT_READY, dataTranfer)
        }
        else {
            this.stateReady = StateReady.UNREADY
            const dataTranfer = {
                data: {
                    roomName: ClientsSocket.ins.roomName,
                    playerName: ClientsSocket.ins.yourName
                }
            }
            ClientsSocket.ins.socket.emit(Configs.CLIENT_UNREADY, dataTranfer)
        }
    }

    // setFrameHitBullet(data){
    //     this.listBoxBullet.forEach(element => {
    //         if(data.data.isHit ==  true)
    //     }); 
    // }
}


