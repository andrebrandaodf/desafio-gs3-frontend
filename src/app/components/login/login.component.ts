import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { User } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  form: FormGroup = this.formBuilder.group({
    username: [null,[Validators.required]],
    password: [null,[Validators.required]]
  })

  login(){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return 
    }
    this.authService.login(this.form.value).subscribe(data =>{
      localStorage.setItem('token', data.token)
      console.log("Sucesso! " , data)
      this.router.navigate(['/admin'])
    },
    erro =>{
      console.log("Erro " , erro)
    }
    )
  }
}
