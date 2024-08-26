import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  private landing: boolean;
  private falling: boolean
  private playerObj: 

  constructor() { }

  playerAnimation(): void {
    if (this.landing) {
      this.playerObj.nativeElement.animate([
        { transform: "translateY(500px)" },
        { transform: "translateY(100px)" }
      ], { duration: 1100, delay: 0, easing: "cubic-bezier(0.1, 0.3, 0.6, 1)", iterations: Infinity, direction: "alternate" });
    } else {
      this.playerObj.nativeElement.animate([
        { transform: "translateY(600px)" },
        { transform: "translateY(1500px)" }
      ], { duration: 550, fill: "forwards" });
    }
  }

  platformAnimation(): void {
    if (this.falling) {
      this.platformObj.nativeElement.animate([
        { transform: "" },
        { transform: "" }
      ], {  });

      this.platformObj2.nativeElement.animate([
        { transform: "" },
        { transform: "" }
      ], {  });
    } else {
      this.platformObj.nativeElement.animate([
        { transform: "" },
        { transform: "" }
      ], {  });

      this.platformObj2.nativeElement.animate([
        { transform: "" },
        { transform: "" }
      ], {  });
    }
}
