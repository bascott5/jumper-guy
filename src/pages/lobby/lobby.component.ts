import { Component } from '@angular/core';

@Component({
  selector: 'lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
  players: string[] = new Array();
  link: string = "This is a link";
}
