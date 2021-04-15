import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Reportes } from '../models/login';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  constructor(public router: Router, public alertController: AlertController, public srv: ServiceService) {     
  }

  reporte: any;
  
  ngOnInit() {           
    this.srv.getReportes().then((data:any) => {
      this.reporte = data;
      console.log(this.reporte);
    });
  }

  repo: Reportes = new Reportes;

  async registrarReporte(form: NgForm){      
    if(this.repo.origen == null, this.repo.destino == null, this.repo.duracion == null){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Mensaje',
        message: 'Agregue información a todos los inputs antes de continuar',
        buttons: ['OK']
      });
      await alert.present();
    }else{

      if(this.repo.origen == "", this.repo.destino == "", this.repo.duracion == ""){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Mensaje',            
          message: 'Para volver a dar de alta un reporte agregue información',
          buttons: ['OK']
        });
        await alert.present();
      }else{

        console.log(this.reporte);
        this.srv.postReportes(this.repo).subscribe(data => {              
          console.log(data);           
        });
        this.srv.getReportes().then((data:any) => {
          this.reporte = data;
          console.log(this.reporte);
        });
        this.repo.destino = this.repo.origen = this.repo.duracion = "";        

      }
    }  
  }

  regresar(){
    this.router.navigate(['/tab1-admin']);  
  }

}
