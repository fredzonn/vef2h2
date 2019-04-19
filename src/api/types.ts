export interface ICategory {
  id: number;
  title: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: ICategory;
  description?: string;
  created?: Date;
  updated?: Date;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  created?: Date;
  updated?: Date;
}

export interface IOrders {
  id: number;
  name: string;
  address: string;
  order_created: Date;
  order_submitted: boolean;
  user: IUser;
  created?: Date;
  updated?: Date;
}

export interface IOrderLines {
  id: number;
  quantity: number;
  product: IProduct;
  order: IOrders;
  created?: Date;
  updated?: Date;
  result?: any;
}

// todo fleiri týpur
