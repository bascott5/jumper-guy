import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { FramesService } from '../../services/frames/frames.service';

@Component({
  selector: 'platform',
  standalone: true,
  imports: [],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css'
})
export class PlatformComponent implements AfterViewInit {
  constructor(private framesService: FramesService) {}

  @ViewChild("platformObj") platformObj: ElementRef;
  @ViewChild("platformObj2") platformObj2: ElementRef;

  ngAfterViewInit(): void {
    this.platformObj.nativeElement.style.display = "none";
    this.platformObj2.nativeElement.style.display = "none";

    setTimeout(() => {
      this.platformObj.nativeElement.style.display = "";
      this.platformObj2.nativeElement.style.display = "";

      this.framesService.setPlatformObj(this.platformObj);
      this.framesService.setPlatformObj2(this.platformObj2);
      this.framesService.startPlatform();
    }, 3000);
  }
}
