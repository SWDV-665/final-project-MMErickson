webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Data_calculate_estimate__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Provider for calculating the summary of the estimate

// Cordova plugin

//For alert messages

var SummaryPage = /** @class */ (function () {
    function SummaryPage(navCtrl, navParams, calcService, emailComposer, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calcService = calcService;
        this.emailComposer = emailComposer;
        this.alertCtrl = alertCtrl;
        // Email form input variables intialized
        this.email = {
            firstName: '',
            lastName: '',
            emailAddress: '',
        };
        // Email body HTML
        this.emailBody = "<p>Dear {{email.firstName}} {{email.lastName}},<br><br>\n  Thank you for allowing us the opportunity to bid on your upcoming painting project.<br><br>\n  Here is your estimate: <br><br></p>\n\n  <p>Room Name: {{roomName}}</p>\n  <p>Paint Used: {{paintUsed}}</p>\n  <p>Paint Cost: {{totalPaintCost}}</p>\n  <p>Labor Cost: {{totalLaborCost}}<br><br></p>\n  \n  <p>Total Cost: {{totalCost}}<br><br></p>\n\n  <p>We look forward to hearing from you.</p>\n  <p>Thank you, <br>\n  The Painting Company</p>";
        // Gets form data from the Estimate page
        this.roomName = navParams.data.roomName;
        this.wallHieght = navParams.data.wallHieght;
        this.roomLength = navParams.data.roomLength;
        this.roomWidth = navParams.data.roomWidth;
        this.paintUsed = navParams.data.paintUsed;
        this.sqFtPerHr = navParams.data.sqFtPerHr;
        this.laborPerHr = navParams.data.laborPerHr;
        this.roomPhoto = navParams.data.roomPhoto; // Room photo
        // Gets estimate calculations from the CalcProvider service
        this.totalPaintCost = this.getTotalPaintCost();
        this.totalLaborCost = this.getTotalLaborCost();
        this.totalCost = this.getTotalCost();
    }
    // Functions used to call calculations from the CalcProvider service
    SummaryPage.prototype.getTotalPaintCost = function () {
        return this.totalPaintCost = this.calcService.getTotalPaintCost(this.paintUsed, this.wallHieght, this.roomLength, this.roomWidth);
    };
    SummaryPage.prototype.getTotalLaborCost = function () {
        return this.totalLaborCost = this.calcService.getTotalLaborCost(this.sqFtPerHr, this.laborPerHr, this.wallHieght, this.roomLength, this.roomWidth);
    };
    SummaryPage.prototype.getTotalCost = function () {
        return this.totalCost = this.calcService.getTotalProjectCost();
    };
    // For logging client information form inputs
    SummaryPage.prototype.logForm = function () {
        console.log('Client information form has been submittied:', this.email);
    };
    // Cordova email plugin
    SummaryPage.prototype.sendEstimateEmail = function () {
        var _this = this;
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                console.log('Cordova is available to send an email.');
                var email = {
                    to: _this.email.emailAddress,
                    cc: [],
                    bcc: [],
                    attachments: [_this.roomPhoto],
                    subject: 'Painting Estimate',
                    body: _this.emailBody,
                    isHtml: true
                };
                console.log('Email to send:', email);
                // Send an email message using default options
                _this.emailComposer.open(email);
                _this.emailSentAlert();
            }
        }).catch(function (error) {
            console.log('Email to send:', _this.emailBody);
            _this.emailNotSentAlert();
            console.error('Cordova is not available to send an email. Error: ', error);
        });
    };
    // Alert for email successfully being sent
    SummaryPage.prototype.emailSentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Email Sent',
            subTitle: 'Your email was successfully sent.',
            buttons: ['Ok']
        });
        alert.present();
    };
    // Alert for email unable to be sent
    SummaryPage.prototype.emailNotSentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Email Not Sent',
            subTitle: 'Your email was unable to be sent because the email composer is currently unavailable.',
            buttons: ['Ok']
        });
        alert.present();
    };
    SummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-summary',template:/*ion-inline-start:"C:\Users\erick\Desktop\fp\est\src\pages\summary\summary.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Summary\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n  <!-- Provides a basic summary of the estimate -->\n\n  <h6 padding-bottom>Estimate Summary</h6>\n\n  <p>Room Name: {{roomName}}</p>\n  \n  <p>Paint Used: {{paintUsed}}</p>\n  \n  <p>Paint Cost: {{totalPaintCost}}</p>\n\n  <p>Labor Cost: {{totalLaborCost}}<br><br></p>\n  \n  <p padding-bottom>Total Cost: {{totalCost}}</p>\n\n\n  <!-- A form to collect information about the client, in order to send an estimate email. -->\n\n  <h6>Client Contact Information</h6>\n\n  <p>Please fill out the form below if you would like to send this estimate to a potential client:</p>\n\n  <form (ngSubmit)="logForm()">\n\n    <ion-list inset>\n\n      <ion-item>\n        <ion-label stacked>Client First Name: </ion-label>\n        <ion-input type="text" ngDefaultControl [(ngModel)]="email.firstName" name="firstName"></ion-input>\n      </ion-item>\n      \n      <ion-item>\n        <ion-label stacked>Client Last Name: </ion-label>\n        <ion-input type="text" ngDefaultControl [(ngModel)]="email.lastName" name="lastName"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Email Address: </ion-label>\n        <ion-input type="email" ngDefaultControl [(ngModel)]="email.emailAddress" name="emailAddress"></ion-input>\n      </ion-item>\n\n      <!-- Displays the for review what the estimate email will look like before it is sent. -->\n\n      <h6>Email Review</h6>\n\n      <p>Below is how your email will look once it is sent. Please review it for correctness before\n      clicking send.<br><br></p>\n\n      <p>Dear (client name will be inserted here),<br><br>\n      Thank you for allowing us the opportunity to bid on your upcoming painting project.<br><br>\n      Here is your estimate: <br><br></p>\n\n      <p>Room Name: {{roomName}}</p>\n      <p>Paint Used: {{paintUsed}}</p>\n      <p>Paint Cost: {{totalPaintCost}}</p>\n      <p>Labor Cost: {{totalLaborCost}}<br><br></p>\n      \n      <p>Total Cost: {{totalCost}}<br><br></p>\n\n      <p>We look forward to hearing from you.</p>\n      <p>Thank you, <br>\n      The Painting Company</p>\n\n      <!-- Button which submits the client information form and sends the estimate\n       to the client with Cordova email plugin -->\n      \n       <button ion-button type="submit" (click)="sendEstimateEmail()" icon-start margin-top>\n      <ion-icon name="ios-mail"></ion-icon>Send Estimate</button>\n\n    </ion-list>\n  \n  </form>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\erick\Desktop\fp\est\src\pages\summary\summary.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_Data_calculate_estimate__["a" /* CalcProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SummaryPage);
    return SummaryPage;
}());

