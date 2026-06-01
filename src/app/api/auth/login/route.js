import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Шукаємо або створюємо користувача
    const user = await prisma.user.upsert({
      where: { email },
      update: {}, // Нічого не оновлюємо при повторному вході
      create: {
        email,
        role: 'guest', // За замовчуванням гость
        name: email.split('@')[0],
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}