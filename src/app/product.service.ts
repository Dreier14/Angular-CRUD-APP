import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from "./product";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



// const products = [
//   {
//   id:1,
//   name: "Fender Stratocaster",
//   price: 700

//   },
//   {
//     id:2,
//     name: "DW Drumset",
//     price: 1000

//   },
//   {
//     id:3,
//     name: "Hammond B3 Organ",
//     price: 2000

//   }
// ]

const httpOptions ={
  headers: new HttpHeaders({ 'Contnent-Type': 'application/json'})
}

@Injectable({ providedIn: 'root'})
export class ProductService {

  constructor(private http: HttpClient) { }

  private productsUrl ='api/products';

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.log(error, `Operation: ${operation}`)

      return of(result as T)
    }
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => console.log('Instruments') ),
        catchError(this.handleError('getProducts', []))
      )
  }

  getProduct(id: number): Observable<Product>{
    const url = `${this.productsUrl}/${id}`;

    return this.http.get<Product>(url).pipe(
      tap( () => console.log(`Fetched Instrument id ${id}`)),
      catchError(this.handleError<Product>(`getProduct id =${id}`))
    );
  }

  updateProduct(product: Product): Observable<any>{
    return this.http.put(this.productsUrl, product, httpOptions).pipe(
      tap( () => console.log( `Updated Instrument id = ${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    )
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
      tap(((product: Product) => console.log(`Added instrument with id ${product.id}`)),
      catchError(this.handleError<Product>('addProduct')))
    )
  }

  deleteProduct(productId: number): Observable<Product>{
    const url = `${this.productsUrl}/${productId}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(() => console.log(`Deleted product of id ${productId}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    )
  }
}
