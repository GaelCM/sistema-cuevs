
import Bar from "@/components/bar";
import { ListaProductos } from "./components/listaProductos";
import { Reloj } from "./components/reloj";


export default function Home() {


  return (
    <div className="p-10 mr-64">
      <Bar></Bar>
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
