import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LobbyComponent } from '../lobby/lobby.component';
import { Room, Player, WebsocketService } from '../../services/websocket/websocket.service';
import { interval } from 'rxjs';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [RouterLink, LobbyComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(private socketService: WebsocketService) {}
  lobby: boolean = this.socketService.isLobby();
  players: Player[] = new Array();
  clientPlayer: Player = {
    username: "",
    socketId: 0,
    score: 0,
    isReady: false,
    gameOver: false
  };
  room: Room;

  polling = interval(1000).subscribe(() => {
    if (this.lobby) {
      this.socketService.updateRoom();
      this.players = this.socketService.getPlayers();
      console.log(this.clientPlayer);
    }
  });

  toggleLobby(): void {
    this.lobby = !this.lobby;

    if (this.lobby) {
      this.socketService.createNewRoom();
    }
  }

  ngOnInit(): void {
    if (this.lobby) {
      this.socketService.joinRoom();
      setTimeout(() => {
        this.clientPlayer = this.socketService.getPlayer();
      }, 1000);
    }
  }

  getRoomCode(): string {
    return this.socketService.getRoomCode();
  }

  getRoom(): Room {
    return this.socketService.getRoom();
  }

  getPlayer(): Player {
    return this.socketService.getPlayer();
  }

  isReady(): boolean {
    return this.socketService.getPlayer().isReady;
  }

  toggleReady(): void {
    this.socketService.toggleReady();
  }
  
  @HostListener("window:beforeunload")
  closeTab(): void {
    this.socketService.removePlayer(this.lobby);
  }
}
