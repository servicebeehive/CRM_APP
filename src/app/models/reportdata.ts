export class ReportData {
 userid: number;
 startdate : Date;
 enddate : Date;
 status : string;
 taskassignee : string;
 reporttypecode : string;
 constructor() {
     this.userid = 0;
     this.startdate = new Date('');
     this.enddate = new Date('');
     this.status = '';
     this.taskassignee = '';
     this.reporttypecode = '';
    }  
}