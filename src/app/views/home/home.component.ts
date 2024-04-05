import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="d-flex mt-5 align-items-center justify-content-center">
      <p>
        This project is my homepage.
      </p>
      <br>
      <div class="flex justify-content-center ">
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}
