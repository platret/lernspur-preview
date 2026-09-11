import { test, expect } from '@playwright/test';

test('promo chapters remain reachable and page fits the screen', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Lernen');
  const initial = await page.locator('.phone-model').evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy(0, 300));
  await expect.poll(() => page.locator('.phone-model').evaluate(el => getComputedStyle(el).transform)).not.toBe(initial);
  await page.getByRole('link', { name: 'Entdecke Lernspur', exact: true }).click();
  for (const count of ['02 / 04', '03 / 04', '04 / 04']) {
    await page.getByRole('button', { name: 'Nächste Funktion' }).click();
    await expect(page.locator('.story-count')).toHaveText(count);
    await expect.poll(() => page.locator('.story-viewport').evaluate(el => {
      const cards = [...el.querySelectorAll('.story-card')];
      const active = Number(document.querySelector('.story-count')?.textContent?.slice(0, 2)) - 1;
      const rect = cards[active].getBoundingClientRect();
      return rect.left >= -1 && rect.right <= innerWidth + 1;
    })).toBe(true);
  }
  await expect(page.getByRole('button', { name: 'Nächste Funktion' })).toBeDisabled();
  await page.getByRole('button', { name: 'Vorherige Funktion' }).click();
  await expect(page.locator('.story-count')).toHaveText('03 / 04');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('reduced motion keeps phone still and all chapters usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const initial = await page.locator('.phone-model').evaluate(el => getComputedStyle(el).transform);
  await page.getByRole('link', { name: 'Entdecke Lernspur', exact: true }).click();
  await page.getByRole('button', { name: 'Nächste Funktion' }).click();
  await expect(page.locator('.story-count')).toHaveText('02 / 04');
  expect(await page.locator('.phone-model').evaluate(el => getComputedStyle(el).transform)).toBe(initial);
});

test('demo link, current gallery and honest Plus status remain available', async ({ page }) => {
  await page.goto('./');
  await page.locator('summary').filter({ hasText: 'Was bekomme ich mit Plus?' }).click();
  await expect(page.locator('details[open]')).toContainText('kostenlos frei');
  await expect(page.locator('details[open]')).toContainText('nicht aktiv');
  await page.getByRole('link', { name: 'Mehr App-Einblicke', exact: true }).click();
  await expect(page.locator('main')).toContainText('Lernspur 1.2.0');
  for (const img of await page.locator('.grid img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.getByRole('link', { name: 'Zur Startseite' }).click();
  await page.getByRole('link', { name: 'App ausprobieren', exact: true }).click();
  await expect(page.locator('#capture-text')).toBeVisible();
  await expect(page.locator('#save-capture')).toBeDisabled();
});
