// eslint-disable-next-line @typescript-eslint/no-require-imports
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronApi', {

    //aqui se exponen las funciones que se van a usar en el frontend para comunicarse con el backend
    getNotes: () => ipcRenderer.invoke('get-notes'),
    addNote: (note) => ipcRenderer.invoke('add-note', note),
    ///////////////////////////////
    getProductos: () => ipcRenderer.invoke('get-productos'),
    getProducto: (id) => ipcRenderer.invoke('get-producto', id),
    insertarProducto: (producto) => ipcRenderer.invoke('insertar-producto', producto),
    updateProducto: (producto) => ipcRenderer.invoke('update-producto', producto),
    deleteProducto: (id) => ipcRenderer.invoke('delete-producto', id),
    ///////////////////////////////
    nuevaVenta: (totalVenta, idUsuario, status, productos, pago) => ipcRenderer.invoke('nueva-venta', totalVenta, idUsuario, status, productos, pago),
    ///////////////////////////////
    getCategorias: () => ipcRenderer.invoke('get-categorias'),
    ///////////////////////////////
    reporteVentas: (fechaDesde, fechaHasta) => ipcRenderer.invoke('reporte-ventas', fechaDesde, fechaHasta),
    detalleVenta: (idVenta) => ipcRenderer.invoke('detalle-venta', idVenta),
    ///////////////////////////////
   
  });
