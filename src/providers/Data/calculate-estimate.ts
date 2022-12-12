
import { Injectable } from '@angular/core';

@Injectable()
export class CalcProvider {

    // Hardcoded paint costs per gallon
    proMarCost = 22.45;
    durationCost = 41.25;
    emeraldCost = 48.65;

    // Initialized variables
    totalSquareFeet = 0;
    costPerGallon = 0;
    paintCost = 0;
    laborCost = 0;
    totalCost = 0;

    constructor() {
    }

    // Used to calculate the total sqaure feet of a room's walls
    getSquareFeet(wallHieght: number, roomLength: number, roomWidth: number) {
        console.log('Calculating sqaure feet:')
        this.totalSquareFeet = wallHieght * roomLength * roomWidth
        console.log(this.totalSquareFeet)
        return this.totalSquareFeet
    }

    // Used to calculate the total cost of paint for the room
    getTotalPaintCost (paintUsed: string, wallHieght: number, roomLength: number, roomWidth: number) {
        this.getSquareFeet(wallHieght, roomLength, roomWidth);
        console.log('Calculating total paint price:')
        // Determines which paint price to use
        if (paintUsed == "ProMar 200"){
            this.costPerGallon = this.proMarCost;
        }
        else if (paintUsed == "Duration") {
            this.costPerGallon = this.durationCost;
        }
        else { // Uses the Emerald paint price
            this.costPerGallon = this.emeraldCost;
        }
        // Calculates the total cost of paint for the area, rounding up to the nearest gallon,
        // Hardcoding 300 square feet of coverage per gallon for each type of paint
        this.paintCost = Math.ceil((this.totalSquareFeet / 300)) * this.costPerGallon
        console.log(this.paintCost)
        // Formats the paint cost to a string in USD format
        let dollarStringPaintCost = (this.paintCost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return dollarStringPaintCost
    }

    // Used to calculate the total labor cost for the room
    getTotalLaborCost(sqFtPerHr: number, laborPerHr: number, wallHieght: number, roomLength: number, roomWidth: number) {
        // Calculates the total labor cost
        this.laborCost = (this.getSquareFeet(wallHieght, roomLength, roomWidth) / sqFtPerHr) * laborPerHr;
        console.log('Calculating total labor cost:')
        // Formats the paint cost to a string in USD format
        let dollarStringLaborCost = (this.laborCost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        console.log(this.laborCost)
        return dollarStringLaborCost
    }

    // Used to calculate the total cost for the room, including paint and labor
    getTotalProjectCost() {
        console.log('Calculating total project cost:')
        this.totalCost = this.paintCost + this.laborCost;
        // Formats the paint cost to a string in USD format
        let dollarStringTotalCost = (this.totalCost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        console.log(this.totalCost)
        return dollarStringTotalCost
    }
}