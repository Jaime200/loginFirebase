import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel
  recuerdame=false;
  constructor(
    private _auth:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();    
   }

   onSubmit(form:NgForm){
     if(form.invalid){
       return;
     }
     Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
      })

    Swal.showLoading();

     this._auth.nuevoUsuario(this.usuario)
                .subscribe( 
                  resp=>{
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
                })
     
   }


}
