import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modele/user';

@Injectable({
  providedIn: 'root'
})
export class PatientService{

 
  private getAllPatientt="http://localhost:8281/patient/all";
  private getPatienttByMG ="http://localhost:8281/patient/patiente"  ;
  private suppressionApartirGeneraliste ="http://localhost:8281/patient/deletepatient" ;
  private getPatientt = "http://localhost:8281/patient/get";
  private delete = "http://localhost:8281/patient/delete"
  patients : any=[] ;
  lengthTabPatients : number ; 
  patientsDr : any=[] ;
  patientsDrExpert: any=[] ;
  lengthTabPatientsDr  : number ; 
  lengthTabPatientsDrExpert  : number ; 
  
    constructor(private http: HttpClient) { }
    getPatient(idPatient : number): Observable<Object> {
      return this.http.get(`${this.getPatientt}/${idPatient}`);
    }

   deletePatientApartirMG(idGeneraliste : number , cin : number): Observable<any> {
    return this.http.delete(`${this.suppressionApartirGeneraliste}/${idGeneraliste}/${cin}`);
  }
  deletePatient(cin : number): Observable<any> {
    return this.http.delete(`${this.delete}/${cin}`);
  }

    getAllPatients(): Observable<Object> {
      return this.http.get(`${this.getAllPatientt}`);
    }

    getPatientByGeneraliste(idGeneraliste: number): Observable<Object> {
      return this.http.get(`${this.getPatienttByMG}/${idGeneraliste}`);
    }
    
  }