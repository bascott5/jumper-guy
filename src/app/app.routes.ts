import { Routes } from '@angular/router';
import { GameComponent } from '../pages/game/game.component';
import { MenuComponent } from '../pages/menu/menu.component';

export const routes: Routes = [
    {path: "", component: MenuComponent},
    {path: "lobby/:code", component: MenuComponent},
    {path: "game", component: GameComponent},
];
