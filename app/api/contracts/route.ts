import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contracts = await prisma.contract.findMany({
      where: { deleted: false },
      include: {
        hat: {
          select: {
            id: true,            
            serial: true,
            gsmno: true,
            tariff: true
          }
        },
        firma: {
          select: {
            id: true,
            name: true,
            serial: true,
            represent: true
          }
        },
        cihaz: {
          select: {
            id: true,            
            serial: true,
            type: true
          }
        }
      }
    });
    return NextResponse.json(contracts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contracts' }, { status: 500 });
  }
}