import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //  url = 'http://localhost:8000/v1/'
   url = 'https://antenatal-monitoring-system.onrender.com/v1/'
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
    return this.http.get(admins,  {observe: 'response'});
   }

   getAdminProfile() {
    const profile = this.url + 'profile';
    return this.http.get(profile,  {observe: 'response'});
   }

   addAdmin(admin: any){
    const addAdmin = this.url + 'admin/add';
    return this.http.post(addAdmin, admin,  {observe: 'response'});
   }

   passwordReset(object: any){
    const resetPassword = this.url + 'reset-password';
    return this.http.post(resetPassword, object,  {observe: 'response'});
   }

   generateOTP(object: any){
    const generateOTP = this.url + 'otp/generate';
    return this.http.post(generateOTP, object,  {observe: 'response'});
   }

   verifyOTP(object: any){
    const verifyOTP = this.url + 'otp/verify';
    return this.http.post(verifyOTP, object,  {observe: 'response'});
   }

   newPassword(object: any){
    console.log(object)
    const newPassword = this.url + 'new-password';
    return this.http.put(newPassword, object,  {observe: 'response'});
   }

   updateAdmin(admin: any){
    const updateAdmin = this.url + 'admin/update';
    return this.http.put(updateAdmin, admin,  {observe: 'response'});
   }

   deleteAdmin(id: any){
    const deleteAdmin = this.url + 'admin/'+id;
    return this.http.delete(deleteAdmin,  {observe: 'response'});
   }


  //  Appointment
  getAppointments() {
    const appointment = this.url + 'appointment/';
    return this.http.get(appointment,  {observe: 'response'});
   }

   addAppointment(appointment: any){
    const addAppointment = this.url + 'appointment/add';
    return this.http.post(addAppointment, appointment,  {observe: 'response'});
   }

   updateAppointment(appointment: any){
    const updateAppointment = this.url + 'appointment/update';
    return this.http.put(updateAppointment, appointment,  {observe: 'response'});
   }

   deleteAppointment(id: any){
    const deleteAppointment = this.url + 'appointment/'+id;
    return this.http.delete(deleteAppointment,  {observe: 'response'});
   }

    // Expected Mother
   getExpectedMothers() {
    const mother = this.url + 'expected-mother/';
    return this.http.get(mother,  {observe: 'response'});
   }

   addExpectedMother(mother: any){
    const addMother = this.url + 'expected-mother/add';
    return this.http.post(addMother, mother,  {observe: 'response'});
   }

   updateExpectedMother(mother: any){
    const updateMother = this.url + 'expected-mother/update';
    return this.http.put(updateMother, mother, {observe: 'response'});
   }

   deleteExpectedMother(id: any){
    const deleteMother = this.url + 'expected-mother/'+id;
    return this.http.delete(deleteMother,  {observe: 'response'});
   }

   getDashboardSummaries() {
    const summaries = this.url + 'dashboard/summaries';
    return this.http.get(summaries,  {observe: 'response'});
   }

    // Expected Mother
    getAllComments() {
      const comments = this.url + 'comment/';
      return this.http.get(comments,  {observe: 'response'});
     }

     deleteComment(id: any){
      const deleteComment = this.url + 'comment/'+id;
      return this.http.delete(deleteComment,  {observe: 'response'});
     }

     getAllCommentsByExpectedMother(id:number) {
      const comments = this.url + 'comment-expected-mother/' + id;
      return this.http.get(comments,  {observe: 'response'});
     }


     sendTextMessage(object: any){
      const sendMessage = this.url + 'message/send';
      return this.http.post(sendMessage, object,  {observe: 'response'});
     }

}


