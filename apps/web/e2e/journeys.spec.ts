import { devices, expect, type Page, test } from '@playwright/test';
import { PASSWORD, USERS } from './env';

/**
 * The five journeys the product is built around (CLAUDE.md → UX principles), driven like a
 * person would: from the dashboard, by visible labels. Each also counts the clicks it takes.
 */

async function signIn(page: Page, email: string) {
  await page.goto('/login');
  await page.getByLabel('Work email').fill(email);
  await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL((url) => !url.pathname.startsWith('/login'));
}

/** Clicks that move the journey forward (form typing doesn't count). */
function clicks() {
  let n = 0;
  return {
    click: async (locator: ReturnType<Page['getByRole']>) => {
      n += 1;
      await locator.click();
    },
    get count() {
      return n;
    },
  };
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}

test.describe.configure({ mode: 'serial' });

test('1 · a buyer posts an RFQ', async ({ page }) => {
  await signIn(page, USERS.buyer);
  const c = clicks();
  await c.click(page.getByRole('link', { name: 'Request a quote' }).first());
  await expect(page.getByRole('heading', { name: 'New request for quote' })).toBeVisible();

  // Phones tap (the touch profile doesn't open selects with an emulated mouse click).
  await page.getByRole('combobox', { name: 'Category' }).tap();
  await page.getByRole('option', { name: 'T-shirts' }).tap();
  await page.getByLabel('Title').fill('Garment-dyed heavyweight tee, 240 GSM');
  await page
    .getByLabel('Description')
    .fill('Boxy fit, 1x1 rib neck, double-needle hems. Four colours, sizes S–XXL, polybagged.');
  await c.click(page.getByRole('button', { name: 'Continue' }));

  await page.getByLabel('Quantity (pcs)').fill('1500');
  await page.getByLabel('Quotes needed by').fill(daysFromNow(14));
  await c.click(page.getByRole('button', { name: 'Continue' }));

  await c.click(page.getByRole('button', { name: 'Publish' }));
  await expect(page).toHaveURL(/\/buyer\/rfqs\/RFQ-\d{4}-\d{5}$/);
  await expect(page.getByText('Garment-dyed heavyweight tee, 240 GSM').first()).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(4);
});

test('2 · a buyer accepts a quote and pays the deposit', async ({ page }) => {
  await signIn(page, USERS.buyerWithOffers);
  const c = clicks();
  await c.click(page.getByRole('link', { name: /RFQ-2026-00042/ }).first());
  await c.click(page.getByRole('button', { name: 'Accept offer' }).first());
  await c.click(page.getByRole('button', { name: 'Accept and create order' }));
  await c.click(page.getByRole('button', { name: 'Confirm and pay the deposit' }));

  await expect(page).toHaveURL(/\/buyer\/orders\/ORD-\d{4}-\d{5}/);
  const dialog = page.getByRole('dialog', { name: 'Pay the deposit' });
  await expect(dialog.getByText('Quote this reference')).toBeVisible();
  await c.click(dialog.getByRole('button', { name: 'I’ve sent it' }));
  await expect(page.getByText('Thanks: we’ll confirm it when it arrives.')).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(5);
});

test('3 · a factory submits a quote', async ({ page }) => {
  await signIn(page, USERS.factory);
  const c = clicks();
  // The RFQ from journey 1 matched this factory (T-shirts): it's on the dashboard.
  await c.click(page.getByRole('link', { name: /Garment-dyed heavyweight tee/ }).first());
  await page.getByLabel(/Your price \/ pc/).fill('3.85');
  await page.getByLabel('Lead time (days)').fill('45');
  await c.click(page.getByRole('button', { name: 'Send quote' }));
  await expect(page.getByText('Quote sent')).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(2);
});

test('4 · a factory updates a production milestone', async ({ page }) => {
  await signIn(page, USERS.factory);
  const c = clicks();
  await c.click(page.getByRole('link', { name: /Heavyweight boxy tee/ }).first());
  await expect(page).toHaveURL(/\/manufacturer\/orders\/ORD-2026-00017/);
  await c.click(page.getByRole('button', { name: 'Mark complete' }).first());
  await expect(page.getByText('Stage completed')).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(2);
});

