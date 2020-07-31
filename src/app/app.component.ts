import { Component, ViewChild, AfterViewInit, ElementRef, OnInit, HostListener } from '@angular/core';
import Globe from 'globe.gl';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  timeNow: any;
  private tz: string;
  private globeGl: any;
  private globeContainerWidth: number;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('footer', { read: ElementRef }) footer: ElementRef;

  constructor() {
    this.initClock();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initGlobe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.globeGl.width(event.target.innerWidth);
    this.globeGl.height(this.computeGlobeContainerHeight(event.target.innerHeight));
  }

  private initClock() {
    this.tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeFormat = "hh:mmA z";
    this.timeNow = moment().tz(this.tz).format(timeFormat);
    setInterval(() => {
      this.timeNow = moment().tz(this.tz).format(timeFormat);
    }, 60000)
  }

  private initGlobe() {
    this.globeGl = Globe()
      .height(this.computeGlobeContainerHeight(window.innerHeight))
      .globeImageUrl(this.getEarthTextureMap())
      .backgroundImageUrl('/assets/img/starscape.png')
      .bumpImageUrl('/assets/img/earth-topology.png')
      (document.getElementById('globe'));
  }

  private getEarthTextureMap() {
    const earthTextureDaySrc = '/assets/img/earth-day.jpg';
    const earthTextureNightSrc = '/assets/img/earth-night.jpg';
    const hourNow = moment().tz(this.tz).hour();
    const isDayTime = hourNow > 6 && hourNow < 18;
    return isDayTime ? earthTextureDaySrc : earthTextureNightSrc;
  }

  private computeGlobeContainerHeight(windowHeight: number) {
    const headerHeight = this.header.nativeElement.offsetHeight;
    const footerHeight = this.footer.nativeElement.offsetHeight;
    const globeGlContainerMargin = 4;
    return windowHeight - headerHeight - footerHeight - globeGlContainerMargin;
  }
}
