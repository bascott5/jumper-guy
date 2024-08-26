import { Component, ElementRef, ViewChild, AfterViewInit, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import { FramesService } from '../../services/frames/frames.service';

@Component({
  selector: 'star',
  standalone: true,
  imports: [],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css'
})
export class StarComponent implements AfterViewInit {
  constructor(private framesService: FramesService) {}

  @ViewChild("starObj") starObj: ElementRef;
  @Output() outputStar = new EventEmitter<ElementRef>();
  @Input() falling: boolean = false;
  @Input() playerRef: ElementRef;

  ngAfterViewInit(): void {
    this.starObj.nativeElement.style.display = "none";

    setTimeout(() => {
      this.starObj.nativeElement.style.display = "";
      
      this.framesService.setStarObj(this.starObj);
      this.framesService.startStar();
    }, 3000);
  }

  getSelectedImage(): string {
    return this.framesService.getSelectedImage();
  }
}
