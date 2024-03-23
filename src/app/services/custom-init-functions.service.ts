import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomInitFunctionsService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public customInitFunctions(): any {
    let node = this.document.createElement('script');
    node.src = 'assets/js/custom.js';
    node.type = 'text/javascript';
    node.async = true;
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }
}
