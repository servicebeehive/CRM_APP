import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.page.html',
  styleUrls: ['./lead.page.scss'],
})
export class LeadPage implements OnInit {
  ngOnInit(){}
  selectedSegment: string='personal';
  constructor(private fb: FormBuilder, private route:Router, private popoverCtrl:PopoverController) {}
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
      minBudget: [''],
      maxBudget:[''],
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
  ];

  onlyDigits(event:any,fieldName:string){
    if(fieldName === 'contactNumber'){
      const input = event.target;
      input.value = input.value.replace(/[^0-9]/g,'').slice(0-10);
    }
  }
  user(){
    this.route.navigate(['/pages/users']);
  }
  filter(){
    this.route.navigate(['/pages/filter']);
  }
  reset(){
    this.leadForm.reset();
  }
  logout(){
  this.route.navigate(['/pages/login']);
}
}
