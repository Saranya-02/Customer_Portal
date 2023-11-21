import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  constructor(private router : Router , private http: HttpClient) { }
  memo:any;
  ngOnInit(): void {
    this.http.post("http://localhost:1000/memo","").subscribe(resp=>{
      this.memo = resp;
      console.log(this.memo);
  })
}
}