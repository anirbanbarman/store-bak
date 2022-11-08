import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  firstname:any="";
  lastname:any="";

  constructor(private renderer: Renderer2, private el: ElementRef) 
  {
    this.firstname=localStorage.getItem("firstname");
    this.lastname=localStorage.getItem("lastname");
  }

  ngOnInit(): void {
   
  }

  showDropdown(element: any) {
    this.renderer.addClass(element, 'show');

  }
  hide(element: any) {

    this.renderer.removeClass(element, 'show');
  }
  showSideBar() {

    this.renderer.addClass(document.body, 'az-iconbar-show');
  }




}
