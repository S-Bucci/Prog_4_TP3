# Cafetería — TP3 (Prog_4_TP3)

TP 4:Cafeteria

Características principales
- Lista de productos (menú) consumida desde el endpoint `/api/menu`.
- Carrito/pedido local con resumen y envío a `/api/orders`.
- Validaciones de esquema con Zod.
- Pruebas con Vitest y Testing Library.

Tecnologías
- React 19 + TypeScript
- Vite (dev server y build)
- Vitest + Testing Library para pruebas
- MSW (mocking) — dependía del proyecto para pruebas (ver notas)
- Zod para validación de esquemas

Participantes

Bucci Simón, Coletto Darío, Sisko Rodrigo, Zanconi Gianluca

Requisitos
- Node.js 18+ recomendado
- npm (o yarn/pnpm) disponible en tu PATH

Instalación

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm install
```

Comandos disponibles

- Iniciar servidor de desarrollo (Vite):

```powershell
npm run dev
```

- Construir para producción (TypeScript build + Vite):

```powershell
npm run build
```

- Previsualizar build producida:

```powershell
npm run preview
```

- Ejecutar pruebas (Vitest):

```powershell
npm run test
# modo watch
npm run test:watch
# interfaz web de vitest
npm run test:ui
```

- Lint (ESLint):

```powershell
npm run lint
```

Estructura relevante

- `index.html` — entrada HTML
- `src/main.tsx` — punto de arranque React
- `src/App.tsx` — componente principal (fetch a `http://localhost/api/menu` y POST a `http://localhost/api/orders`)
- `src/components/` — componentes UI (Menu, OrderSummary, etc.)
- `src/schemas/` — definiciones Zod para productos
- `src/test/` — configuración y pruebas (setup de Vitest / Testing Library)

Notas

- La aplicación en `App.tsx` hace fetch a `http://localhost/api/*`. Para que la app funcione en desarrollo sin un backend real puedes:
	- Ejecutar un backend local que exponga esos endpoints.
	- O bien usar MSW (Mock Service Worker) si las pruebas y el entorno de desarrollo lo soportan. En este repo hay referencias de testing que cargan `src/test/setupTests.ts`.
