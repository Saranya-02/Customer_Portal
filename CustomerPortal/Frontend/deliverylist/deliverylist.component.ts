import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deliverylist',
  templateUrl: './deliverylist.component.html',
  styleUrls: ['./deliverylist.component.css']
})
export class DeliverylistComponent implements OnInit {

  constructor(private router : Router , private http: HttpClient) { }
  delivery:any;
  ngOnInit(): void {
    this.http.post("http://localhost:1000/delivery","").subscribe(resp=>{
      this.delivery = resp;
      console.log(this.delivery);
  })
}
}