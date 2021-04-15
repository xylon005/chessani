import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Login, Pagos } from '../models/login';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router) {
    this.arrayEfectivo = []
    this.arrayTarjeta = []    
   }

  arrayEfectivo: any;  
  arrayTarjeta: any;    
  model: Pagos = new Pagos;
  
  efect = 0;
  tarjeta = 0;

  ngOnInit() {
  }

  async guardar(model){
    let pagos = {      
      "cantidad": this.model.cantidad,
      "tipoPago": this.model.tipoPago      
    };     
    

    if(this.model.cantidad != undefined && this.model.cantidad != 0, this.model.tipoPago != undefined && this.model.tipoPago != ''){

      if(this.model.tipoPago === 'efectivo'){
        this.arrayEfectivo.push(pagos);    
        this.efect ++;        
        this.model.cantidad = 0;
        this.model.tipoPago = null;
        console.log(this.arrayEfectivo, this.efect);      
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Regsitro',            
          message: 'Se registró el pago con efectivo',
          buttons: ['OK']
        });
        await alert.present();
      }
  
      if(this.model.tipoPago === 'tarjeta'){
        this.arrayTarjeta.push(pagos);    
        this.tarjeta ++;        
        this.model.cantidad = 0;
        this.model.tipoPago = null;
        console.log(this.arrayTarjeta, this.tarjeta);
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Regsitro',            
          message: 'Se registró el pago con tarjeta.',
          buttons: ['OK']
        });
        await alert.present();
      }
        
    }else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Resultado',            
        message: 'Faltan datos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  regresar(){
    this.router.navigate(['/tab1-admin']);  
  }


}
