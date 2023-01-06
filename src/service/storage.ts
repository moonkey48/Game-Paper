import {getDatabase, onValue, ref, set } from 'firebase/database';
import { DatabaseT } from '../types/databaseTypes';
import { UserBasicT, UserT } from '../types/userTypes';

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
  setUser(ownerId:string,roomId:string,userId:string, user:UserT) {
    set(ref(this.db, `users/${ownerId}/rooms/${roomId}/userList/${userId}`), user);
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
  setNewLoginUser(user:UserBasicT){
    set(ref(this.db, `users/${user.uid}/displayname`), user.displayName);
    set(ref(this.db, `users/${user.uid}/email`), user.email);
    set(ref(this.db, `users/${user.uid}/uid`), user.uid);
  }
  getUserExist(uid:string, callback:(isExist:boolean)=>void){
    const roomRef = ref(this.db, `/users/${uid}`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      callback(data?true:false);
    });
  }
}
export default Database;