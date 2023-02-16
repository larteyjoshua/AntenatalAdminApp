import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //  url = 'http://localhost:8000/v1/'
   url = 'https://antenatal-monitoring-system.onrender.com/'
  constructor(private http: HttpClient) { }

  login(user: User){
    localStorage.removeItem("token");
    const body = new HttpParams()
    .set('username', user.username)
    .set('password', user.password);
    const login = this.url + 'login';
    return this.http.post(login, body,  {observe: 'response'});
  }

  getAdmins() {
    const admins = this.url + 'admin/';
    return this.http.get(admins);
   }

   addAdmin(admin: any){
    const addAdmin = this.url + 'admin/add';
    return this.http.post(addAdmin, admin);
   }

   updateAdmin(admin: any){
    const updateAdmin = this.url + 'admin/update';
    return this.http.put(updateAdmin, admin);
   }

   deleteAdmin(id: any){
    const deleteAdmin = this.url + 'admin/'+id;
    return this.http.delete(deleteAdmin);
   }


  //  Mother
  getExpectedMothers() {
    const mother = this.url + 'expected-mother/';
    return this.http.get(mother);
   }

   addExpectedMother(mother: any){
    const addMother = this.url + 'expected-mother/add';
    return this.http.post(addMother, mother);
   }

   updateExpectedMother(mother: any){
    const updateMother = this.url + 'expected-mother/update';
    return this.http.put(updateMother, mother);
   }

   deleteExpectedMother(id: any){
    const deleteMother = this.url + 'expected-mother/'+id;
    return this.http.delete(deleteMother);
   }

  //  getAdminProfile(){
  //   return this.http.get('/admins/profile');
  //  }

}


