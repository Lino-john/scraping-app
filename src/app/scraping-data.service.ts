import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScrapingDataService {
  private scrapeUrl = '/api/scrape'; // Update the URL if necessary

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.scrapeUrl);
  }
}
