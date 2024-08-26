import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { Router } from '@angular/router';

export interface Room {
  players: Player[],
  gameInProgress: boolean
}

export interface Player {
  username: string,
  socketId: number,
  score: number,
  isReady: boolean,
  gameOver: boolean
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;
  private roomCode: string;
  private room: Room;
  private player: Player;
  constructor(private router: Router) {}

  setupSocketConnection(): void {
    this.socket = io("http://localhost:3000");
    this.socket.emit("test", "Socket is connected!");
    this.socket.emit("checkURL", this.router.url);
  }

  getRoomCode(): string {
    return this.roomCode;
  }

  createNewRoom(): void {
    this.socket.emit("createRoom");
    this.socket.on("roomCode", (code: string) => {
      if (typeof code != undefined) {
        this.roomCode = code;
        this.router.navigate(["/lobby/" + code]);
      }
    });
    
    this.socket.on("error", function (err) {
      console.error(err)
    });
  }

  getRoom(): Room {
    return this.room;
  }

  getPlayers(): Player[] {
    return this.room.players;
  }

  getPlayer(): Player {
    return this.player;
  }

  toggleReady(): void {
    this.player.isReady = !this.player.isReady;
    /*for (let i = 0; i < this.room.players.length; i++) {
      if (this.player.socketId == this.room.players[i].socketId) {
        this.room.players[i] = this.player;
      }
    }*/
  }

  joinRoom(): void {
    const url = this.router.url.split("/");
    const slug: string = url.pop();
    
    if (url[1] == "lobby" && slug != "") {
      this.socket.emit("joinRoom", slug);
      this.socket.on("enterRoom", (roomData: Room, playerData: Player) => {
        this.room = roomData;
        this.player = playerData;
      });
    }
    this.roomCode = slug;

    this.socket.on("error", function (err) {
      console.error(err);
    });
  }

  isLobby(): boolean {
    const url = this.router.url.split("/");
    return url[1] == "lobby" && url.pop() != "";
  }

  updateRoom(): void {
    /*this.socket.on("requestRoomCode", () => {
      this.socket.emit("updateRoom", this.roomCode);
    });

    this.socket.on("finishUpdate", (room: Room) => {
      this.room = room;
      console.log(this.room)
    });*/

    for (let i = 0; i < this.room.players.length; i++) {
      if (this.player.socketId == this.room.players[i].socketId) {
        this.room.players[i] = this.player
      }
    }

    this.socket.emit("updateRoom", this.roomCode, this.room);
    this.socket.on("finishUpdate", (room: Room) => {
      this.room = room;
    });
    this.socket.on("startGame", () => {
      console.log(this.router.url)
    })
  }

  removePlayer(lobby): void {
    if (lobby) {
      this.socket.emit("removePlayer", this.roomCode);
    }
  }
}
