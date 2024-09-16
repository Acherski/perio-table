import { Component } from '@angular/core';
import { MainComponent } from '@features/views';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
