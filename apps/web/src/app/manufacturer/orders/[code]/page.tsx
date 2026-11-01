import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FactoryOrderPage } from '@/features/orders/components/factory-order';
import { OrderLoading } from '@/features/orders/components/order-parts';

export const metadata: Metadata = { title: 'Order' };

export default function Page({ params }: PageProps<'/manufacturer/orders/[code]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<OrderLoading />}>
      <Order params={params} />
    </Suspense>
  );
}

async function Order({ params }: Pick<PageProps<'/manufacturer/orders/[code]'>, 'params'>) {
  const { code } = await params;
  return <FactoryOrderPage code={decodeURIComponent(code)} />;
}
