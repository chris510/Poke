import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageServiceService } from '../services/data-storage-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  fetchSub: Subscription

  constructor(
    private dataStorageService: DataStorageServiceService
  ) { }

  ngOnInit(): void {

  }

  onSaveData() {
    this.dataStorageService.storePokemon();
  }

  onFetchData() {
    this.fetchSub = this.dataStorageService.fetchPokemon().subscribe();
  }

  ngOnDestroy() {
    this.fetchSub.unsubscribe();
  }

}
