import { prisma } from "../database/prisma";
import { Request, Response } from 'express';

export const GetProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        User: {
          select: {
            name: true, // Apenas o nome do usuário
          },
        },
      },
    });

    return res.json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar produtos", details: error.message });
  }
};
export const CreateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;
    const userId = req.userId;

    // Verificar se o arquivo foi enviado
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Imagem é obrigatória' });
    }

    // Obter o caminho da imagem salva
    const imagePath = file.filename; // Nome gerado pelo multer

    // Criar o produto no banco de dados
    const product = await prisma.product.create({
      data: {
        userId,
        name,
        description,
        price: parseFloat(price), // Garantir que o preço seja numérico
        stock: parseInt(stock, 10), // Garantir que o estoque seja numérico
        Image: imagePath, // Salvar o nome do arquivo no banco
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Erro ao criar produto', details: error.message });
  }
};
  
  export const UpdateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;
  
      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          stock,
        },
      });
  
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
  };
  
export const DeleteProduct = async(req: Request, res: Response) => {

    const {id} = req.params;

    await prisma.product.delete(
      {
        where: {
          id: id
        }
      }
    )

    return res.status(204).send("Product deleted");
}