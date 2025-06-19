import { Notes } from "@/types/test";



export const getNotas = async (): Promise<Notes[]> => {
    if (window.electronApi?.getNotes) {
      const res = await window.electronApi.getNotes();
      if (!res) {
        return []; // Retorna un array vacío si no hay notas
      }
      return res as Notes[]; // Asegúrate de que res es un array de Notes
    } else {
      console.warn("electronAPI no está disponible.");
      return []; // Retorna un array vacío si electronAPI no está disponible
    }
  };

  
export const addItem=async(name:string)=>{
    if (window.electronApi?.addItem) {
        const res= await window.electronApi.addItem(name)
        if(!res){
         console.warn("No se han encontrado notas.");
        }
        console.log("Notas obtenidas:", res); 
     }
     else {
         console.warn("electronAPI no está disponible.");
     }
}