type Item = { id: string; name: string; price: number };

type Props = {
  items: Item[];
  total: number;
  onRemove: (id: string) => void;
  onSubmit: () => void;
  message: string | null;
};

export function OrderSummary({ items, total, onRemove, onSubmit, message }: Props) {
  return (
    <>
      <h2>Pedido</h2>
      <ul role="list" aria-label="pedido">
        {items.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button onClick={() => onRemove(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <p>Total: ${total}</p>
      <button onClick={onSubmit}>Enviar pedido</button>

      {message && <p>{message}</p>}
    </>
  );
}
