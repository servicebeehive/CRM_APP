import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
profileImage : string | null =null;

  constructor(private actionSheetCtrl: ActionSheetController, private fb:FormBuilder) { }

  ngOnInit() {
  }

  editProfileForm = this.fb.group({
    fullName:['',[Validators.required]],
    email:['',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    phone:['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
    address:['',[Validators.required]],
    city:['',[Validators.required]],
    country:['',[Validators.required]],
    bio:['']
  });

 onlyDigits(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
}

async openActionSheet() {
 const actionSheet = await this.actionSheetCtrl.create({
  header: 'Change Profile Picture',
  cssClass:'profile-action-sheet',
  buttons:[
    {
      text:'Take Photo',
      icon:'camera-outline',
      handler:()=>{
       this.takePhoto();
      },
    },
    {
      text:'Choose from Gallery',
      icon:'image-outline',
      handler:()=>{
        this.openGallery();
      },
    },
     {
          text: 'Remove Photo',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.profileImage = null;
          },
        }
  ]
 });
 await actionSheet.present();
}

async takePhoto(){
  const image = await Camera.getPhoto({
    quality:90,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera,
  });
  this.profileImage=image.dataUrl!;
}

async openGallery(){
  const image=await Camera.getPhoto({
    quality:90,
    resultType:CameraResultType.DataUrl,
    source:CameraSource.Photos,
  });
  this.profileImage=image.dataUrl;
}
submit(){

}
}
