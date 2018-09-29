import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TemperaturaPage } from '../temperatura/temperatura'

import { LuminosidadePage } from '../luminosidade/luminosidade'
import { DweetServiceProvider } from '../../providers/dweet-service/dweet-service';
import { Dweet } from '../../models/dweet';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  private thingName: any;
  private dweet: Dweet;
  private isLoading: boolean = true;
  private time: any;
  private acionado: boolean;

  constructor(public navCtrl: NavController, private dweetService: DweetServiceProvider) {
    this.time = setInterval(() => { this.getLastDweets() }, 3000)
    this.acionado = false;
  }

  ngOnInit() {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    this.getLastDweets();
  }

  ngOnDestroy() {
    clearInterval(this.time);
  }

  goToTempPage() {
    this.navCtrl.push(TemperaturaPage);
  }

  goToLumPage() {
    this.navCtrl.push(LuminosidadePage)
  }

  getLastDweets() {
    this.dweetService.loadLastDweets(this.thingName).subscribe(
      data => this.preencherDweet(data),
      err => console.log(),
      () => this.isLoading = false
    );
  }

  private preencherDweet(data: any) {
    this.dweet = this.dweetService.preencherDweet(data);

  }

  updateItem() {
    console.log(this.acionado)
    this.dweetService.postDweet('DM120_DG_BUZZER', { acionado: this.acionado }).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }


}
