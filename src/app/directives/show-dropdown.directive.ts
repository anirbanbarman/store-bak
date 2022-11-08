import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowDropdown]'
})
export class ShowDropdownDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'show');
  }

}

