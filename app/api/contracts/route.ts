import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const contracts = await db.contract.findMany({
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
            represent: true,            
              staff:{
                select: {
                  id: true,
                  name: true
                }
              }
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