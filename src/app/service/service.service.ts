import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Reportes } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  usuarios: any;
  url = 'http://localhost:3000/api/'; 
  urlUser = 'http://localhost:3000/api/usuarios'; 
  urlLogin = 'http://localhost:3000/api/login'
  urlBase = 'http://localhost:3000/api/choferCarros/';
  urlViajeChofer = 'http://localhost:3000/api/viajeChofer/';
  choferCarros: any;
  viajeChofer: any;
  choferes: any;


  constructor(public http: HttpClient) { 
    this.choferCarros = [];
    this.viajeChofer = [];
    this.choferes = [];
  }

  // filtro carros
  filtroCarro(body){
    this.http.post(this.urlBase + 'filtroCarro', body).subscribe(
      res => {
        this.choferCarros = res;
        console.log('Los carros en la base de datos son:', res);
      }, err => {
        console.log(err);
      }
    )
  }

  // Usuarios
  getUsuarios(){
    this.http.get(`${this.urlUser}`).subscribe((data:any) => {
      this.usuarios = data;
      this.choferes = [];
      for(let i =0; i < this.usuarios.length; i++){
        if(this.usuarios[i].tipo == "Chofer"){
          this.choferes.push(this.usuarios[i]);
        }
      }
      return data;
    },
    err => {
      console.log(err);
    });    
  }

  altaUser(usuario){
    return this.http.post(this.urlUser, usuario).toPromise();

  }
  //Login

  login(usuario){
    return this.http.post(this.urlLogin,usuario).toPromise();
  }

  //Carros
  obtenerCarros(){
    this.http.get(this.urlBase).subscribe(
      res => {
        this.choferCarros = res;
        console.log('Los carros en la base de datos son:', res);
      }, err => {
        console.log(err);
      }
    )
  }

  altaCarro(coche){
    return this.http.post(this.urlBase, coche).toPromise();
  }

  // Viaje Chofer
  obtenerViajeChofer(){
    this.http.get(this.urlViajeChofer).subscribe(
      (res: any) => {
        this.viajeChofer = res;
        // console.log('Los viajes en la base de datos son:', res);
      }, err => {
        console.log(err);
      }
    )
  }

  altaViajeChofer(viaje){
    return this.http.post(this.urlViajeChofer, viaje).toPromise();
  }
  
  //Reportes
  getReportes(){
    return this.http.get(`${this.url}reportes/`).toPromise();
  }
  
  postReportes(reporte: Reportes){
    return this.http.post(`${this.url}reportes/`, reporte);
  }

}
