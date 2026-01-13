import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.page.html',
  styleUrls: ['./lead.page.scss'],
})
export class LeadPage implements OnInit {
  ngOnInit(){}
  selectedSegment: string='personal';
  constructor(private fb: FormBuilder, private route:Router) {}
  leadForm = this.fb.group({
      leadName: ['',[Validators.required]],
      contactNumber: ['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      emailId: ['',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      location: ['',[Validators.required]],
      leadSource: ['',[Validators.required]],
      leadFor: [''],
      propertyType: [''],
      inventory: [''],
      inventorySize: [''],
      budgetRange: [''],
      locationPref: [''],
      amenities: [''],
      remarks: ['']
    });
    
  basicFields = [
    { icon: 'person-outline', label: 'Lead Name', name: 'leadName', required:true },
    { icon: 'call-outline', label: 'Contact Number', name: 'contactNumber', required:true },
    { icon: 'mail-outline', label: 'Email Id', name: 'emailId', required:true },
    { icon: 'location-outline', label: 'Location', name: 'location', required:true },
    { icon: 'disc-outline', label: 'Lead Source', name: 'leadSource', required:true },
    { icon: '',label:'', name:'remarks',required:''}
  ];

  propertyFields = [
    { icon: 'help-circle-outline', label: 'Lead For - Sale, Rent', name: 'leadFor' },
    { icon: 'business-outline', label: 'Property Type', name: 'propertyType' },
    { icon: 'pricetags-outline', label: 'Inventory i.e. 1 BHK', name: 'inventory' },
    { icon: 'grid-outline', label: 'Inventory Size', name: 'inventorySize' },
    { icon: 'cash-outline', label: 'Budget Range', name: 'budgetRange' },
    { icon: 'navigate-circle-outline', label: 'Location Preference', name: 'locationPref' },
    { icon: 'list-outline', label: 'Amenities', name: 'amenities' },
  ];
  user(){
    this.route.navigate(['/pages/users']);
  }
  filter(){
    this.route.navigate(['/pages/filter']);
  }
  logout(){
  this.route.navigate(['/pages/login']);
}
}
