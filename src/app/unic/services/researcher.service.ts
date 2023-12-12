import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Researcher } from '../services/researcher';
import { ScidarEmail } from '../services/scidar-email';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {

  //private researcherServiceURL = 'https://api.dspace.unic.kg.ac.rs/scidar-orcid-app/researchers';
  private researcherServiceURL =  environment.unic.researcherServiceURL;
  //private orcidUrl = 'https://api.dspace.unic.kg.ac.rs/server/api';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Dependency injection
  constructor(private http: HttpClient) {}

  // GET metoda za preuzimanje podataka o istrazivacu
  getResearcher(id: string): Observable<Researcher> {
    // const url = `${this.researcherServiceURL}researcher/${id}`;
    const url = `${this.researcherServiceURL}/researchers/getresearcher/${id}`;
    console.log('-----' + this.researcherServiceURL);
    return this.http.get<Researcher>(url).pipe(
      tap(_ => this.log(`fetchovao istrazivaca id=${id}`)),
      catchError(this.handleError<Researcher>(`researcher id=${id}, url=${url}`))
    );
  }

  // POST metoda za slanje mejla
  reportErrorInItem(scidar_email: ScidarEmail): Observable<ScidarEmail> {
    const url = `${this.researcherServiceURL}/reporterrorinitem`;
    return this.http.post<ScidarEmail>(url, scidar_email);
  }

  private log(poruka: string) {
    console.log(`OrcidService: ${poruka}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
