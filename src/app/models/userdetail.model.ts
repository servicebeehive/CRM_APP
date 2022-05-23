export class UserDetail {
  userid: number;
  username: string;
  fullname: string;
  usertoken: string;
  msg: string;
  pwd: string;
  active: string;
  operationtype: string;

  constructor() {
    this.userid = 0;
    this.username = '';
    this.fullname = '';
    this.usertoken = '';
    this.msg = '';
    this.pwd = '';
    this.active = '';
    this.operationtype = '';
  }
}
