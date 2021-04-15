import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3PageAdmin {
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
      this.service.getUsuarios();
    }

altaUser(forma:any){
  this.service.altaUser(this.usu).then((res:any)=>{
    console.log(res);
    alert('Usuario Insertado con exito');
    this.service.getUsuarios();
  }).catch(err => {
    console.log(err);
    alert('A ocurrido un error al momento de insertar el usuario');
  })
}

  Tab1(){                
    this.router.navigate(['/tab1-admin'])
  }

  Tab2(){                
    this.router.navigate(['/tab2-admin'])
  }


  Tab3(){
    this.router.navigate(['/tab3-admin'])
  }

  cerrarSesion(){
    this.router.navigate(['/home']);
  }


}
