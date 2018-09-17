import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initConfigMultiData = { 'firstBase': 20, 'secondBase': 70, 'minValue': -50,
  'maxValue': 100, 'minSelected': -10, 'maxSelected': 80, 'step': 2 };
  initConfigSingleData = { 'firstBase': 20, 'secondBase': 70, 'minValue': -10, 'maxValue': 100, 'minSelected': 20, 'step': 5 };
}
