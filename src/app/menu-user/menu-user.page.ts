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
  selector: 'app-menu-user',
  templateUrl: './menu-user.page.html',
  styleUrls: ['./menu-user.page.scss']
})
export class MenuUserPage implements OnInit {

  
  @Input() ispickrequess: boolean;
  public ispickreques: boolean;
  map = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  //casa
  origin = { lat: 21.867750, lng: -102.242056 };
// uta
destination = { lat: 21.841409, lng: -102.354438 };
  
  constructor
  () {this.ispickreques = false; }

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
