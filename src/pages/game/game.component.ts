import { Component, ElementRef } from '@angular/core';
import { PlayerComponent } from '../../components/player/player.component';
import { PlatformComponent } from '../../components/platform/platform.component';
import { StarComponent } from '../../components/star/star.component';
import { MobileControlsComponent } from '../../components/mobile-controls/mobile-controls.component';
import { GameStartComponent } from '../../components/game-start/game-start.component';

@Component({
  selector: 'game',
  standalone: true,
  imports: [PlayerComponent, PlatformComponent, StarComponent, MobileControlsComponent, GameStartComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  public fallingDup: boolean = false;
  public platformDup: ElementRef;
  public starDup: ElementRef;
  public playerDup: ElementRef;
  public timeDup: number;
  public touchStateDup: {};
  public scoreDup: number;

  setFalling(falling: any): void {
    this.fallingDup = falling
  }

  setPlatform(platform: any): void {
    this.platformDup = platform;
  }

  setStar(star: any): void {
    this.starDup = star;
  }

  setPlayer(player: ElementRef): void {
    this.playerDup = player;
  }

  setTime(time: number): void {
    this.timeDup = time;
  }

  setTouchState(touchState: {}): void {
    this.touchStateDup = touchState;
  }

  setScore(score: number): void {
    this.scoreDup = score;
  }
}