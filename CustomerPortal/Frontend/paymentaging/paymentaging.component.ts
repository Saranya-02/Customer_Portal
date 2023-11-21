import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentaging',
  templateUrl: './paymentaging.component.html',
  styleUrls: ['./paymentaging.component.css']
})
export class PaymentagingComponent implements OnInit {
  constructor(private router : Router , private http: HttpClient) { }
  payment:any;
  ngOnInit(): void {
    this.http.post("http://localhost:1000/payment","").subscribe(resp=>{
      this.payment = resp;
      console.log(this.payment);
  })
}
}