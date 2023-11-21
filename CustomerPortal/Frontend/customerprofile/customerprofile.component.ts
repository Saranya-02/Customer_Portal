import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {
  header = ["CUSTOMER NUMBER","NAME","CITY","POSTAL CODE","REGION","TELEPHONE NUMBER","ADDRESS"];
  constructor(private router : Router , private http: HttpClient) { }
  profile:any;
  ngOnInit(): void {
    this.http.post("http://localhost:1000/profile","").subscribe(resp=>{
      this.profile = resp;
      console.log(this.profile);
  })
}
}
