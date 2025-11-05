import { rest } from 'msw';

export const handlers = [
  rest.get('/api/menu', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Cappuchino', price: 4000 },
        { id: 2, name: 'Cortado', price: 3500 },
        { id: 3, name: 'Mocca', price: 2500 },
      ]),
      ctx.delay(150)
    );
  })]