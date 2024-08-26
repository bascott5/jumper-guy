import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from '../pages/game/game.component';
import { WebsocketService } from '../services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent],
  providers: [WebsocketService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'doodle-jump';

  constructor(private socketService: WebsocketService) {}
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }
}
