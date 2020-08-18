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

  /**
   * Initialize a GlobeGL Instance.
   * @param {string} elementId - The HTML Element ID where to place the GlobeGL Instance.
   * @param {number} height - The height of the GlobeGL instance container.
   * @param {number} width - The width of the GlobeGL instance container.
   * @param {number} topOffsetHeight - The height to be removed from the top of the GlobeGL instance container.
   * @param {number} bottomOffsetHeight - The height to be removed from the bottom of the GlobeGL instance container.
   * @param {number} leftOffsetWidth - The width to be removed from the left of the GlobeGL instance container.
   * @param {number} rightOffsetWidth - The width to be removed from the right of the GlobeGL instance container.
   * @param {string} textureMapSrc - The source file for the globe texture map.
   * @param {string} backgroundImageSrc - The source file for the background image.
   * @param {string} bumpImageSrc - The source file for the globe bump image.
   */
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
      globe.height(this.computeContainerHeight({height, topOffsetHeight, bottomOffsetHeight}))
    }

    if (leftOffsetWidth || rightOffsetWidth) {
      globe.width(this.computeContainerWidth({width, leftOffsetWidth, rightOffsetWidth}))
    }

    globe.globeImageUrl(textureMapSrc)
      .backgroundImageUrl(backgroundImageSrc)
      .bumpImageUrl(bumpImageSrc)
      (document.getElementById(elementId));

    return globe;
  }

  /**
   * Update the Container Dimensions of the given GlobeGL Instance.
   * @param {typeof Globe} globeGlInstance - The GlobeGL instance to update.
   * @param {number} width - The original width of the container.
   * @param {number} leftOffsetWidth - The width to be removed from the left of the GlobeGL instance container.
   * @param {number} rightOffsetWidth - The width to be removed from the right of the GlobeGL instance container.
   * @param {number} height - The original height of the container.
   * @param {number} topOffsetHeight - The height to be removed from the top of the GlobeGL instance container.
   * @param {number} bottomOffsetHeight - The height to be removed from the bottom of the GlobeGL instance container.
   */
  updateDimensions({globeGlInstance,
                    width = window.innerWidth,
                    leftOffsetWidth = 0,
                    rightOffsetWidth = 0,
                    height = window.innerHeight,
                    topOffsetHeight = 0,
                    bottomOffsetHeight = 0}) {
    return globeGlInstance
      .width(this.computeContainerWidth({width, leftOffsetWidth, rightOffsetWidth}))
      .height(this.computeContainerHeight({height, topOffsetHeight, bottomOffsetHeight}));
  }

  /**
   * Computes the GlobeGL Container Height.
   * @param {number} height - The original height of the container.
   * @param {number} topOffsetHeight - The height to be removed from the top of the GlobeGL instance container.
   * @param {number} bottomOffsetHeight - The height to be removed from the bottom of the GlobeGL instance container.
   */
  private computeContainerHeight({height = window.innerHeight, topOffsetHeight = 0, bottomOffsetHeight = 0}) {
    return height - topOffsetHeight - bottomOffsetHeight - this.excessContainerMarginHeight;
  }

  /**
   * Computes the GlobeGL Container Width.
   * @param {number} width - The original width of the container.
   * @param {number} leftOffsetWidth - The width to be removed from the left of the GlobeGL instance container.
   * @param {number} rightOffsetWidth - The width to be removed from the right of the GlobeGL instance container.
   */
  private computeContainerWidth({width = window.innerWidth, leftOffsetWidth = 0, rightOffsetWidth = 0}) {
    return width - leftOffsetWidth - rightOffsetWidth - this.excessContainerMarginWidth;
  }
}
