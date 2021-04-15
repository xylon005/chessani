import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { Component, OnInit, Input } from '@angular/core';



declare var google;


interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  viaje = {
    origenChofer: null,
    destinoChofer: null,
    cobroChofer: null,
    fechaViaje: null,
    horaViaje: null
  }

  constructor( public router: Router, public viajeChoferService: ServiceService ) {this.ispickreques = false;}

  altaViaje(forma: any){
    let date = new Date();
    this.viaje.horaViaje = date.getHours() + ':' + date.getMinutes();
    this.viaje.fechaViaje = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    return this.viajeChoferService.altaViajeChofer(this.viaje).then( (res:any) => {
      console.log(res);
      alert(res.status);
      this.viajeChoferService.obtenerViajeChofer();
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

  @Input() ispickrequess: boolean;
  public ispickreques: boolean;
  map = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  //casa
  origin = { lat: 21.867750, lng: -102.242056 };
// uta
destination = {  };
  
  
  ngOnInit() {
    this.loadMap();
  }

  

  confirmpick(){

     this.ispickreques = true;
    
  }

  cancelpick(){
    this.ispickreques = false;
  }


  loadMap() {

    

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
      

    });
  } 

  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
    }


  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }


}
