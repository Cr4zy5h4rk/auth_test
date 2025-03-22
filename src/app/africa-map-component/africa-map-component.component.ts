// africa-map.component.ts
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-africa-map',
  standalone: true,
  imports: [],
  template: `
    <div class="map-container">
      <div id="map" style="height: 600px; width: 100%;"></div>
    </div>
  `,
  styles: `
    .map-container {
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin: 20px 0;
    }
  `
})
export class AfricaMapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private africaLayer!: L.GeoJSON;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadAfricaGeoJSON();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 20], // Centre approximatif de l'Afrique
      zoom: 3,
      minZoom: 2,
      maxZoom: 8
    });

    // Ajout du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private loadAfricaGeoJSON(): void {
    // Vous pouvez remplacer cette URL par celle de votre propre fichier GeoJSON d'Afrique
    // Par exemple, vous pourriez héberger le fichier localement dans assets/data/africa.geojson
    const africaGeoJSONPath = 'assets/data/africa.geojson';

    this.http.get(africaGeoJSONPath).subscribe((data: any) => {
      this.africaLayer = L.geoJSON(data, {
        style: (feature) => ({
          fillColor: this.getRandomColor(),
          weight: 1,
          opacity: 1,
          color: '#666',
          fillOpacity: 0.7
        }),
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
          }
        }
      }).addTo(this.map);

      // Ajuster la vue aux limites de l'Afrique
      this.map.fitBounds(this.africaLayer.getBounds());
    });
  }

  private getRandomColor(): string {
    const colors = [
      '#FFC107', '#FF9800', '#FF5722', '#F44336', '#E91E63',
      '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4',
      '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}