/**
 * 5 · GarmentGate logistics, end to end: the factory sends the packed, paid order to the
 * hub; staff receive it, build the shipment and send it off (the order ships); the forwarder
 * accepts its leg and delivers; the buyer follows it and confirms delivery. Nobody sees the
 * other side's name on the way.
 */
test('5 · an order goes factory → hub → shipped → delivered with GarmentGate', async ({
  browser,
}) => {
  const order = 'ORD-2026-00018';
  const as = async (email: string) => {
    const context = await browser.newContext({ ...devices['Pixel 7'] });
    const page = await context.newPage();
    await signIn(page, email);
    return page;
  };

  // The factory books GarmentGate's pickup to the hub.
  const factory = await as(USERS.factory);
  await factory.goto(`/manufacturer/orders/${order}`);
  await expect(factory.getByText('Shipping with GarmentGate')).toBeVisible();
  await factory.getByRole('button', { name: 'Request pickup' }).click();
  await expect(factory.getByText('Pickup requested')).toBeVisible();
  await expect(factory.getByText('Northbound')).toHaveCount(0);

  // Staff receive the cartons at the hub and put the order on a shipment.
  const admin = await as(USERS.admin);
  await admin.goto('/admin/logistics');
  await admin.getByRole('button', { name: 'Receive' }).first().click();
  const receive = admin.getByRole('dialog', { name: `Receive ${order}` });
  await receive.getByRole('button', { name: 'Receive' }).click();
  await expect(admin.getByText('Received at the hub')).toBeVisible();
  await admin.getByRole('checkbox', { name: `Select ${order}` }).click();
  await admin.getByRole('button', { name: /Create shipment/ }).click();
  await expect(admin).toHaveURL(/\/admin\/logistics\/shipments\/SHP-\d{4}-\d{5}$/);

  // Every leg after the hub gets a partner and a price.
  for (const [n, partner, cost] of [
    [0, 'Ashulia Road Haulage', '120'],
    [1, 'Bayline Cargo', '2964'],
  ] as const) {
    await admin.getByRole('button', { name: 'Edit leg' }).nth(n).click();
    const dialog = admin.getByRole('dialog');
    await dialog.getByRole('combobox', { name: 'Partner' }).tap();
    await admin.getByRole('option', { name: new RegExp(partner) }).tap();
    await dialog.getByLabel(/^Cost/).fill(cost);
    await dialog.getByRole('button', { name: 'Save leg' }).click();
    await expect(dialog).toBeHidden();
  }

  // The goods leave: the order ships and the shipping money leaves escrow.
  await admin.getByRole('combobox', { name: 'Status' }).tap();
  await admin.getByRole('option', { name: 'In transit' }).tap();
  await admin.getByLabel('Where').fill('Dhaka airport');
  await admin.getByRole('button', { name: 'Post update' }).click();
  await expect(admin.getByText('Partner paid')).toHaveCount(0);
  await expect(admin.getByRole('button', { name: /^Pay / }).first()).toBeVisible();

  // The forwarder accepts its leg and delivers.
  const partner = await as(USERS.partner);
  await partner.goto('/partner');
  await partner.getByRole('link', { name: /Main carriage/ }).click();
  await partner.getByRole('button', { name: 'Accept booking' }).click();
  await expect(partner.getByText('Booking accepted')).toBeVisible();
  await expect(partner.getByText(/Northbound|Meghna/)).toHaveCount(0);
  await partner.getByRole('combobox', { name: 'Shipment status' }).tap();
  await partner.getByRole('option', { name: 'Delivered' }).tap();
  await partner.getByRole('button', { name: 'Post update' }).click();
  await expect(partner.getByText('Update posted')).toBeVisible();

  // The buyer follows GarmentGate's tracking and confirms delivery.
  const buyer = await as(USERS.buyer);
  await buyer.goto(`/buyer/orders/${order}`);
  await expect(buyer.getByText('GarmentGate tracking')).toBeVisible();
  await expect(buyer.getByText('GarmentGate hub').first()).toBeVisible();
  await expect(buyer.getByText(/Meghna|Bayline|Ashulia/)).toHaveCount(0);
  await buyer.getByRole('button', { name: 'Confirm delivery' }).first().click();
  await buyer
    .getByRole('dialog', { name: 'Confirm delivery?' })
    .getByRole('button', { name: 'Confirm delivery' })
    .click();
  await expect(buyer.getByText('Delivery confirmed')).toBeVisible();
});
