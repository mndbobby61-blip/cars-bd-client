export type UserRole = "user" | "admin";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  token: string;
}

export interface Review {
  _id: string;
  car: string;
  user: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Car {
  _id: string;
  title: string;
  brand: string;
  carModel: string;
  year: number;
  price: number;
  condition: "New" | "Used";
  fuelType: "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  mileage: number;
  location: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  seller: { _id: string; name: string; email: string; phone?: string } | string;
  status: "pending" | "approved" | "rejected";
  rating: number;
  createdAt: string;
}

export interface CarListResponse {
  cars: Car[];
  total: number;
  page: number;
  pages: number;
}