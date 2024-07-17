import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarService } from './car.service';
import { Car } from './car';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'carmanagement';
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  public getCars(): void {
    this.carService.getCars().subscribe({
      next: (response: Car[]) => {
        this.cars = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao buscar os carros', error);
      }
    });
  }
}
