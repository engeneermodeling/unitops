import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Оновлюємо роль користувача в БД
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}