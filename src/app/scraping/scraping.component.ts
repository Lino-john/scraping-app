import { Component, OnInit } from '@angular/core';
import { ScrapingDataService } from '../scraping-data.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-scraping',
  templateUrl: './scraping.component.html',
  styleUrls: ['./scraping.component.scss'],
})
export class ScrapingComponent implements OnInit {
  products: Product[] = [];
  constructor(private scrapingDataService: ScrapingDataService) {}
  ngOnInit() {
    this.scrapingDataService.getProducts().subscribe(
      (response: any) => {
        this.products = response.results;
      },
      (error: any) => {
        console.error(
          'An error occurred while retrieving scraped data:',
          error
        );
      }
    );
  }
}
