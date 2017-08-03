import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormControl, FormGroup, } from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConstantsService } from 'app/services/constants.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validated=0;
  name:string;
  email:string;
  username:string;
  password:string;

//registration validations
  registerForm=new FormGroup({
    name: new FormControl('',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(30)])),
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    username: new FormControl('',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(15)])),
    password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(15)])),
  });


  constructor(
    private flashMessagesService: FlashMessagesService, 
    private http:Http,
    private constantsService:ConstantsService,
    private router: Router
    ) {

   }

  ngOnInit() {
  }
  
  submitRegisterForm(){
    if(this.registerForm.valid){
      const user={
        name:this.name,
        email:this.email,
        username:this.username,
        password:this.password
      }
      this.registeruser(user).subscribe(data=>{
        if(data.success){
          this.flashMessagesService.show('User Registered.',{ cssClass: 'alert-success', timeout:5000 });
          this.router.navigate(['login']); 
          return;
        }
        else{
          console.log(data);
          this.flashMessagesService.show('Oops something went wrong. Please try again.',{ cssClass: 'alert-danger', timeout:5000 });
        }
        
      },
      err=>{
        this.flashMessagesService.show('Oops something went wrong while registering user. Please try again or contact administrator.',{ cssClass: 'alert-danger', timeout:5000 });
      });
      
      
    }
    else{
      this.signUpValidationErrors();
      return false;
    }
    
  }

  //call to register user
  registeruser(user){    
      var headers = new Headers();
      headers.set('Content-Type', 'application/json');       
      return this.http.post(this.constantsService.API_URL+'users/register',user, headers).map(res => res.json());
  }

  //registration validation errors
  signUpValidationErrors(){
    if(!this.registerForm.get('name').valid){
      this.flashMessagesService.show('Name is required and must contain 5 to 30 characters.',{ cssClass: 'alert-danger', timeout:5000 });
    }
    if(!this.registerForm.get('email').valid){
      this.flashMessagesService.show('A valid email is required.',{ cssClass: 'alert-danger', timeout:5000 });
    }
    if(!this.registerForm.get('username').valid){
      this.flashMessagesService.show('Username is required and must contain 5 to 15 characters.',{ cssClass: 'alert-danger', timeout:5000 });
    }
    if(!this.registerForm.get('password').valid){
      this.flashMessagesService.show('Password is required and must contain 5 to 15 characters.',{ cssClass: 'alert-danger', timeout:5000 });
    }
  }


}