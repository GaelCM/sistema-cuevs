import { Producto, ProductoItem } from "@/types/Productos"
import {create} from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"

type ListaProductosModel = {
    carrito: ProductoItem[]; // <--- El carrito ahora contiene CartItems
    addProduct: (product: Producto) => void; // Añade o incrementa cantidad
    removeProduct: (idProducto: string) => void; // Elimina completamente el producto
    updateQuantity: (idProducto: string, newQuantity: number) => void; // Establece una cantidad específica
    decrementQuantity: (idProducto: string) => void; // Disminuye la cantidad en 1 (o elimina si llega a 0)
    incrementQuantity: (idProducto: string) => void; // Aumenta la cantidad en 1 (si ya existe)
    clearCart: () => void; // Elimina todos los productos
    // Opcional: Selector para obtener la cantidad total de ítems (suma de quantities)
    getTotalItems: () => number;
     // Opcional: Selector para obtener el precio total del carrito
    getTotalPrice: () => number;
};

export const useListaProductos = create(
    persist<ListaProductosModel>(
        (set, get) => ({
            // --- ESTADO INICIAL ---
            carrito: [], // Inicializamos la lista vacía de CartItems

            // --- ACCIONES ---

            /**
             * Añade un producto al carrito.
             * Si el producto ya existe, incrementa su cantidad en 1.
             * Si no existe, lo añade con cantidad 1.
             */
            addProduct: (product: Producto) => {
                const currentCarrito = get().carrito;
                const existingItemIndex = currentCarrito.findIndex(
                    (item) => item.product.idProducto === product.idProducto
                );

                if (existingItemIndex > -1) {
                    // Producto ya existe: Incrementar cantidad
                    const updatedCarrito = currentCarrito.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                    set({ carrito: updatedCarrito });
                } else {
                    // Producto no existe: Añadir nuevo item con cantidad 1
                    const newItem: ProductoItem = { product, quantity: 1 };
                    set({ carrito: [...currentCarrito, newItem] });
                }
            },

            /**
             * Elimina un producto completamente del carrito, sin importar su cantidad.
             */
            removeProduct: (idProducto: string) => {
                const currentCarrito = get().carrito;
                const updatedCarrito = currentCarrito.filter(
                    (item) => item.product.idProducto !== idProducto
                );
                set({ carrito: updatedCarrito });
            },

            /**
             * Actualiza la cantidad de un producto específico.
             * Si la nueva cantidad es 0 o menor, elimina el producto.
             */
            updateQuantity: (idProducto: string, newQuantity: number) => {
                if (newQuantity < 1) {
                    // Si la cantidad es 0 o negativa, eliminar el producto
                    get().removeProduct(idProducto);
                } else {
                    // Actualizar la cantidad del producto
                    const currentCarrito = get().carrito;
                    const updatedCarrito = currentCarrito.map((item) =>
                        item.product.idProducto === idProducto
                            ? { ...item, quantity: newQuantity }
                            : item
                    );
                    // Filtrar por si acaso el item no existía (aunque map no lo añadiría)
                    const finalCarrito = updatedCarrito.filter(item => item.product.idProducto === idProducto ? item.quantity >= 1 : true);
                    set({ carrito: finalCarrito });
                }
            },

             /**
             * Incrementa la cantidad de un producto existente en 1.
             * No hace nada si el producto no está en el carrito.
             */
            incrementQuantity: (idProducto: string) => {
                const currentCarrito = get().carrito;
                const updatedCarrito = currentCarrito.map((item) =>
                    item.product.idProducto === idProducto
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                 // Solo actualiza si realmente encontró y modificó el item
                 if (JSON.stringify(currentCarrito) !== JSON.stringify(updatedCarrito)) {
                    set({ carrito: updatedCarrito });
                 }
            },

            /**
             * Disminuye la cantidad de un producto en 1.
             * Si la cantidad llega a 0, elimina el producto del carrito.
             */
            decrementQuantity: (idProducto: string) => {
                const currentCarrito = get().carrito;
                const itemToDecrement = currentCarrito.find(
                    (item) => item.product.idProducto === idProducto
                );

                if (itemToDecrement) {
                    if (itemToDecrement.quantity > 1) {
                        // Disminuir cantidad
                        get().updateQuantity(idProducto, itemToDecrement.quantity - 1);
                    } else {
                        // Eliminar producto si la cantidad es 1
                        get().removeProduct(idProducto);
                    }
                }
                // No hacer nada si el producto no se encuentra
            },

            /**
             * Elimina todos los productos del carrito.
             */
            clearCart: () => set({ carrito: [] }), // Renombrada de removeTodosLosProductos

            // --- SELECTORES (Opcionales pero útiles) ---

            /**
             * Calcula el número total de ítems individuales en el carrito.
             */
            getTotalItems: () => {
                const currentCarrito = get().carrito;
                return currentCarrito.reduce((total, item) => total + item.quantity, 0);
            },

             /**
             * Calcula el precio total de todos los productos en el carrito.
             */
            getTotalPrice: () => {
                 const currentCarrito = get().carrito;
                 return currentCarrito.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
            }

        }),
        {
            name: "lista-productos-pos", // Cambiado nombre para evitar conflictos si la versión vieja aún existe
            storage: createJSONStorage(() => localStorage),
        }
    )
);
