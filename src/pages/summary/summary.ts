
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Provider for calculating the summary of the estimate
import { CalcProvider } from '../../providers/Data/calculate-estimate';

// Cordova plugin
import { EmailComposer } from '@ionic-native/email-composer';

//For alert messages
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})

export class SummaryPage {

  // Estimate creation variables
  roomName: string;
  wallHieght: number;
  roomLength: number;
  roomWidth: number;
  paintUsed: string;
  totalSquareFeet: number;
  totalPaintCost: string;
  sqFtPerHr: number;
  laborPerHr: number;
  totalLaborCost: string;
  totalCost: string;
  roomPhoto: any;

  // Email form input variables intialized
  email = {
    firstName: '',
    lastName: '',
    emailAddress: '',
  }

  // Email body HTML
  emailBody = `<p>Dear {{email.firstName}} {{email.lastName}},<br><br>
  Thank you for allowing us the opportunity to bid on your upcoming painting project.<br><br>
  Here is your estimate: <br><br></p>

  <p>Room Name: {{roomName}}</p>
  <p>Paint Used: {{paintUsed}}</p>
  <p>Paint Cost: {{totalPaintCost}}</p>
  <p>Labor Cost: {{totalLaborCost}}<br><br></p>
  
  <p>Total Cost: {{totalCost}}<br><br></p>

  <p>We look forward to hearing from you.</p>
  <p>Thank you, <br>
  The Painting Company</p>`;


  constructor(public navCtrl: NavController, public navParams: NavParams, public calcService: CalcProvider, public emailComposer: EmailComposer, private alertCtrl: AlertController) {
    
    // Gets form data from the Estimate page
    this.roomName = navParams.data.roomName; 
    this.wallHieght = navParams.data.wallHieght;
    this.roomLength = navParams.data.roomLength;
    this.roomWidth = navParams.data.roomWidth;
    this.paintUsed = navParams.data.paintUsed;

    this.sqFtPerHr = navParams.data.sqFtPerHr;
    this.laborPerHr = navParams.data.laborPerHr;

    this.roomPhoto = navParams.data.roomPhoto // Room photo
    
    // Gets estimate calculations from the CalcProvider service
    this.totalPaintCost = this.getTotalPaintCost()
    this.totalLaborCost = this.getTotalLaborCost()
    this.totalCost = this.getTotalCost()

  }

  // Functions used to call calculations from the CalcProvider service

  getTotalPaintCost() {
    return this.totalPaintCost = this.calcService.getTotalPaintCost(this.paintUsed, this.wallHieght, this.roomLength, this.roomWidth);
  }

  getTotalLaborCost() {
    return this.totalLaborCost = this.calcService.getTotalLaborCost(this.sqFtPerHr, this.laborPerHr, this.wallHieght, this.roomLength, this.roomWidth);
  }

  getTotalCost() {
    return this.totalCost = this.calcService.getTotalProjectCost()
  }

  // For logging client information form inputs
  logForm() {
    console.log('Client information form has been submittied:', this.email)
  }

  // Cordova email plugin
  sendEstimateEmail() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        console.log('Cordova is available to send an email.');

        let email = {
          to: this.email.emailAddress,
          cc: [],
          bcc: [],
          attachments: [this.roomPhoto], // Room photo
          subject: 'Painting Estimate',
          body: this.emailBody,
          isHtml: true
        };
   
        console.log('Email to send:', email);
        
        // Send an email message using default options
        this.emailComposer.open(email);
        this.emailSentAlert();
      } 
    }).catch((error) => {
      console.log('Email to send:', this.emailBody);
      this.emailNotSentAlert();
      console.error('Cordova is not available to send an email. Error: ', error)});
    }

  // Alert for email successfully being sent
  emailSentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email Sent',
      subTitle: 'Your email was successfully sent.',
      buttons: ['Ok']
    });
    alert.present();
  }

  // Alert for email unable to be sent
  emailNotSentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email Not Sent',
      subTitle: 'Your email was unable to be sent because the email composer is currently unavailable.',
      buttons: ['Ok']
    });
    alert.present();
  }
}


