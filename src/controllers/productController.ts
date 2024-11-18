import { prisma } from "../database/prisma";
import { Request, Response } from 'express';

export const GetProducts = async(req: Request, res: Response) => {

    const products = await prisma.product.findMany();

    return res.json(products);

}
export const CreateProduct = async (req: Request, res: Response) => {
    try {
      const { name, description, price, stock } = req.body;
      const userId = req.userId;  
      console.log(userId);
      

      const product = await prisma.product.create({
        data: {
          userId,
          name,
          description,
          price, 
          stock, 
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