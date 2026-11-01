import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BuyerOrderPage } from '@/features/orders/components/buyer-order';
import { OrderLoading } from '@/features/orders/components/order-parts';

export const metadata: Metadata = { title: 'Order' };

export default function Page({ params }: PageProps<'/buyer/orders/[code]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<OrderLoading />}>
      <Order params={params} />
    </Suspense>
  );
}

async function Order({ params }: Pick<PageProps<'/buyer/orders/[code]'>, 'params'>) {
  const { code } = await params;
  return <BuyerOrderPage code={decodeURIComponent(code)} />;
}
