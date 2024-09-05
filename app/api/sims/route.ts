import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sims = await prisma.sim.findMany({
      where: { deleted: false },
          select: {
            id: true,
            serial: true,
            gsmno: true,
            tariff: true
          } 
    });
    return NextResponse.json(sims);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sims' }, { status: 500 });
  }
}