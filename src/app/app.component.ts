import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import Globe from 'globe.gl';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  timeNow: any;
  private globeGl: any;
  private globeContainerHeight: number;
  private globeContainerWidth: number;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('footer', { read: ElementRef }) footer: ElementRef;

  constructor() {
    this.initClock();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initGlobe();
  }

  private initClock() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.timeNow = moment().tz(tz).format("hh:mmA z");
    setInterval(() => {
      this.timeNow = moment().tz(tz).format("hh:mmA z");
    }, 60000)
  }

  private initGlobe() {
    const headerHeight = this.header.nativeElement.offsetHeight;
    const footerHeight = this.footer.nativeElement.offsetHeight;
    const globeGlContainerMargin = 4;
    this.globeContainerHeight = window.innerHeight - headerHeight - footerHeight - globeGlContainerMargin;
    this.globeGl = Globe()
    .height(this.globeContainerHeight)
    .globeImageUrl('/assets/img/earth-night.jpg')
    .backgroundImageUrl('/assets/img/starscape.png')
    .bumpImageUrl('/assets/img/earth-topology.png')
    (document.getElementById('globe'));
  }
}
