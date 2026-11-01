import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  product: any = null;
  loading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.apiService.getProductById(id).subscribe({
        next: (response: any) => {
          this.product = response.data;
          this.loading = false;
          this.cdr.detectChanges();
          console.log('Товар загружен:', this.product);
        },
        error: (err) => {
          console.error('Ошибка при загрузке товара:', err);
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    }
  }
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
