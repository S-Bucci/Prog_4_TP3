import './App.css'
import z from 'zod'
import { useEffect, useState } from 'react'

const ProductoSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number().positive(),
});
type Producto = z.infer<typeof ProductoSchema>;





export default function App() {

  return (
    <div>
      
    </div>
  )
}
