export interface User {
  id: string;
  email: string;
}

export interface Player {
  _id: string;
  name: string;
  position: string;
  price: number;
  teamId: string;
  age: number;
  nationality: string;
  rating: number;
  isTransferListed: boolean;
  askingPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  _id: string;
  name: string;
  userId: string;
  budget: number;
  players: Player[];
  createdAt: string;
  updatedAt: string;
}

export interface TransferListing {
  _id: string;
  name: string;
  age: number;
  nationality: string;
  position: string;
  price: number;
  rating: number;
  teamId: {
    _id: string;
    name: string;
  };
  askingPrice: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponse {
  access_token: string;
  email: string;
}