//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalcProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalcProvider = /** @class */ (function () {
    function CalcProvider() {
        // Hardcoded paint costs per gallon
        this.proMarCost = 22.45;
        this.durationCost = 41.25;
        this.emeraldCost = 48.65;
        // Initialized variables
        this.totalSquareFeet = 0;
        this.costPerGallon = 0;
        this.paintCost = 0;
        this.laborCost = 0;
        this.totalCost = 0;
    }
    // Used to calculate the total sqaure feet of a room's walls
    CalcProvider.prototype.getSquareFeet = function (wallHieght, roomLength, roomWidth) {
        console.log('Calculating sqaure feet:');
        this.totalSquareFeet = wallHieght * roomLength * roomWidth;
        console.log(this.totalSquareFeet);
        return this.totalSquareFeet;
    };
    // Used to calculate the total cost of paint for the room
    CalcProvider.prototype.getTotalPaintCost = function (paintUsed, wallHieght, roomLength, roomWidth) {
        this.getSquareFeet(wallHieght, roomLength, roomWidth);
        console.log('Calculating total paint price:');
        // Determines which paint price to use
        if (paintUsed == "ProMar 200") {
            this.costPerGallon = this.proMarCost;
        }
        else if (paintUsed == "Duration") {
            this.costPerGallon = this.durationCost;
        }
        else {
            this.costPerGallon = this.emeraldCost;
        }
        // Calculates the total cost of paint for the area, rounding up to the nearest gallon,
        // Hardcoding 300 square feet of coverage per gallon for each type of paint
        this.paintCost = Math.ceil((this.totalSquareFeet / 300)) * this.costPerGallon;
        console.log(this.paintCost);
        // Formats the paint cost to a string in USD format
        var dollarStringPaintCost = (this.paintCost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return dollarStringPaintCost;
    };
    // Used to calculate the total labor cost for the room
    CalcProvider.prototype.getTotalLaborCost = function (sqFtPerHr, laborPerHr, wallHieght, roomLength, roomWidth) {
        // Calculates the total labor cost
        this.laborCost = (this.getSquareFeet(wallHieght, roomLength, roomWidth) / sqFtPerHr) * laborPerHr;
        console.log('Calculating total labor cost:');
        // Formats the paint cost to a string in USD format
        var dollarStringLaborCost = (this.laborCost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        console.log(this.laborCost);
        return dollarStringLaborCost;
    };
    // Used to calculate the total cost for the room, including paint and labor
    CalcProvider.prototype.getTotalProjectCost = function () {
        console.log('Calculating total project cost:');
        this.totalCost = this.paintCost + this.laborCost;
        // Formats the paint cost to a string in USD format
        var dollarStringTotalCost = (this.totalCost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        console.log(this.totalCost);
        return dollarStringTotalCost;
    };
    CalcProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], CalcProvider);
    return CalcProvider;
}());

