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
}

export interface ExpectedMotherWithDetails {
  ExpectedMother: ExpectedMother
  Admin: Admin

}
