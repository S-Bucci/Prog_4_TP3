import z from 'zod';

const ProductoSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number().positive(),
});
export type Producto = z.infer<typeof ProductoSchema>;