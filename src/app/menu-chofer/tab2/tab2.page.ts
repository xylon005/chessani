import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  choferFiltro = '';

  coche = {
    idChofer: null,
    placasCarro: null,
    modeloCarro: null,
    yearCarro: null,
    colorCarro: null
  }

  constructor(public router: Router, public choferCarrosService: ServiceService) {
    // this.choferCarrosService.obtenerCarros();
    this.choferCarrosService.getUsuarios();
  }

  obtenerCarrosChofer(){
    let body = {
      idChofer: this.choferFiltro
    }
    this.choferCarrosService.filtroCarro(body);
  }

  altaCoche(forma: any){
    return this.choferCarrosService.altaCarro(this.coche).then( (res:any) => {
      console.log(res);
      alert(res.status);
      forma.reset();
    }).catch(err => {
      console.log(err);
      alert('Ocurrió un error')
    })
  }

  Tab1(){                
    this.router.navigate(['/tab1'])
  }

  Tab2(){                
    this.router.navigate(['/tab2'])
  }


  Tab3(){
    this.router.navigate(['/tab3'])
  }

  cerrarSesion(){
    this.router.navigate(['/home']);
  }


}
