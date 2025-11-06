import { rest } from 'msw'

const mockMenu = [
  { id: '1', name: 'Cortado', price: 140 },
  { id: '2', name: 'Mocca', price: 170 },
  { id: '3', name: 'Medialuna', price: 100 }
]

export const handlers = [
  // Default handler for successful menu fetch
  rest.get('http://localhost/api/menu', (req, res, ctx) => {
    console.log('Mock handler: GET /api/menu called with default success response')
    return res(
      ctx.status(200),
      ctx.json(mockMenu)
    )
  }),

  rest.post('http://localhost/api/orders', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.status(201), ctx.json({ ok: true, received: body }))
  })
]

// Helper functions for test-specific handlers
export const errorHandler = rest.get(
  'http://localhost/api/menu',
  (req, res, ctx) => {
    console.log('Mock handler: GET /api/menu called with error response')
    return res(ctx.status(500))
  }
)

export const emptyMenuHandler = rest.get(
  'http://localhost/api/menu',
  (req, res, ctx) => {
    console.log('Mock handler: GET /api/menu called with empty menu')
    return res(ctx.status(200), ctx.json([]))
  }
)