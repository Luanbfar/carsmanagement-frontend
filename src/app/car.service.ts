import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './car';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiServerURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerURL}/car`);
  }

  public addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiServerURL}/car/add`, car);
  }

  public updateCar(car: Partial<Car>, carId: number | null): Observable<Car> {
    return this.http.put<Car>(`${this.apiServerURL}/car/update/${carId}`, car);
  }

  public deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/car/delete${carId}`)
  }

}
