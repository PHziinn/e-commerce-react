import { z } from 'zod';

// Schema Produtos
export const productSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  sku: z.string().min(1, 'SKU é obrigatório'),
  price: z.string().refine((val) => parseFloat(val) > 0, 'Preço deve ser maior que 0'),
  stock: z
    .string()
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 1, 'Estoque deve ser no mínimo 1'),
  description: z.string().min(1, 'Descrição do produto é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  discount: z.string().min(1, 'Desconto é obrigatório'),
  files: z.array(z.any()).min(1, 'Pelo menos uma imagem é obrigatória'),
  imagens: z
    .array(z.object({ url: z.string().url() }))
    .min(1, 'Pelo menos uma imagem é obrigatória'),
});
