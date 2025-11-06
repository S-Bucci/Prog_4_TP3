import './App.css'
import { useEffect, useState } from 'react'
import { useCafeteria } from './cafeteriaContext'
import { Menu } from './components/Menu'
import { OrderSummary } from './components/OrderSummary'
import type { Producto } from './schemas/product.schema'



export default function App() {
  const [menu, setMenu] = useState<Producto[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  const { productos, añadirProducto, eliminarProducto, total, resetearPedido } = useCafeteria();

  useEffect(() => {
    fetch('http://localhost/api/menu')
      .then(async res => {
        if (!res.ok) throw new Error()
        const data = await res.json()
        setMenu(data)
      })
      .catch(() => setError('Error al cargar menú'))
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
  if (menu.length === 0) return <div>No hay productos disponibles</div>

  return (
    <div>
      <h1>Cafetería</h1>

      <Menu menu={menu} onAdd={añadirProducto} />

      <OrderSummary
        items={productos}
        total={total}
        onRemove={eliminarProducto}
        onSubmit={enviarPedido}
        message={message}
      />
    </div>
  )
}
