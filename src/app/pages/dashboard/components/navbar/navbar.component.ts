import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef,private activateSnapshot:ActivatedRoute) { }
   step="step1"
  ngOnInit(): void {
    if((this.activateSnapshot.snapshot.routeConfig?.path)?.includes("master")){
      this.step="step2"

    }
  }

  showDropdown(element: any,step:string) {
    this.renderer.addClass(element, 'show');
    // this.step=step;

  }
  hide(element: any) {

    this.renderer.removeClass(element, 'show');
  }
}
