export interface User {
  username: string;
  password: string;
}


export interface Admin {
  id?: number;
  name?: string;
  email?: string;
  telephone?: string;
  isActive?: boolean;
  password? :string;
  dateAdded?: Date;
}

export interface ExpectedMother {
  id?: number;
  name?: string;
  telephone?: string;
  dateAdded?: Date;
  weight?: number
  height?: number
  birth_date?: string
  location?:  string
  first_antenatal_visit_date?:string
  expected_delivery_date?: string
}

export interface ExpectedMotherWithDetails {
  ExpectedMother: ExpectedMother
  Admin: Admin
}

export interface Appointment {
    id?: number;
    expected_mother_id?: number;
    appointed_date? : string;
    appointed_time?: string;
    attended?: boolean;
    dateAdded?: Date;
    appointment_note?: string;
}

export interface AppointmentWithDetails {
  Admin?: Admin;
  ExpectedMother?: ExpectedMother;
  Appointment?: Appointment;
}


export interface Comment {
  id?: number;
  message?: string;
  dateAdded?: string;
}

export interface CommentWithDetails {
  Appointment: Appointment;
  Comment: Comment;
  ExpectedMother: ExpectedMother
}

export interface GroupAppointment {
    date?: string[]
    totalAttended?: number[]
}

export interface Summaries {
  value: number
  name: string
  icon: string
}



export interface DashboardSummary {
  summaries?: Summaries[]
  groupedAppointment?: GroupAppointment
}

export interface RestPasswordResponse {
  message?: string;
  telephone?: string

}
