import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;
  Arr: any = [];
  constructor() {
    // Get latitude and longitude from localStorage when the service is initialized
    const savedLatitude = localStorage.getItem('latitude');
    this.latitude = savedLatitude ? parseFloat(savedLatitude) : undefined;

    const savedLongitude = localStorage.getItem('longitude');
    this.longitude = savedLongitude ? parseFloat(savedLongitude) : undefined;
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.error = undefined;

          // Save latitude and longitude in localStorage
          localStorage.setItem('location', this.latitude.toString());
          localStorage.setItem('longitude', this.longitude.toString());

          // Call the API using the latitude and longitude
          this.callApi(this.longitude, this.latitude);
        },
        (error) => {
          this.error = error.message;
        }
      );
    } else {
      this.error = 'Geolocation is not supported by your browser.';
    }
  }

  getIpAddress(): Promise<string> {
    return axios
      .get('https://api.ipify.org?format=json')
      .then((response) => {
        return response.data.ip;
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error);
        return ''; // Return an empty string in case of an error.
      });
  }

  callApi(longitude: number, latitude: number): void {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`;

    axios
      .get(url)
      .then((response) => {
        this.Arr = [
          {
            lati: response.data.center[0],
            longti: response.data.center[1],
          },
        ];
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  }
}