//# sourceMappingURL=calculate-estimate.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__summary_summary__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { CostsPage } from '../costs/costs';


var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        //tab2Root = CostsPage;
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__summary_summary__["a" /* SummaryPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\erick\Desktop\fp\est\src\pages\tabs\tabs.html"*/'\n\n<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Estimate" tabIcon="home"></ion-tab>\n  <!--<ion-tab [root]="tab2Root" tabTitle="Costs" tabIcon="logo-usd"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Summary" tabIcon="ios-folder"></ion-tab>\n</ion-tabs>-->'/*ion-inline-end:"C:\Users\erick\Desktop\fp\est\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_summary_summary__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Data_calculate_estimate__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// For passing form data to the Summary page

// Provider

// Cordova camera plugin

//For alert messages

var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, calcProvider, camera, alertCtrl) {
        this.navCtrl = navCtrl;
        this.calcProvider = calcProvider;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        // Initialization of form data
        this.estimate = {
            roomName: '',
            wallHieght: 0,
            roomLength: 0,
            roomWidth: 0,
            paintUsed: '',
            sqFtPerHr: 0,
            laborPerHr: 0
        };
    }
    HomePage.prototype.logForm = function () {
        console.log('Estimate form has been submitted:', this.estimate);
    };
    // Cordova camera plugin function which handles the taking of a photo
    HomePage.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.roomPhoto = base64Image;
            _this.photoTakenAlert(); // Alert to notify the user their photo was added
        }, function (err) {
            // Handle error
            console.error('Cordova is not available to take a photo. Error: ', err);
            _this.photoNotTakenAlert(); // Alert to notify the user they are unable to add a photo
        });
    };
    // Alert for photo successfully being taken
    HomePage.prototype.photoTakenAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Photo Added',
            subTitle: 'Your have successfully taken a photo.',
            buttons: ['Ok']
        });
        alert.present();
    };
    // Alert for photo unable to be taken
    HomePage.prototype.photoNotTakenAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Camera Not Available',
            subTitle: 'You are currenlty unable to take a photo because the camera is unavailable.',
            buttons: ['Ok']
        });
        alert.present();
    };
    // When clicking the button to create an estimate, it navigates the user to the
    // Summary page and passes form data to that page
    HomePage.prototype.goToSummary = function () {
        console.log('Creating an estimate summary for: ' + this.estimate.roomName);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_summary_summary__["a" /* SummaryPage */], {
            roomName: this.estimate.roomName,
            wallHieght: this.estimate.wallHieght,
            roomLength: this.estimate.roomLength,
            roomWidth: this.estimate.roomWidth,
            paintUsed: this.estimate.paintUsed,
            sqFtPerHr: this.estimate.sqFtPerHr,
            laborPerHr: this.estimate.laborPerHr,
            roomPhoto: this.roomPhoto // Passes photo taken 
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\erick\Desktop\fp\est\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Paint Estimator</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n  <h5>Welcome to the Paint Estimator!</h5>\n  <p>\n    Please enter the information requested in the form below to create an estimate\n    for painting the walls of a room or area.\n  </p>\n\n<!-- Form inputs -->\n\n  <form (ngSubmit)="logForm()">\n\n    <!-- Form input for room name -->\n\n      <ion-item>\n        <ion-label fixed>Room Name</ion-label>\n        <ion-input type="text" [(ngModel)]="estimate.roomName" name="roomName"></ion-input>\n      </ion-item>\n\n      <!-- Form inputs for room measurments -->\n\n      <ion-item>\n        <ion-label fixed>Wall Height</ion-label>\n          <ion-select [(ngModel)]="estimate.wallHieght" name="wallHieght">\n            <ion-option value="7">7</ion-option>\n            <ion-option value="8">8</ion-option>\n            <ion-option value="9">9</ion-option>\n            <ion-option value="10">10</ion-option>\n            <ion-option value="11">11</ion-option>\n            <ion-option value="12">12</ion-option>\n            <ion-option value="13">13</ion-option>\n            <ion-option value="14">14</ion-option>\n            <ion-option value="15">15</ion-option>\n            <ion-option value="16">16</ion-option>\n            <ion-option value="17">17</ion-option>\n            <ion-option value="18">18</ion-option>\n            <ion-option value="19">19</ion-option>\n            <ion-option value="20">20</ion-option>\n          </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label fixed>Room Length</ion-label>\n          <ion-select [(ngModel)]="estimate.roomLength" name="roomLength">\n            <ion-option value="7">7</ion-option>\n            <ion-option value="8">8</ion-option>\n            <ion-option value="9">9</ion-option>\n            <ion-option value="10">10</ion-option>\n            <ion-option value="11">11</ion-option>\n            <ion-option value="12">12</ion-option>\n            <ion-option value="13">13</ion-option>\n            <ion-option value="14">14</ion-option>\n            <ion-option value="15">15</ion-option>\n            <ion-option value="16">16</ion-option>\n            <ion-option value="17">17</ion-option>\n            <ion-option value="18">18</ion-option>\n            <ion-option value="19">19</ion-option>\n            <ion-option value="20">20</ion-option>\n          </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label fixed>Room Width</ion-label>\n        <ion-select [(ngModel)]="estimate.roomWidth" name="roomWidth">\n          <ion-option value="7">7</ion-option>\n            <ion-option value="8">8</ion-option>\n            <ion-option value="9">9</ion-option>\n            <ion-option value="10">10</ion-option>\n            <ion-option value="11">11</ion-option>\n            <ion-option value="12">12</ion-option>\n            <ion-option value="13">13</ion-option>\n            <ion-option value="14">14</ion-option>\n            <ion-option value="15">15</ion-option>\n            <ion-option value="16">16</ion-option>\n            <ion-option value="17">17</ion-option>\n            <ion-option value="18">18</ion-option>\n            <ion-option value="19">19</ion-option>\n            <ion-option value="20">20</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <!-- Form input for paint selection -->\n\n      <p>Please select from the following drop down list to select a paint for your project:</p>\n\n      <ion-item>\n        <ion-label stacked>Paint Selection:</ion-label>\n        <ion-select [(ngModel)]="estimate.paintUsed" name="paintUsed">\n          <ion-option value="ProMar 200">ProMar 200 at ${{calcProvider.proMarCost}} per gallon</ion-option>\n          <ion-option value="Duration">Duration at ${{calcProvider.durationCost}} per gallon</ion-option>\n          <ion-option value="Emerald">Emerald at ${{calcProvider.emeraldCost}} per gallon</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <!-- Form inputs for calculating labor cost -->\n\n      <p>Based on the condition and texture of the walls, please select an approximation\n        of the square feet which can be painted per hour.</p>\n\n      <ion-item>\n        <ion-label stacked>Square Feet Per Hour: </ion-label>\n        <ion-select [(ngModel)]="estimate.sqFtPerHr" name="sqFtPerHr">\n          <ion-option value="100">100 sq. ft. per hr.</ion-option>\n          <ion-option value="150">150 sq. ft. per hr.</ion-option>\n          <ion-option value="200">200 sq. ft. per hr.</ion-option>\n          <ion-option value="250">250 sq. ft. per hr.</ion-option>\n          <ion-option value="300">300 sq. ft. per hr.</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <p>Please enter the labor and overhead cost per hour.</p>\n\n      <ion-item>\n        <ion-label stacked>Labor and Overhead Per Hour: </ion-label>\n        <ion-select [(ngModel)]="estimate.laborPerHr" name="laborPerHr">\n          <ion-option value="25">$ 25 per hr.</ion-option>\n          <ion-option value="30">$ 30 per hr.</ion-option>\n          <ion-option value="35">$ 35 per hr.</ion-option>\n          <ion-option value="40">$ 40 per hr.</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <!-- Cordova plug-in input for adding photos to the estimate summary -->\n\n      <p>If you would like to add a photo of the area to include with the summary of your estimate,\n        please click the camera icon below.</p>\n\n      <!-- Camera icon button to add a photo -->\n\n      <button ion-button (click)="takePhoto()" icon-only>\n        <ion-icon name="ios-camera"></ion-icon>\n      </button>\n\n      <!-- Submit button for the form -->\n\n      <p>After you have made and reviewed your selections, please click the create estimate\n        buttom to continue.</p>\n\n      <!-- A button which submits the form inputs necessary to complete the estimate,\n      and brings the user to the summary page. -->\n\n      <button ion-button type="submit" (click)="goToSummary()" margin-top>Create Estimate</button>\n\n    </form>\n \n</ion-content>\n'/*ion-inline-end:"C:\Users\erick\Desktop\fp\est\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_Data_calculate_estimate__["a" /* CalcProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_Data_calculate_estimate__["a" /* CalcProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_summary_summary__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_Data_calculate_estimate__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// Provider

// Cordova plugins


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_summary_summary__["a" /* SummaryPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_summary_summary__["a" /* SummaryPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_Data_calculate_estimate__["a" /* CalcProvider */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\erick\Desktop\fp\est\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\erick\Desktop\fp\est\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map