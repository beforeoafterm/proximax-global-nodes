import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import Globe from 'globe.gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  headerHeight = 64;
  footerHeight = 55;
  
  private globeGl: any;
  private globeContainerHeight: number;
  private globeContainerWidth: number;

  ngOnInit() {
    this.globeContainerHeight = window.innerHeight;
    this.globeGl = Globe()
    .height(this.globeContainerHeight - this.headerHeight - this.footerHeight)
    .globeImageUrl('/assets/img/earth-night.jpg')
    .backgroundImageUrl('/assets/img/starscape.png')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    (document.getElementById('globe'));
  }
}
