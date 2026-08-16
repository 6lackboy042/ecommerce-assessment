export type ApiCartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
};

export type ApiCart = {
  id: number;
  products: ApiCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  isDeleted?: boolean;
  deletedOn?: string;
};

export type CartsResponse = {
  carts: ApiCart[];
  total: number;
  skip: number;
  limit: number;
};
