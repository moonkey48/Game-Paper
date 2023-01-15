export type RoomGameType = 'count' | 'table';
export type RoomInfoT = {
    roomGameType:RoomGameType;
    roomId:string;
    roomName:string;
    users:any;
}
const test_roomInfo:RoomInfoT ={
    roomGameType:'table',
    roomId:'test',
    roomName: 'test_room',
    users:[
        {name:'austin', 
        total:0, 
        rounds:[
            {
                value:10,
                total:20
            },
            {
                value:10,
                total:20
            },
        ]}
    ]
}