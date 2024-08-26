import { Component, HostListener, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'mobile-controls',
  standalone: true,
  imports: [],
  templateUrl: './mobile-controls.component.html',
  styleUrl: './mobile-controls.component.css'
})
export class MobileControlsComponent implements AfterViewInit {
  @ViewChild("left") leftRef: ElementRef;
  @ViewChild("right") rightRef: ElementRef;
  touchState: {} = {};
  @Output() outputTouchState = new EventEmitter<{}>();

  ngAfterViewInit(): void {
    this.outputTouchState.emit(this.touchState);
  }

  @HostListener("window:pointerdown", ["$event"])
  move(event: PointerEvent): void {
    this.touchState[(event.target as Element).className] = true;
    this.outputTouchState.emit(this.touchState);
  }

  @HostListener("window:pointerup", ["$event"])
  stop(event: PointerEvent) {
    this.touchState[(event.target as Element).className] = false;
    this.outputTouchState.emit(this.touchState);
  }
}
