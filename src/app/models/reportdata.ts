export class ReportData {
 userid: number;
 startdate: Date;
 enddate: Date;
 status: string;
 taskassignee: string;
 reporttypecode: string;
 taskid: number;
 taskdate: Date;
 customername: string;
 location: string;
 phone: number;
 constructor() {
     this.userid = 0;
     this.startdate = new Date('');
     this.enddate = new Date('');
     this.status = '';
     this.taskassignee = '';
     this.reporttypecode = '';
     this.taskid = 0;
     this.taskdate = new Date('');
     this.customername = '';
     this.location = '';
     this.phone = 0;
    }
}
