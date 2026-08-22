import { NextResponse } from 'next/server';
import { InventoryEngine } from '@/services/inventoryEngine';

export async function POST() {
  try {
    const result = await InventoryEngine.releaseExpiredLocks();
    return NextResponse.json({
      success: true,
      releasedCount: result.releasedCount,
      expiredLockIds: result.expiredLockIds,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
