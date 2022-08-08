export class UserDetail {
  userid: number;
  username: string;
  fullname: string;
  usertoken: string;
  msg: string;
  pwd: string;
  active: string;
  operationtype: string;
  usertype: string;
  phone: number;
  email: string;
  enabled: string;
  constructor() {
    this.userid = 0;
    this.username = '';
    this.fullname = '';
    this.usertoken = '';
    this.msg = '';
    this.pwd = '';
    this.active = '';
    this.operationtype = '';
    this.usertype = '';
    this.phone = 0;
    this.email ='';
    this.enabled = '';
  }
}
