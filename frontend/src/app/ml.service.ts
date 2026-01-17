// src/app/services/ml.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlService {

  private apiUrl = 'http://localhost:5001/api'; // or your deployed API URL

  constructor(private http: HttpClient) { }

  recommendCrop(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crop-recommend`, data);
  }

  recommendFertilizer(data: any): Observable<any> {
    console.log("Sending Fertilizer Recommendation Request:", data);
    return this.http.post(`${this.apiUrl}/fertilizer-recommend`, data);
  }
  

  detectDisease(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/disease-detect`, formData);
  }
  
}
