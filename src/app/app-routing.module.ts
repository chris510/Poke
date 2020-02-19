import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { PokedexListComponent } from './pokedex-list/pokedex-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


const routes: Routes = [
  {
    path: 'home',
    component: PokedexListComponent,
    children: [
      { path: ':name', component: PokemonDetailComponent}
     ]
  },
  {
    path: 'team', 
    component: TeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
