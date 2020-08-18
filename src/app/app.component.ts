import { Component, ViewChild, AfterViewInit, ElementRef, OnInit, HostListener } from '@angular/core';
import { GlobeGlService } from './services/globe-gl.service';
import Globe from 'globe.gl';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  timeNow: any;
  dateNow: any;
  private tz: string;
  private globeGl: any;
  private globeContainerWidth: number;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('footer', { read: ElementRef }) footer: ElementRef;

  constructor(private globeGlService: GlobeGlService) {
    this.globeGlService = globeGlService;
    this.initDateTimeDisplay();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.globeGl = this.globeGlService.init({
      elementId: 'globe',
      topOffsetHeight: this.header.nativeElement.offsetHeight,
      bottomOffsetHeight: this.footer.nativeElement.offsetHeight,
      textureMapSrc: this.getEarthTextureMapFromTime(),
      backgroundImageSrc: '/assets/img/starscape.png',
      bumpImageSrc: '/assets/img/earth-topology.png'
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.globeGl = this.globeGlService.updateDimensions({
      globeGlInstance: this.globeGl,
      topOffsetHeight: this.header.nativeElement.offsetHeight,
      bottomOffsetHeight: this.footer.nativeElement.offsetHeight
    });
  }

  private initDateTimeDisplay() {
    this.tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeFormat = "h:mmA z";
    const dateFormat = "dddd, MMMM D, YYYY";
    this.timeNow = moment().tz(this.tz).format(timeFormat);
    this.dateNow = moment().tz(this.tz).format(dateFormat);
    setInterval(() => {
      this.timeNow = moment().tz(this.tz).format(timeFormat);
    }, 60000)
  }

  private getEarthTextureMapFromTime() {
    const earthTextureDaySrc = '/assets/img/earth-day.jpg';
    const earthTextureNightSrc = '/assets/img/earth-night.jpg';
    const hourNow = moment().tz(this.tz).hour();
    const isDayTime = hourNow > 6 && hourNow < 18;
    return isDayTime ? earthTextureDaySrc : earthTextureNightSrc;
  }
}
