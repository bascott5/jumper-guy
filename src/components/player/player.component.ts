import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { GameOverComponent } from '../game-over/game-over.component';
import { ScoreComponent } from '../score/score.component';
import { FramesService } from '../../services/frames/frames.service';

@Component({
  selector: 'player',
  standalone: true,
  imports: [GameOverComponent, ScoreComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  constructor(private framesService: FramesService) {}

  @ViewChild("playerObj") playerObj: ElementRef;
  @Input() touchState: {};
  private screenWidth = window.screen.width;
  private keyState = {};
  left: boolean = false;

  public movementFrames = interval(10).subscribe(() => {
    if (this.touchState != undefined) {
      this.keyState = this.touchState;
    }

    if (this.keyState["ArrowLeft"] && this.playerObj.nativeElement.getBoundingClientRect().left > 0) {
      this.playerObj.nativeElement.style.left = parseInt(this.playerObj.nativeElement.style.left) - 10 + "px";
      this.left = true;
    }

    if (this.keyState["ArrowRight"] && this.playerObj.nativeElement.getBoundingClientRect().right < this.screenWidth) {
      this.playerObj.nativeElement.style.left = parseInt(this.playerObj.nativeElement.style.left) + 10 + "px";
      this.left = false;
    }
  });

  ngAfterViewInit(): void {
    this.playerObj.nativeElement.style.display = "none";

    setTimeout(() => {
      this.playerObj.nativeElement.style.display = "";
      
      this.framesService.setPlayerObj(this.playerObj);
      this.framesService.startPlayer();
    }, 3000);
  }

  ngOnDestroy(): void {
    this.framesService.reset();
  }

  @HostListener("window:keydown", ["$event"])
  move(event: KeyboardEvent) {
    this.keyState[event.key] = true;
  }
  
  @HostListener("window:keyup", ["$event"])
  stop(event: KeyboardEvent) {
    this.keyState[event.key] = false;
  }

  getScore(): number {
    return this.framesService.getScore();
  }

  getLanding(): boolean {
    return this.framesService.getLanding();
  }
}