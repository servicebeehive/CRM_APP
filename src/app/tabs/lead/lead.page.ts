import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.page.html',
  styleUrls: ['./lead.page.scss'],
})
export class LeadPage implements OnInit {
  ngOnInit(){ }
  constructor(private fb: FormBuilder, private route:Router) {}
  leadForm = this.fb.group({
      leadName: [''],
      contactNumber: [''],
      emailId: [''],
      location: [''],
      leadSource: [''],
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
    { icon: 'person-outline', label: 'Lead Name', name: 'leadName' },
    { icon: 'call-outline', label: 'Contact Number', name: 'contactNumber' },
    { icon: 'mail-outline', label: 'Email Id', name: 'emailId' },
    { icon: 'location-outline', label: 'Location', name: 'location' },
    { icon: 'disc-outline', label: 'Lead Source', name: 'leadSource' },
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
