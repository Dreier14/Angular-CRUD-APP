import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb(){
    const products = [
      {
      id:1,
      name: "Fender Stratocaster",
      price: 700
    
      },
      {
        id:2,
        name: "DW Drumset",
        price: 1000
    
      },
      {
        id:3,
        name: "Hammond B3 Organ",
        price: 2000
    
      }
    ];
    return{ products };
  }
  constructor() { }
}
