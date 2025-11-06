import './App.css'
import z from 'zod'
import { useEffect, useState } from 'react'
import { CafeteriaProvider, useCafeteria } from './cafeteriaContext'

const ProductoSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number().positive(),
});
type Producto = z.infer<typeof ProductoSchema>;

export default function App() {
  const [menu, setMenu] = useState<Producto[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const { productos, añadirProducto, eliminarProducto, total, resetearPedido } = useCafeteria();


  useEffect(() => {
  fetch('http://localhost/api/menu')
    .then(async res => {
      if (!res.ok) {
        console.error('API error:', res.status)
        throw new Error()
      }
      const data = await res.json()
      console.log('API response:', data)
      setMenu(data)
    })
    .catch((err) => {
      console.error('Fetch error:', err)
      setError('Error al cargar menú')
    })
    .finally(() => setLoading(false))
}, [])

  const enviarPedido = async () => {
    setMessage(null)
    try {
      const res = await fetch('http://localhost/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productos })
      })
      if (!res.ok) throw new Error()
      await res.json()
      setMessage('Pedido confirmado')
      resetearPedido()
    } catch {
      setMessage('Error al enviar pedido')
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>
  if (menu.length === 0) return <div>no hay productos disponibles</div>


  return (
    <div>
      <h1>Cafetería</h1>

      <ul role="list" aria-label="menu">
        {menu.map(prod => (
          <li key={prod.id} role="listitem">
            {prod.name} - ${prod.price}
            <button onClick={() => añadirProducto(prod)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h2>Pedido</h2>
      <ul role="list" aria-label="pedido">
        {productos.map(p => (
          <li key={p.id}>
            {p.name} x - ${p.price}
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <p>Total: ${total}</p>
      <button onClick={enviarPedido}>Enviar pedido</button>

      {message && <p>{message}</p>}
    </div>
  )
}
