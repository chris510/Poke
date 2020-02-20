import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyTeamService } from '../my-team.service';
import { Pokemon } from '../pokemon.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  myTeam: Pokemon[] = [];
  myTeamSub: Subscription;

  constructor(
    private pokemonTeam: MyTeamService
  ) { }

  ngOnInit(): void {
    this.myTeam = this.pokemonTeam.getTeam();
    // this.myTeamSub = this.pokemonTeam.myTeamChanged.subscribe(
    //   (myPokemonTeam: Pokemon[]) => {
    //     console.log(myPokemonTeam);
    //     this.myTeam = myPokemonTeam;
    //   }
    // )
  }

  ngOnDestroy() {
  }

}
