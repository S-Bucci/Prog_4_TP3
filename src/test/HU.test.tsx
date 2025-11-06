import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import { CafeteriaProvider } from "../cafeteriaContext";
import { server } from "../mocks/server";
import { emptyMenuHandler, errorHandler } from "../mocks/handlers";

describe("Comprobar visualización inicial de menú", () => {
  // ...existing code...

  test("verificar productos usando waitFor y roles", async () => {
    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(3);
    });
  });
});

describe("HU2 - Agregar ítem al pedido", () => {
  test("agrega producto al pedido al hacer click", async () => {
    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    const cortado = await screen.findByText(/Cortado/i);
    const addButton = cortado.closest("li")?.querySelector("button");
    fireEvent.click(addButton!);

    const pedidoList = screen.getByRole("list", { name: /pedido/i });
    expect(pedidoList).toHaveTextContent(/Cortado/);
  });
});

describe("HU3 - Calcular total del pedido", () => {
  test("actualiza el total al agregar productos", async () => {
    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    // Agregar Cortado ($140) y Mocca ($170)
    const addButtons = await screen.findAllByText(/Agregar/i);
    fireEvent.click(addButtons[0]); // Cortado
    fireEvent.click(addButtons[1]); // Mocca

    expect(screen.getByText(/total: \$310/i)).toBeInTheDocument();
  });
});

describe("HU4 - Eliminar ítem del pedido", () => {
  test("elimina solo el producto seleccionado", async () => {
    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    // Agregar dos productos
    const addButtons = await screen.findAllByText(/Agregar/i);
    fireEvent.click(addButtons[0]); // Cortado
    fireEvent.click(addButtons[1]); // Mocca

    // Eliminar Cortado
    const deleteButton = screen.getAllByText(/Eliminar/i)[0];
    fireEvent.click(deleteButton);

    const pedidoList = screen.getByRole("list", { name: /pedido/i });
    expect(pedidoList).not.toHaveTextContent(/Cortado/);
    expect(pedidoList).toHaveTextContent(/Mocca/);
  });
});

describe("HU5 - Enviar pedido", () => {
  test("muestra confirmación al enviar pedido exitoso", async () => {
    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    // Esperar a que el menú se cargue y usar getAllByText para obtener todos los botones
    const addButtons = await screen.findAllByText(/Agregar/i);
    // Hacer click en el primer botón
    fireEvent.click(addButtons[0]);

    // Enviar pedido
    const submitButton = screen.getByText(/Enviar pedido/i);
    fireEvent.click(submitButton);

    // Esperar el mensaje de confirmación
    await waitFor(() => {
      expect(screen.getByText(/Pedido confirmado/i)).toBeInTheDocument();
    });
  });
});

describe("HU6 - Caso límite: error o menú vacío", () => {
  test("HU6 - Muestra mensaje de error al fallar la API", async () => {
    // Cambiamos el comportamiento del servidor para este test
    server.use(errorHandler);

    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    // Esperamos a que aparezca el mensaje de error renderizado
    await waitFor(() => {
      expect(screen.getByText(/error al cargar menú/i)).toBeInTheDocument();
    });
  });

  test("HU6 - Muestra mensaje de lista vacía cuando no hay productos", async () => {
    server.use(emptyMenuHandler);

    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/no hay productos disponibles/i)
      ).toBeInTheDocument();
    });
  });
});

describe("Integración - Flujo completo de pedido", () => {
  test("completa flujo de compra exitosamente", async () => {
    render(
      <CafeteriaProvider>
        <App />
      </CafeteriaProvider>
    );

    // 1. Verificar carga inicial del menú
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(3);
      expect(screen.getByText(/Cortado/i)).toBeInTheDocument();
      expect(screen.getByText(/Mocca/i)).toBeInTheDocument();
    });

    // 2. Agregar productos al pedido
    const addButtons = screen.getAllByText(/Agregar/i);
    fireEvent.click(addButtons[0]); // Agregar Cortado ($140)
    fireEvent.click(addButtons[1]); // Agregar Mocca ($170)

    // 3. Verificar productos en el pedido
    const pedidoList = screen.getByRole("list", { name: /pedido/i });
    expect(pedidoList).toHaveTextContent(/Cortado/);
    expect(pedidoList).toHaveTextContent(/Mocca/);

    // 4. Verificar cálculo del total
    expect(screen.getByText(/total: \$310/i)).toBeInTheDocument();

    // 5. Enviar pedido
    const submitButton = screen.getByText(/Enviar pedido/i);
    fireEvent.click(submitButton);

    // 6. Verificar confirmación y reset
    await waitFor(() => {
      // Verificar mensaje de confirmación
      expect(screen.getByText(/Pedido confirmado/i)).toBeInTheDocument();

      // Verificar que el pedido se limpió
      const pedidoListAfter = screen.getByRole("list", { name: /pedido/i });
      expect(pedidoListAfter).not.toHaveTextContent(/Cortado/);
      expect(pedidoListAfter).not.toHaveTextContent(/Mocca/);

      // Verificar que el total se reseteo
      expect(screen.getByText(/total: \$0/i)).toBeInTheDocument();
    });
  });
});
