import prisma from '../config/database';
import { AppError } from '../utils/errors';

export class TableService {
  static async findAll() {
    return prisma.table.findMany();
  }

  static async findById(id: string) {
    const table = await prisma.table.findUnique({
      where: { id },
      include: { reservations: true },
    });

    if (!table) {
      throw new AppError('Table not found', 404);
    }

    return table;
  }

  static async update(id: string, data: { isAvailable?: boolean }) {
    return prisma.table.update({
      where: { id },
      data,
    });
  }
}