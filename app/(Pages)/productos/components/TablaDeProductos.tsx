"use client"

import { Badge } from "@/components/ui/badge";
import { Producto } from "@/types/Productos";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent,CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Link from "next/link";
import { getProductosLocal } from "@/app/api/productosLocal/productosLocal";



const ITEMS_PER_PAGE = 12;

export default function TablaDeProductos(){
    const [productos, setProductos] = useState<Producto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const obtenerProductos = async () => {
        const productos = await getProductosLocal();
        if (productos) {
            setProductos(productos);
        }
    }

    // useEffect para obtener productos solo al montar el componente
    useEffect(() => {     
        obtenerProductos();
    }, []);

    // useEffect separado para filtrar productos cuando cambie searchTerm o productos
    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = productos.filter((item) => {
            return item.nombreProducto.toLowerCase().includes(lowercasedFilter);
        });
        setFilteredProducts(filteredData);
        setCurrentPage(1); 
    }, [productos, searchTerm]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return(
        <Card className="border-none shadow-none">
            <CardHeader>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar productos por nombre..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                           ID
                        </TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Precio
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Descripción
                        </TableHead>
                        <TableHead>
                            Acciones
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentProducts.map((producto) =>(
                            <TableRow key={producto.idProducto}>
                                <TableCell className="font-medium hidden sm:table-cell">{producto.idProducto}</TableCell>
                                <TableCell className="font-medium">{producto.nombreProducto}</TableCell>
                                <TableCell>
                                    <Badge variant={producto.idEstado === 1 ? "outline" : "destructive"}>
                                        {producto.idEstado === 1 ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">${producto.precio.toFixed(2)}</TableCell>
                                <TableCell className="hidden md:table-cell">{producto.descripcion}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        
                                        <Link href={`productos/${producto.idProducto}`} className="hover:bg-gray-100 rounded-md p-1 cursor-pointer">
                                            <Button size="icon" variant="outline">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        
                                        <Button size="icon" variant="destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Mostrando <strong>{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</strong> de <strong>{filteredProducts.length}</strong> productos
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) handlePageChange(currentPage - 1);
                                }}
                                className={currentPage === 1 ? 'pointer-events-none text-muted-foreground' : ''}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink 
                                    href="#" 
                                    isActive={i + 1 === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(i + 1);
                                    }}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? 'pointer-events-none text-muted-foreground' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    )
}
