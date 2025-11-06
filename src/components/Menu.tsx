import { memo } from 'react';
import type { Producto } from '../schemas/product.schema';


type Props = {
  menu: Producto[];
  onAdd: (p: Producto) => void;
};

function MenuBase({ menu, onAdd }: Props) {
  return (
    <>
      <h2>Menú</h2>
      <ul role="list" aria-label="menu">
        {menu.map((prod) => (
          <li key={prod.id} role="listitem">
            {prod.name} - ${prod.price}
            <button onClick={() => onAdd(prod)}>Agregar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export const Menu = memo(MenuBase);
