import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})
export class SalesorderComponent implements OnInit {

  constructor(private router : Router , private http: HttpClient) { }
  salesorder:any;
  ngOnInit(): void {
    this.http.post("http://localhost:1000/salesorder","").subscribe(resp=>{
      this.salesorder = resp;
      console.log(this.salesorder);
  })
}
}