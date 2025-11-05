import { render, screen } from '@testing-library/react';
import { Menu } from '../../Components/Menu';


describe('Componente Menu', () => {
  test('verificar que se muestran productos mockeados por la API', () => {
    // Renderiza el componente TodoApp en un entorno de prueba virtual
    render(< Menu />);

    // Busca un elemento que contenga el texto "no hay tareas" (ignorando mayúsculas/minúsculas)
    // y verifica que esté presente en el documento.
    expect(screen.getByText(/Cappuchino/i)).toBeInTheDocument();
  });
});