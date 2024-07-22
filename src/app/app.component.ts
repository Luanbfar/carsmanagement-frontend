import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarService } from './car.service';
import { Car } from './car';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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
  selectedCarId: number | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  onOpenUpdateModal(carId: number): void {
    this.selectedCarId = carId;
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

  public onAdd(addForm: NgForm): void {
    document.getElementById("add-car-form-close-btn")?.click();
    this.carService.addCar(addForm.value).subscribe(
      (response: Car) => {
        console.log(response);
        this.getCars;
        location.reload();
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }

  public onUpdate(updateForm: NgForm): void {
    document.getElementById("update-car-form-close-btn")?.click();
    this.carService.updateCar(updateForm.value, this.selectedCarId).subscribe(
      (response: Car) => {
        console.log(response);
        this.getCars;
        location.reload();
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }
}
