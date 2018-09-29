import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DweetSettingsEnum } from './../../enum/DweetSettingsEnum'
import { DweetServiceProvider } from './../../providers/dweet-service/dweet-service'
import { Dweet } from './../../models/dweet'


/**
 * Generated class for the TemperaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temperatura',
  templateUrl: 'temperatura.html',
})
export class TemperaturaPage {

  private thingName: any;
  private dweet: Dweet;
  private isLoading: boolean = true;
  private time: any;
  private dataPlot: Array<any>;

  options: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dweetService: DweetServiceProvider) {
    this.time = setInterval(() => { this.getLastDweets() }, 3000)
  }

  ngOnInit() {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    this.getLastDweets();
  }

  ngOnDestroy() {
    clearInterval(this.time);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemperaturaPage');
  }

  getLastDweets() {
    this.dataPlot = [];
    this.dweetService.loadLastDweets(this.thingName).subscribe(
      data => this.preencherDweet(data),
      err => console.log(),
      () => this.isLoading = false
    );
  }

  private preencherDweet(data: any) {
    this.dweet = this.dweetService.preencherDweet(data);

    this.loadDataForPlot(this.dweet);

    this.plotChart();
  }

  private loadDataForPlot(dweet: Dweet) {
    for (let _with of dweet.with) {
      let epoch = new Date(_with.created).getTime();
      this.dataPlot.push([epoch, _with.content.getTemperatura()])
    }
  }

  private plotChart() {
    this.options = {
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        labels: {
          formatter: function () {
            return this.value + 'ºC';
          }
        },
      },
      title: { text: 'Temperatura' },
      series: [{
        name: 'Temperatura',
        data: this.dataPlot.reverse(),
        pointInterval: 60 * 60
      }]
    };
  }

}
