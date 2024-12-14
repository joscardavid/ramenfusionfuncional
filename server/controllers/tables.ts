import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTables(req: Request, res: Response) {
  try {
    const tables = await prisma.table.findMany();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getTable(req: Request, res: Response) {
  try {
    const table = await prisma.table.findUnique({
      where: { id: req.params.id },
      include: { reservations: true },
    });
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateTable(req: Request, res: Response) {
  try {
    const table = await prisma.table.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}