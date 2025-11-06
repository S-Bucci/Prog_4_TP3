import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import z from 'zod';

const ProductoSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number().positive(),
});
type Producto = z.infer<typeof ProductoSchema>;

type CafeteriaContextoTipo = {
  productos: Producto[]
  añadirProducto: (producto: Producto) => void
  eliminarProducto: (id: string) => void
  total: number
  resetearPedido: () => void
}

const CafeteriaContexto = createContext<CafeteriaContextoTipo | undefined>(undefined)

export function CafeteriaProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([])

  const añadirProducto = useCallback((producto: Producto) => {
    setProductos(prevTasks => [...prevTasks, producto]);
  }, [])

  const eliminarProducto = useCallback((id: string) => {
    setProductos(prev => prev.filter(p => p.id !== id))
  }, [])

  const total = productos.reduce((acc, p) => acc + p.price, 0)

  const resetearPedido = useCallback(() => {
    setProductos([])
  }, [])

  const contextValue = { productos, añadirProducto, eliminarProducto, total, resetearPedido}

  return (
    <CafeteriaContexto.Provider value={contextValue}>
      {children}
    </CafeteriaContexto.Provider>
  );
}


export function useCafeteria() {
  const ctx = useContext(CafeteriaContexto)
  if (!ctx) throw new Error('useCafeteria debe usarse dentro de cafeteriaProvider')
  return ctx
}