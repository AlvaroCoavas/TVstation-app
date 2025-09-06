import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Http } from '../../providers/http/http';

// Interfaces para la API de noticias
export interface INewsSource {
  id: string | null;
  name: string;
}

export interface INewsArticle {
  source: INewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface INewsResponse {
  status: string;
  totalResults: number;
  articles: INewsArticle[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: Http) { }

  /**
   * Obtiene las noticias principales
   * @param country Código del país (por defecto 'us')
   * @returns Observable con la respuesta de la API
   */
  getTopHeadlines(country: string = 'us'): Observable<INewsResponse> {
    const url = `${environment.newsApiUrl}/top-headlines?country=${country}&apiKey=${environment.newsApiKey}`;
    return this.http.get<INewsResponse>(url);
  }

  /**
   * Busca noticias por término
   * @param query Término de búsqueda
   * @param page Número de página (por defecto 1)
   * @param pageSize Tamaño de página (por defecto 20)
   * @returns Observable con la respuesta de la API
   */
  searchNews(query: string, page: number = 1, pageSize: number = 20): Observable<INewsResponse> {
    const url = `${environment.newsApiUrl}/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${environment.newsApiKey}`;
    return this.http.get<INewsResponse>(url);
  }

  /**
   * Obtiene noticias por categoría
   * @param category Categoría de noticias
   * @param country Código del país (por defecto 'us')
   * @returns Observable con la respuesta de la API
   */
  getNewsByCategory(category: string, country: string = 'us'): Observable<INewsResponse> {
    const url = `${environment.newsApiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${environment.newsApiKey}`;
    return this.http.get<INewsResponse>(url);
  }

  /**
   * Obtiene noticias de una fuente específica
   * @param sourceId ID de la fuente
   * @returns Observable con la respuesta de la API
   */
  getNewsBySource(sourceId: string): Observable<INewsResponse> {
    const url = `${environment.newsApiUrl}/top-headlines?sources=${sourceId}&apiKey=${environment.newsApiKey}`;
    return this.http.get<INewsResponse>(url);
  }
}