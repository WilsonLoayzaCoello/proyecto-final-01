import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  standalone: true,
  imports: [],
  templateUrl: './nopagefound.component.html',
  styleUrls: [`./nopagefound.component.css`]
})
export default class NopagefoundComponent {

  year: number = new Date().getFullYear();

}
