import { Component } from '@angular/core';
import { HttpClientService } from 'app/lib/http/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private _http: HttpClientService) {
    _http.get("https://swapi.co/api/people/1/").subscribe(res => {
      debugger;
    });
  }
}
