import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class TableApiService {
  httpService = inject(HttpClient);
  baseUrl = '/assets/data-mock.txt';

  public loadList() {
    return this.httpService.get(this.baseUrl, { responseType: 'text' });
  }
}
