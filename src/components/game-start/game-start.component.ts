import { Component, ViewChild, ElementRef } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'game-start',
  standalone: true,
  imports: [],
  templateUrl: './game-start.component.html',
  styleUrl: './game-start.component.css'
})
export class GameStartComponent {
  @ViewChild("gameStartObj") gameStartObj: ElementRef;
  countdown: number = 3;

  source = interval(1000).subscribe(() => {
    if (this.countdown != 1) {
      this.countdown -= 1;
    } else {
      this.gameStartObj.nativeElement.style.display = "none";
      this.source.unsubscribe();
    }
  });
}
