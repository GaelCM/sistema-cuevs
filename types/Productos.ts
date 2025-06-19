

export type Producto = {
    idProducto: string;
    nombreProducto: string;
    precio: number;
    descripcion: string;
    idCategoria: number;
    idEstado: number;
}

export interface ProductoItem {
    product: Producto;
    quantity: number;
}

export type Categorias={
    idCategoria: number;
    categoriaName: string;
}