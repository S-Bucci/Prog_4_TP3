import { rest } from 'msw';

export const handlers = [
  rest.get('/api/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, text: 'Aprender React', done: false },
        { id: 2, text: 'Configurar Vitest', done: true },
        { id: 3, text: 'Integrar con MSW', done: false },
      ]),
      ctx.delay(150)
    );
  })]