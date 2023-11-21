import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cards = [
    {
      image: "../assets/inquirydata.png",
      title: '  INQUIRY DATA',
      route : '/inquiry'
      // description: 'Inquiry Data Details'
    },
    {
      image: "../assets/salesorder.png",
      title: '  SALES ORDER',
      route : '/salesorder'
      // description: 'This is the second card'
    },
    {
      image: "../assets/delivery.png",
      title: '        DELIVERY LIST',
      route : '/delivery'
      // description: 'This is the third card'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
