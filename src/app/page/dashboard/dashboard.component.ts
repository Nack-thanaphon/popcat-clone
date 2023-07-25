import { Component, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @ViewChild('clickSound') clickSoundRef!: ElementRef;

  clickCount: number = 0;
  isPopped: boolean = false;
  ipAddress: string = '';
  locationData: any[] = [];
  storedClickCount: number = parseInt(
    window.localStorage.getItem('ClickStore') || '0',
    10
  );

  constructor(private locationService: LocationService) {}

  async ngOnInit() {
    this.ipAddress = await this.locationService.getIpAddress();
  }

  // Function to add touch event listeners
  onTouchStart(event: TouchEvent) {
    // Prevent default touch behavior, such as scrolling or zooming
    event.preventDefault();
    const audio = this.clickSoundRef.nativeElement as HTMLAudioElement;
    audio.pause();
    // Save the updated ClickStore value in localStorage
    window.localStorage.setItem(
      'ClickStore',
      (this.storedClickCount + 1).toString()
    );
    this.storedClickCount = parseInt(
      window.localStorage.getItem('ClickStore') || '0',
      10
    );
    this.isPopped = false;
    // Reset the popped state after 200ms to animate back to the original size
    this.clickCount++;
  }

  onTouchEnd(event: TouchEvent) {
    // Prevent default touch behavior, such as scrolling or zooming
    event.preventDefault();
    const audio = this.clickSoundRef.nativeElement as HTMLAudioElement;
    audio.play();
    this.isPopped = true;
  }

  onMouseUp() {
    const audio = this.clickSoundRef.nativeElement as HTMLAudioElement;
    audio.pause();
    // Save the updated ClickStore value in localStorage
    window.localStorage.setItem(
      'ClickStore',
      (this.storedClickCount + 1).toString()
    );
    this.storedClickCount = parseInt(
      window.localStorage.getItem('ClickStore') || '0',
      10
    );
    this.isPopped = false;
    // Reset the popped state after 200ms to animate back to the original size
    this.clickCount++;
  }

  onMouseDown() {
    const audio = this.clickSoundRef.nativeElement as HTMLAudioElement;
    audio.play();
    this.isPopped = true;
  }
}
