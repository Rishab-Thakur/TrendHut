export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
  
  export interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
  }
  