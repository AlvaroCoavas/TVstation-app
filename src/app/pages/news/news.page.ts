import { Component, OnInit } from '@angular/core';
import { NewsService, INewsArticle } from 'src/app/shared/services/news/news.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: false,
})
export class NewsPage implements OnInit {
  public articles: INewsArticle[] = [];
  public loading: boolean = true;
  public error: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  /**
   * Carga las noticias principales
   */
  private loadNews(): void {
    this.loading = true;
    this.error = '';
    
    this.newsService.getTopHeadlines('us').subscribe({
      next: (response) => {
        this.articles = response.articles.filter(article => 
          article.title && 
          article.description && 
          article.urlToImage
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
        this.error = 'Error al cargar las noticias. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  /**
   * Refresca las noticias
   */
  public refreshNews(event?: any): void {
    this.loadNews();
    if (event) {
      event.target.complete();
    }
  }

  /**
   * Abre un artículo en el navegador
   */
  public openArticle(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Formatea la fecha de publicación
   */
  public formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
}