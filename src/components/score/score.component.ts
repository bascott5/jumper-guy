import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements AfterViewInit {
  constructor(private socketService: WebsocketService) {}
  @ViewChild("scoreObj") scoreObj: ElementRef;
  @Input() score: number;
  
  updateScore() {
    this.socketService.getRoom().players.sort((player1, player2) => {
      return player1.score - player2.score;
    });
  }

  ngAfterViewInit(): void {
    this.scoreObj.nativeElement.style.display = "none";

    setTimeout(() => {
      this.scoreObj.nativeElement.style.display = "";
    }, 3000)
  }
}
