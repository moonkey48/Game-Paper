import { RoomGameType } from './../types/roomTypes';
import { MemberT, UserCountListT, UserT } from './../types/userTypes';
import {getDatabase, onValue, ref, set } from 'firebase/database';
import { DatabaseT } from '../types/databaseTypes';
import { OwnerT } from '../types/userTypes';

class Database implements DatabaseT {
  private db:any;
  constructor(app:any){
    this.db = getDatabase(app)
  }

  /**
   * @param ownerId 로그인된 사용자 이름
   * @param roomId 방 ID
   * @param userId 변경하길 원하는 정보가 포함된 사용자 ID
   * @param user 변경된 user 정보
   */
  setUserCount(ownerId:string,roomId:string,userId:string, user:MemberT<number>) {
    set(ref(this.db, `users/${ownerId}/rooms/${roomId}/userList/${userId}`), user);
  }

  /**
   * 이후 createOrUpdateRoom으로 변경 필요
   * @param ownerId 
   * @param roomId 
   * @param users 
   */
  createRoom(ownerId:string,roomId:string,users:UserCountListT, roomType:RoomGameType = 'count',callback:()=>void, roomName?:string) {
    set(ref(this.db, `users/${ownerId}/rooms/${roomId}/`), {
      roomId,
      roomGameType: roomType,
      roomName: roomName || 'default',
    });
    Object.keys(users).forEach(key=> {
      set(ref(this.db, `users/${ownerId}/rooms/${roomId}/userList/${key}`), users[key]);
    })
    callback();
  }

  /**
   * 
   * @param ownerId 로그인된 사용자 이름
   * @param roomId 방 ID
   * @param callback data를 받은 후 수행할 작업 (setState 등)
   */
  getRoomInfo(ownerId:string,roomId:string,callback:(data:any)=>void){
    const roomRef = ref(this.db, `/users/${ownerId}/rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      callback(data)
    });
  }

  getOwnerInfo(uid:string, callback:(data: UserT | boolean)=>void){
    const roomRef = ref(this.db, `/users/${uid}`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      callback(data ? data : false);
    });
  }

  setNewLoginUser(user:OwnerT){
    set(ref(this.db, `users/${user.uid}/displayname`), user.displayName);
    set(ref(this.db, `users/${user.uid}/email`), user.email);
    set(ref(this.db, `users/${user.uid}/uid`), user.uid);
  }
  
}
export default Database;