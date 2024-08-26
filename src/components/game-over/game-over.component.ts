import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'game-over',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent {
  @Input() gameOver: boolean = false;
  @Input() score: number;

  restart(): void {
    window.location.reload();
  }
}
