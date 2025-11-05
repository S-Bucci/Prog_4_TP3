import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Comprobar visualizacion inicial de menu', () => {
  test('verificar que se muestran productos mockeados por la API', () => {
    // Renderiza el componente TodoApp en un entorno de prueba virtual
    render(< App />);

    // Busca un elemento que contenga el texto "no hay tareas" (ignorando mayúsculas/minúsculas)
    // y verifica que esté presente en el documento.
    expect(screen.getByText(/Cappuchino/i)).toBeInTheDocument();
  });
});