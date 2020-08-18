import { Injectable } from '@angular/core';
import Globe from 'globe.gl';

@Injectable({
  providedIn: 'root'
})
export class GlobeGlService {

  constructor() { }

  // These are the excess margins from the globe.gl library
  private excessContainerMarginHeight = 4;
  private excessContainerMarginWidth = 0;

  init({elementId = 'globeGl',
        height = window.innerHeight,
        width = window.innerWidth,
        topOffsetHeight = 0,
        bottomOffsetHeight = 0,
        leftOffsetWidth = 0,
        rightOffsetWidth = 0,
        textureMapSrc = '',
        backgroundImageSrc = '',
        bumpImageSrc = ''}) {
    let globe = Globe().height(height).width(width);
    if (topOffsetHeight || bottomOffsetHeight) {
      globe.height(this.computeContainerHeight(height, topOffsetHeight, bottomOffsetHeight))
    }

    if (leftOffsetWidth || rightOffsetWidth) {
      globe.width(this.computeContainerWidth(width, leftOffsetWidth, rightOffsetWidth))
    }

    globe.globeImageUrl(textureMapSrc)
      .backgroundImageUrl(backgroundImageSrc)
      .bumpImageUrl(bumpImageSrc)
      (document.getElementById(elementId));

    return globe;
  }

  computeContainerHeight(height: number, topOffsetHeight: number = 0, bottomOffsetHeight: number = 0) {
    return height - topOffsetHeight - bottomOffsetHeight - this.excessContainerMarginHeight;
  }

  computeContainerWidth(width: number, leftOffsetWidth: number = 0, rightOffsetWidth: number = 0) {
    return width - leftOffsetWidth - rightOffsetWidth - this.excessContainerMarginWidth;
  }
}
