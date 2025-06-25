import ReporteVenta from "./reporteVenta";


export default function DetalleVenta({params}: {params: {id: string}}){
   
    const {id}=params;

    return(
        <div className="bg-white pt-10 flex flex-col items-center justify-center">
            <section className="px-10">
                <ReporteVenta idVenta={id}></ReporteVenta>
            </section>
        </div>
    )
}