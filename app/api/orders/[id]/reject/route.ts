// File: app/api/orders/[id]/reject/route.ts

import { NextResponse } from 'next/server';
import prismadb from "@/lib/prismadb";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Update the order status to "Rejected"
    const updatedOrder = await prismadb.order.update({
      where: { id },
      data: { status: 'Rejected' },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error(`Failed to update order status for order ${id}:`, error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}