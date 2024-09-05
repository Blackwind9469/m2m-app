// pages/api/simcard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, serial, gsmno, tariff, deleted, used } = req.body;

    try {
      const simCard = await prisma.sim.create({
        data: {
          id,
          serial,
          gsmno,
          tariff,
          deleted,
          used,
        },
      });
      res.status(201).json(simCard);
    } catch (error) {
      res.status(400).json({ error: 'Veri kaydedilemedi.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
