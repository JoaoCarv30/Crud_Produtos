import { prisma } from "../database/prisma";
import { Request, Response } from 'express';

export const GetProducts = async(req: Request, res: Response) => {

    const products = await prisma.product.findMany();

    return res.json(products);

}
export const CreateProduct = async (req: Request, res: Response) => {
    try {
      const { name, description, price, stock } = req.body;
      const imagePath = req.file?.path; // Pega o caminho da imagem enviada pelo Multer
  
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price, // Certifique-se de converter para Float se necessário
          stock, // Certifique-se de converter para Int se necessário
          Image: imagePath, // Salva o caminho da imagem
        },
      });
  
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar produto', details: error.message });
    }
  };
  
  export const UpdateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;
      const imagePath = req.file?.path; // Pega o novo caminho da imagem, se enviado
  
      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          stock,
          ...(imagePath && { Image: imagePath }), // Atualiza a imagem apenas se enviada
        },
      });
  
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
  };
  
export const DeleteProduct = async(req: Request, res: Response) => {

    const {id} = req.params;

    await prisma.product.delete({
        where: {id: Number(id)}
    });

    return res.status(204).send("Product deleted");
}