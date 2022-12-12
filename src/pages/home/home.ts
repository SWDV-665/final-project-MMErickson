import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// For passing form data to the Summary page
import { SummaryPage } from '../../pages/summary/summary';

// Provider
import { CalcProvider } from '../../providers/Data/calculate-estimate';

// Cordova camera plugin
import { Camera, CameraOptions } from '@ionic-native/camera';

//For alert messages
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  summaryPage : any;

  roomPhoto: any;

  // Initialization of form data
  estimate = {
    roomName: '',
    wallHieght: 0, 
    roomLength: 0,
    roomWidth: 0,
    paintUsed: '',
    sqFtPerHr: 0,
    laborPerHr: 0
  }

  constructor(public navCtrl: NavController, public calcProvider: CalcProvider, private camera: Camera, public alertCtrl: AlertController){ 
  }

  logForm() {
    console.log('Estimate form has been submitted:', this.estimate)
  }
  
  // Cordova camera plugin function which handles the taking of a photo
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.roomPhoto = base64Image;
     this.photoTakenAlert(); // Alert to notify the user their photo was added
    }, (err) => {
     // Handle error
     console.error('Cordova is not available to take a photo. Error: ', err);
     this.photoNotTakenAlert(); // Alert to notify the user they are unable to add a photo
    });
  }

  // Alert for photo successfully being taken
  photoTakenAlert() {
    let alert = this.alertCtrl.create({
      title: 'Photo Added',
      subTitle: 'Your have successfully taken a photo.',
      buttons: ['Ok']
    });
    alert.present();
  }

  // Alert for photo unable to be taken
  photoNotTakenAlert() {
    let alert = this.alertCtrl.create({
      title: 'Camera Not Available',
      subTitle: 'You are currenlty unable to take a photo because the camera is unavailable.',
      buttons: ['Ok']
    });
    alert.present();
  }

  // When clicking the button to create an estimate, it navigates the user to the
  // Summary page and passes form data to that page
  goToSummary() {
    console.log('Creating an estimate summary for: ' + this.estimate.roomName);
    this.navCtrl.push(SummaryPage, {      
      roomName: this.estimate.roomName,
      wallHieght: this.estimate.wallHieght,
      roomLength: this.estimate.roomLength,
      roomWidth: this.estimate.roomWidth,
      paintUsed: this.estimate.paintUsed,
      sqFtPerHr: this.estimate.sqFtPerHr,
      laborPerHr: this.estimate.laborPerHr,
      roomPhoto: this.roomPhoto // Passes photo taken 
    });
  }
}
