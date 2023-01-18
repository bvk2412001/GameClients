
class Configs {
    // Name_Scene
    public static GAME_SCENE_NAME = "game"
    public static MENU_SCENE_NAME = "menu"
    public static GAME_SETUP_SCENE_NAME = "gameSetup"

    // state player ready
    public static STATE_PLAYER_READY = "UnReady"
    public static STATE_PLAYER_UNREADY = "Ready"

    //ComnumicateServer
    public static SERVER_HELLO_CLIENTS = "SERVER_HELLO_CLIENTS"
    public static CLIENT_REGISTER_NAME = "CLIENT_REGISTER_NAME"
    public static YOU_ARE_HOST = "YOU_ARE_HOST"
    public static ALL_CLIENTS_IN_ROOM = "ALL_CLIENTS_IN_ROOM"
    public static CLIENT_READY = "CLIENT_READY"
    public static CLIENT_UNREADY = "CLIENT_UNREADY"
    public static ALL_CLIENTS_ARE_READY = "ALL_CLIENTS_ARE_READY"
    public static CLIENTS_FIRE = "CLIENTS_FIRE"
    public static IS_HIT = "IS_HIT"
    public static NEXT_TURN = "NEXT_TURN"
    public static DIE_ALL_SHIP = "DIE_ALL_SHIP"
    public static WIN_GAME = "WIN_GAME"

    //Vi tri sprite boxShip
    public static DEFAUL_FRAME_BOX_SHIP = 0
    public static CHOISE_FRAME_BOX_SHIP = 1
    public static HIT_FRAME_BOX_SHIP = 2
    public static HIT_FAULT_FRAME_BOX_SHIP = 3

    // Vi tri sprite boxBullet
    public static DEFAUL_FRAME_BOX_BULLET = 0
    public static CHOISE_FRAME_BOX_BULLET = 1
    public static HIT_FRAME_BOX_BULLET = 2
    //số lương ship người chơi có
    public static TOTAL_SHIP = 5;
}

enum StateReady{
    READY,
    UNREADY
}


export{Configs, StateReady}
