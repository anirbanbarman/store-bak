import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  IsLoading$: any;

  constructor(private service:LoaderService) { }

  ngOnInit(): void {


    this.IsLoading$ = this.service.emitter.asObservable();
    this.service.emitter.subscribe(s=>{
      console.log("a",s)
    })
  }

}
