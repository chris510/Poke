import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemon = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getPokemon(pokemonName: string) {
    return this.http.get(`
      https://pokeapi.co/api/v2/pokemon/${pokemonName}/
    `).pipe(
      tap(pokemonData => {
        this.pokemon.next(pokemonData);
      })
    )
  }
}
