import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header-secondary',
  templateUrl: './header-secondary.component.html',
  styleUrls: ['./header-secondary.component.scss']
})
export class HeaderSecondaryComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
  }

  showDropdown(element: any) {
    this.renderer.addClass(element, 'show');

  }
  hide(element: any) {

    this.renderer.removeClass(element, 'show');
  }

}
