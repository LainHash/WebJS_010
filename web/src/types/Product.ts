
export interface Product{
    Id: number;
    Code: string;
    Name: string;
    CategoryId: number;
    SupplierId: number;
    UnitPrice: number;
    UnitsInStock: number;
    Discontinued: boolean;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface ProductResponse{
    product: Product;
    success: boolean;
}

export interface ProductListResponse{
    products: Product[];
    success: boolean;
    totalCount: number;
}

