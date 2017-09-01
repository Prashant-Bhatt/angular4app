import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { Http } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConstantsService } from '../../services/constants.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:any;
  password:any;
  data:any;
  loginForm=new FormGroup({
    username:new FormControl('',Validators.compose([Validators.required])),
    password:new FormControl('',Validators.compose([Validators.required]))
  });
  constructor(
    private http:Http,
    private constantsService:ConstantsService,
    private flashMessagesService:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
     
  }

  onLoginSubmit(){
    if(this.loginForm.valid){
      let user={
        username:this.username,
        password:this.password
      };
      this.loginFormService(user).subscribe(data=>{
        if(data.success){
          //console.log(data);
          window.localStorage.setItem('loginToken',data.token);
          window.localStorage.setItem('userData',JSON.stringify(data.user));
          this.flashMessagesService.show('User Registered.',{ cssClass: 'alert-success', timeout:5000 });
          this.router.navigate(['dashboard']); 
          return;
        }
        else{
          this.flashMessagesService.show('User not valid.',{ cssClass: 'alert-danger', timeout:5000 });          
          return;
        }

      },
      err=>{
        this.flashMessagesService.show('Some error occurred.',{ cssClass: 'alert-danger', timeout:5000 });        
        return;
      }
      );
    }
    else{
      this.flashMessagesService.show('Please fill all fields.',{ cssClass: 'alert-danger', timeout:5000 });      
      return;
    }
    
  }

  loginFormService(user){
    let headers=new Headers();
    headers.set('Content-Type', 'application/json');           
    return this.http.post(this.constantsService.API_URL+'users/authenticate',user,headers).map(res=>res.json());
  }

}
