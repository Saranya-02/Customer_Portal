import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  user1:any;
  pass1:any;
  custlogin:any;
  loginform = new FormGroup({
    username : new FormControl("",[Validators.required]),
    password : new FormControl("",[Validators.required,Validators.minLength(6)])
   
  });

  constructor(private router : Router , private http: HttpClient) { }

  ngOnInit(): void {
  }

  onLogin(){
  //   if(this.loginform.value.email=="saranyapuli02@gmail.com" && this.loginform.value.password=="12345678"){
  //     alert("Login successful");
  //     window.location.href="/profile";
  //   }
  //   else if(this.loginform.value.email=="saranyapuli02@gmail.com"&& this.loginform.value.password!="12345678"){
  //     alert("Invalid Password");
  //   }
  //   else{
  //     alert("Invalid credentials");
  //   }
  //   }
  // }
  this.user1=this.loginform.get('username')?.value;
  this.pass1=this.loginform.get('password')?.value;
  console.log(this.user1,this.pass1)
  this.http.post("http://localhost:1000/login", {
  id: this.user1,
  pwd: this.pass1
  }).subscribe(resp=>{
  console.log(resp);
  this.custlogin = resp;
  
  if(this.custlogin == 'Login Successful'){
    this.router.navigateByUrl('/profile'); 
  }else{
  alert("Incorrect credentials");
  }
  })
  }
}
