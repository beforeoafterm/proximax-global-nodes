import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import Globe from 'globe.gl';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  headerHeight = 64;
  footerHeight = 55;
  
  timeNow: any;
  private globeGl: any;
  private globeContainerHeight: number;
  private globeContainerWidth: number;

  ngOnInit() {
    this.globeContainerHeight = window.innerHeight;
  constructor() {
    this.initClock();
  }
  private initClock() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.timeNow = moment().tz(tz).format("hh:mmA z");
    setInterval(() => {
      this.timeNow = moment().tz(tz).format("hh:mmA z");
    }, 60000)
  }
    this.globeGl = Globe()
    .height(this.globeContainerHeight - this.headerHeight - this.footerHeight)
    .globeImageUrl('/assets/img/earth-night.jpg')
    .backgroundImageUrl('/assets/img/starscape.png')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    (document.getElementById('globe'));
  }
}
