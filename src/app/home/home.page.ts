import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Login } from '../models/login';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  failsLogin = 0;

  usuarios: Login = new Login;

  constructor(public alertController: AlertController, public router: Router,
    public LoginService: ServiceService) { }

    dismiss(){
      this.router.navigate(['/inicio']);
    }

  async logForm(usuarios) {
    
    if(this.usuarios.strCorreo == null && this.usuarios.strPassword == null){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message: 'Ingrese datos en todos los campos.',
        buttons: ['OK']
      });

      await alert.present();
    }else{
      this.LoginService.login(this.usuarios).then((res:any)=>{
        let nombre = res.usrDB.nombre;
        console.log('Datos correctos', res.usrDB.tipo)
        localStorage.setItem('nombre', nombre);
        this.usuarios.tipo = res.usrDB.tipo;
        console.log('Datos correctos', this.usuarios.tipo)
        if(this.usuarios.tipo == 'Administrador'){
          this.router.navigate(['/tab1-admin'])
        }
        if(this.usuarios.tipo == 'Chofer'){
          this.router.navigate(['/tab1'])  
        }
        if(this.usuarios.tipo == 'Usuario'){
          this.router.navigate(['/menu-user'])
        }

      }).catch(err =>{
        console.log('Error al momento del login'+ err)
      })

    }
  }
}

    


