import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.page.html',
  styleUrls: ['./noti.page.scss'],
})
export class NotiPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
notifications=[
  {icon:'home-outline',header:'New Property Available',desc:'A new luxury apartment matching your preferences is now available in New York.',time:'2 min ago'},
   {icon:'pricetag-outline',header:'Price Drop Alert',desc:'The property you saved has reduced price by 15%. Check it now!',time:'1 hour ago'},
    {icon:'chatbox-ellipses-outline',header:'Message from Agent',desc:'John Smith replied to your inquiry about the villa in Miami.',time:'3 hours ago'},
     {icon:'notifications-outline',header:'Virtual Tour Scheduled',desc:'Your virtual tour for Sunset Apartment is scheduled for tomorrow at 3PM.',time:'5 hours ago'},
]
}
