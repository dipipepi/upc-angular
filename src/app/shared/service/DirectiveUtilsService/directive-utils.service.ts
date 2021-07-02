import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectiveUtilsService {

  constructor() { }

  fitDropdownPosition(base: object, preferredPositionRtl?: any, useBaseWidth?: any): object {
    // the idea is to put dropdown block right under base element if it fits
    // into free space on the screen, or put dropdown before base element otherwise
    if (!base) {
      return;
    }
    // @ts-ignore
    const baseElement = $(base);

    // @ts-ignore
    const dropdown = baseElement.find('.dropdown-block');
    if (!dropdown) {
      return;
    }
    // @ts-ignore
    const dropdownElement = $(dropdown);

    // top === 0 for mobile dropdown where it should be fullsreen
    if (dropdownElement.offset().top === 0) {
      return;
    }

    const preferredPosition = {
      left: baseElement.offset().left,
      top: baseElement.offset().top + baseElement.outerHeight() // + parseInt(dropdownElement.css('top')) || 0
    };

    // set position
    dropdownElement.offset({
      top: preferredPosition.top,
      left: preferredPosition.left
    });

    // @ts-ignore
    const windowHeight = $(window).height();
    const baseElementPosition = baseElement.offset().top + baseElement.height();
    const currentDropdownHeight = dropdownElement.height();

    const shouldFitTopPosition = () => {
      if(baseElementPosition < (windowHeight / 2) + 50){
        return false;
      } else {
        return windowHeight - (baseElementPosition + currentDropdownHeight) < 10;
      }
    };

    // fit width if needed
    if (useBaseWidth) {
      dropdownElement.width(baseElement.css('width'));
    }

    // fit top
    if (shouldFitTopPosition()) {
      dropdownElement[0].style.maxHeight = currentDropdownHeight + 'px';
      preferredPosition.top = baseElement.offset().top - dropdownElement.outerHeight(); // - parseInt(dropdownElement.css('top')) || 0;
    }

    // fit left
    if (preferredPositionRtl) {
      preferredPosition.left = baseElement.offset().left + baseElement.width() - dropdownElement.width();
    } else {
      if (!useBaseWidth && window.innerWidth - baseElement.offset().left < dropdownElement.width()) {
        dropdownElement.width(window.innerWidth - baseElement.offset().left);
      }
    }

    if (preferredPosition.left < 0) {
      preferredPosition.left = 5;
    }

    // set position
    dropdownElement.offset({
      top: preferredPosition.top
    });

    if(!baseElement.hasClass('broadcast-profiles')){
      dropdownElement.offset({
        left: preferredPosition.left
      });
    }

    return preferredPosition;
  }
}
