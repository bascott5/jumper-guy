import { ElementRef, Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';

interface Obj {
  top: number,
  bottom: number,
  left: number,
  right: number
}

@Injectable({
  providedIn: 'root'
})
export class FramesService {
  private time: number = 1100;
  private landing: boolean = true;
  private falling: boolean = false;
  private score: number = 0;
  private screenWidth: number = window.screen.width;
  private rng: string = (Math.floor(Math.random() * (this.screenWidth - 150))) + "px";
  private images: string[] = ['star.svg', 'emergency.svg', 'oil.svg','toolkit.svg','battery.svg'];
  private selectedImage: string;
  private playerObj: ElementRef;
  private platformObj: ElementRef;
  private platformObj2: ElementRef;
  private starObj: ElementRef;
  private platformObjAnimation: Animation;
  private platformObj2Animation: Animation;

  // getters and setters
  getPlayerObj(): ElementRef {
    return this.playerObj;
  }

  setPlayerObj(playerObj: ElementRef): void {
    this.playerObj = playerObj;
  }

  getPlatformObj(): ElementRef {
    return this.platformObj;
  }

  setPlatformObj(platformObj: ElementRef): void {
    this.platformObj = platformObj;
  }

  getPlatformObj2(): ElementRef {
    return this.platformObj2;
  }

  setPlatformObj2(platformObj2: ElementRef): void {
    this.platformObj2 = platformObj2;
  }

  getStarObj(): ElementRef {
    return this.starObj;
  }

  setStarObj(starObj: ElementRef): void {
    this.starObj = starObj;
  }

  getTime(): number {
    return this.time;
  }

  getLanding(): boolean {
    return this.landing;
  }

  getFalling(): boolean {
    return this.falling;
  }

  setFalling(falling: boolean): void {
    this.falling = falling;
  }

  getScore(): number {
    return this.score;
  }

  getSelectedImage(): string {
    return this.selectedImage;
  }

  private movementObservable: Subscription = interval(10).subscribe(() => this.movementFrames());
  private landingObservable: Subscription;
  private fallingObservable: Subscription;

  startTime(): void {
    this.landingObservable = interval(this.time * 2).subscribe(() => this.landingFrames());
    this.fallingObservable = interval(this.time).subscribe(() => this.fallingFrames());
  }

  stopTime(): void {
    this.landingObservable.unsubscribe();
    this.fallingObservable.unsubscribe();
  }

  changeTime(): void {
    this.stopTime();
    this.time -= 50;
    this.startTime();
  }

  // player
  startPlayer(): void {
    this.playerAnimation();
    this.playerObj.nativeElement.style.left = (this.screenWidth / 2) + "px";

    this.landingObservable = interval(this.time * 2).subscribe(() => this.landingFrames());
    this.fallingObservable = interval(this.time).subscribe(() => this.fallingFrames());
  }

  movementFrames(): void {
    if (this.starObj != undefined) {
      const playerPos: DOMRect = this.playerObj.nativeElement.getBoundingClientRect();
      const starPos: DOMRect = this.starObj.nativeElement.getBoundingClientRect();

      if (this.checkOverlap(playerPos, starPos)) {
          this.starObj.nativeElement.style.display = "none";
          this.score += 100;
      }
    }
  }

  fallingFrames(): void {
    if (this.landing) {
      this.falling = !this.falling;
    } else {
      this.falling = true;
    }
  }

  landingFrames(): void {
    if (this.platformObj.nativeElement.className == "platform") {
      const playerX: DOMRect = this.playerObj.nativeElement.getBoundingClientRect();
      const platformX: DOMRect = this.platformObj.nativeElement.getBoundingClientRect();
      if (this.landing && !(playerX.right < platformX.left || playerX.left > platformX.right)) {
        this.score += 100;

        if (this.score % 500 == 0 || this.score == 0) {
          this.changeTime();
        }
      } else {
        this.landing = false
        this.playerObj.nativeElement.style.class = 'fall';

        this.stopTime();
      }
    }

    this.playerAnimation();
    this.platformFrames();
    this.changeStar();
  }

  playerAnimation(): void {
    if (this.landing) {
      if (this.screenWidth <= 450){
        this.playerObj.nativeElement.animate([
          { transform: "translateY(520px)" },
          { transform: "translateY(100px)" }
        ], { duration: this.time, delay: 0, easing: "cubic-bezier(0.1, 0.3, 0.6, 1)", iterations: Infinity, direction: "alternate" });
  
      } else if (this.screenWidth <= 800) {
        this.playerObj.nativeElement.animate([
          { transform: "translateY(325px)" },
          { transform: "translateY(100px)" }
        ], { duration: this.time, delay: 0, easing: "cubic-bezier(0.1, 0.3, 0.6, 1)", iterations: Infinity, direction: "alternate" });
      } else {
        this.playerObj.nativeElement.animate([
          { transform: "translateY(500px)" },
          { transform: "translateY(100px)" }
        ], { duration: this.time, delay: 0, easing: "cubic-bezier(0.1, 0.3, 0.6, 1)", iterations: Infinity, direction: "alternate" });
      }
      
    } else {
      this.playerObj.nativeElement.animate([
        { transform: "translateY(600px)" },
        { transform: "translateY(1500px)" }
      ], { duration: this.time / 2, fill: "forwards" });
    }
  }
  
  // platform
  startPlatform(): void {
    this.platformAnimation();
    this.platformObj.nativeElement.style.left = ((this.screenWidth / 2) - (this.screenWidth <= 700 ? 0 : 100)) + "px";
    this.platformFrames();
    this.platformObj2.nativeElement.style.left = this.rng;
  }

  platformFrames(): void {
    if (this.landing) {
      this.platformAnimation();

      this.platformObjAnimation.onfinish = (e: AnimationPlaybackEvent) => {
        this.platformObj.nativeElement.style.left = this.platformObj2.nativeElement.style.left;
        this.rng = (Math.floor(Math.random() * (this.screenWidth - (this.screenWidth <= 700 ? 150 : 300)))) + "px";
        this.platformObj2.nativeElement.style.left = this.rng;

        this.platformObj2.nativeElement.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], { duration: this.time / 2 });
      }
    }
  }

  platformAnimation(): void {
    if (this.screenWidth <= 450) {
      this.platformObjAnimation = this.platformObj.nativeElement.animate([  
        { transform: "translateY(700px)" },
        { transform: "translateY(0px)" }
      ], { duration: this.time - 3, direction: "reverse" });

      this.platformObj2Animation = this.platformObj2.nativeElement.animate([
        { transform: "translateY(0px)" },
        { transform: "translateY(500px)" }
      ], { duration: this.time - 3,direction: "alternate" });
    } else if (this.screenWidth <= 700) {
      this.platformObjAnimation = this.platformObj.nativeElement.animate([  
        { transform: "translateY(700px)" },
        { transform: "translateY(0px)" }
      ], { duration: this.time - 3, direction: "reverse" });

      this.platformObj2Animation = this.platformObj2.nativeElement.animate([
        { transform: "translateY(0px)" },
        { transform: "translateY(320px)" }
      ], { duration: this.time- 3, direction: "alternate" });
    } else {
      this.platformObjAnimation = this.platformObj.nativeElement.animate([
        { transform: "translateY(800px)" },
        { transform: "translateY(0px)" }
      ], { duration: this.time - 3, direction: "reverse" });

      this.platformObj2Animation = this.platformObj2.nativeElement.animate([
        { transform: "translateY(0px)" },
        { transform: "translateY(600px)" }
      ], { duration: this.time - 3, direction: "alternate" });
    }
  }

  // star
  startStar(): void {
    this.starObj.nativeElement.style.display = 'none';
  }

  checkOverlap(rect1: DOMRect | Obj, rect2: DOMRect | Obj): boolean {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
  }

  changeStar(): void {
    this.selectRandomImage();
    const playerPos: DOMRect = this.playerObj.nativeElement.getBoundingClientRect();
    const platformPos: DOMRect = this.platformObj.nativeElement.getBoundingClientRect();
    const platform2Pos: DOMRect = this.platformObj2.nativeElement.getBoundingClientRect();
    const starPos: DOMRect = this.starObj.nativeElement.getBoundingClientRect();

    if (this.falling && this.landing) {
      const randomBottom = (Math.floor(Math.random() * 250) + 150) + "px";
      const randomLeft = (Math.floor(Math.random() * (playerPos.left - 250)) + 250) + "px";
      const randomRight = (Math.floor(Math.random() * (playerPos.right + 250)) + ((this.screenWidth - 200) - (playerPos.right + 250))) + "px";

      this.starObj.nativeElement.style.bottom = randomBottom;
      if ((this.screenWidth / 2) - playerPos.right >= 0) {
        this.starObj.nativeElement.style.right = "";
        this.starObj.nativeElement.style.left = (Math.floor(Math.random() * (playerPos.left - 300)) + 100) + "px";
      } else {
        this.starObj.nativeElement.style.left = "";
        this.starObj.nativeElement.style.right = (Math.floor(Math.random() * (playerPos.right + 250)) + ((this.screenWidth - 200) - (playerPos.right + 250))) + "px";
      }
      this.starObj.nativeElement.style.left = this.screenWidth - playerPos.right >= 0 ? randomLeft : randomRight;
      this.starObj.nativeElement.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], { duration: 50 });
      this.starObj.nativeElement.style.display = 'none';
      
      setTimeout(() => {
        this.starObj.nativeElement.style.display = 'block';
      }, this.time);

      if (this.playerObj != undefined) {
        if (this.checkOverlap(playerPos, starPos) || this.checkOverlap(platformPos, starPos) || this.checkOverlap(platform2Pos, starPos)) {
          this.starObj.nativeElement.style.display = 'none';
          this.starObj.nativeElement.style.left = "-100px"
        }
      }
    } else {
      this.starObj.nativeElement.style.display = 'none';
    }
  }

  private selectRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[randomIndex];
    this.starObj.nativeElement.src = this.selectedImage;
  }

  reset(): void {
    this.time = 1100;
    this.landing = true;
    this.falling = false;
    this.score = 0;
    this.screenWidth = window.screen.width;
    this.rng = (Math.floor(Math.random() * (this.screenWidth - 150))) + "px";
    this.images = ['star.svg', 'emergency.svg', 'oil.svg','toolkit.svg','battery.svg'];
    this.selectedImage = "";
    this.playerObj = undefined;
    this.platformObj = undefined;
    this.platformObj2 = undefined;
    this.starObj = undefined;
  }
}