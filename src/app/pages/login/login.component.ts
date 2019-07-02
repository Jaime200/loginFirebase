import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel;
  recuerdame = false;
  constructor(private _auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.usuario= new UsuarioModel();

    if(localStorage.getItem('logAppEmail')){
      this.usuario.email =localStorage.getItem('logAppEmail')
      this.recuerdame = true;
    }
  }

  onSubmit(form:NgForm){
    console.log(form)
    if(form.invalid){
      return;
    }
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
      })

    Swal.showLoading();
    this._auth.login(this.usuario)
              .subscribe(
                (resp)=>{
                  console.log(resp)
                  Swal.close();
                  if(this.recuerdame){
                    localStorage.setItem('logAppEmail',this.usuario.email);
                  }
                  this.router.navigateByUrl('/home')
                },
                (err)=>{
                  console.log(err.error.error.message)
                  Swal.fire({
                    allowOutsideClick:false,
                    type:'error',
                    titleText:'Error al autenticar',
                    text:err.error.error.message
                    })
                }
              )
  }

}
