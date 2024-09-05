import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const devices = await prisma.device.findMany({
      where: { deleted: false },
          select: {
            id: true,
            serial: true,
            type: true,
          } 
    });
    return NextResponse.json(devices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch devices' }, { status: 500 });
  }
}
