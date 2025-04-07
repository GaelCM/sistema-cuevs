import { ListaProductos } from "./components/listaProductos";
import { Reloj } from "./components/reloj";


export default function Home() {
  return (
    <div className="p-10">
      <section>
        <Reloj></Reloj>
      </section>
      <section>
        <ListaProductos></ListaProductos>
      </section>
      <section>
        
      </section>
    </div>
  );
}
