import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";


type DialogProductoProps ={
    value:string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}


export default function DialogProducto(props: DialogProductoProps) {

    const {value, isOpen, onOpenChange} = props;

    if(value==""){
        return(
            <Dialog open={isOpen} onOpenChange={()=> onOpenChange(!isOpen)}>  
                <DialogContent className="sm:max-w-[825px] py-20">
                    <DialogHeader>
                        <DialogTitle>Información del Producto</DialogTitle>
                        <DialogDescription>
                            No se encontró información del producto
                        </DialogDescription>
                    </DialogHeader>
                    {
                        <h1>No se encontró información del producto</h1>
                    }
                </DialogContent>
            </Dialog>
        )
    }

    return(
        <Dialog open={isOpen} onOpenChange={()=> onOpenChange(!isOpen)}>  
      <DialogContent className="sm:max-w-[825px] py-20">
        <DialogHeader>
          <DialogTitle>Información del Producto</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        {value}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}
    