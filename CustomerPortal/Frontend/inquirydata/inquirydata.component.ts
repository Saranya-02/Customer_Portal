import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquirydata',
  templateUrl: './inquirydata.component.html',
  styleUrls: ['./inquirydata.component.css']
})
export class InquirydataComponent implements OnInit {
 
  constructor(private router : Router , private http: HttpClient) { }
  inquiry:any;
  ngOnInit(): void {
    this.http.post("http://localhost:1000/inquiry","").subscribe(resp=>{
      this.inquiry = resp;
      console.log(this.inquiry);
  })
}
}