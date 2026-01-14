import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lead',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
  ngOnInit(){}
 constructor(){}
 leads = [
  {
    title: '#740',
    color: 'purple',
    status: 'FollowUp',
    priority:'Urgent',
    customer: 'Sanjeev Negi',
    for: 'Sale'
  },
  {
    title: '#741',
    color: 'limegreen',
    status: 'New',
     priority:'Medium',
    customer: 'Chittaranjan Dasgupta',
    for: 'Rent'
  },
  {
    title: '#742',
    color: 'limegreen',
    status: 'Converted',
     priority:'low',
    customer: 'Chittaranjan Dasgupta',
    for: 'Rent'
  }
];
}
