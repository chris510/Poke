import { Injectable, OnInit } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService implements OnInit {
  myTeamChanged = new Subject<Pokemon[]>();
  myPokemonTeam: Pokemon[] = [];

  constructor() { }

  ngOnInit() {
  }

  getTeam() {
    return this.myPokemonTeam.slice();
  }

  addToTeam(pokemon: Pokemon) {
    this.myPokemonTeam.push(pokemon);
    this.myTeamChanged.next(this.myPokemonTeam.slice());
    console.log(this.myPokemonTeam);
  }
}
