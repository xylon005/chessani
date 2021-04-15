import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-regusu',
  templateUrl: './regusu.page.html',
  styleUrls: ['./regusu.page.scss'],
})
export class RegusuPage implements OnInit {

  usu = {
    strNombre: null,
    strPassword: null,
    strDireccion: null,
    nmbEdad: null,
    arrTelefonos: null,
    strCorreo: null,
    tipo:null
  }
  
    constructor(public router: Router,
      public service: ServiceService) {
      }
      ngOnInit(){
        
      }
  altaUser(forma:any){
    this.service.altaUser(this.usu).then((res:any)=>{
      console.log(res);
      alert('Usuario Insertado con exito');
      this.router.navigate(["/"])
    }).catch(err => {
      console.log(err);
      alert('A ocurrido un error al momento de insertar el usuario');
    })
  }

}
