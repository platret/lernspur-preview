import { test, expect } from '@playwright/test';

test('capture needs one save and survives reload; optional tags update coverage', async ({ page }) => {
  await page.goto('./walkthrough.html');
  await expect(page.locator('#save-capture')).toBeDisabled();
  await page.locator('#capture-text').fill('Heute einen Fehler selbständig eingegrenzt.');
  await page.locator('#save-capture').click();
  await expect(page.locator('#save-capture')).toContainText('gespeichert');
  await page.locator('.tabbar [data-tab="journal"]').click();
  const note = page.locator('.capture-card').filter({ hasText: 'Heute einen Fehler selbständig eingegrenzt.' });
  await expect(note).toContainText('Noch nicht zugeordnet');
  await page.reload();
  await page.locator('.tabbar [data-tab="journal"]').click();
  await expect(note).toBeVisible();
  await note.click();
  await page.locator('.sheet [data-action="tags"]').click();
  await page.locator('[data-competency="demo-development"]').check();
  await page.locator('[data-competency="demo-testing"]').check();
  await page.locator('#new-project').fill('Lernspur Testprojekt');
  await page.getByRole('button', { name: 'Hinzufügen', exact: true }).click();
  await page.locator('.sheet [data-action="close-sheet"]').click();
  await page.locator('.sheet [data-action="close-sheet"]').click();
  await expect(note).toContainText('Lernspur Testprojekt');
  await expect(note).toContainText('DEMO 04');
  await page.locator('.tabbar [data-tab="coverage"]').click();
  await expect(page.locator('[data-action="coverage-filter"][data-id="demo-testing"]')).toContainText('2Einträge');
  await page.locator('[data-action="coverage-filter"][data-id="demo-testing"]').click();
  await expect(page.locator('.capture-card')).toHaveCount(2);
});

test('timeline combines competency, project and inclusive dates', async ({ page }) => {
  await page.goto('./walkthrough.html');
  await page.locator('.tabbar [data-tab="journal"]').click();
  await page.locator('[data-action="filter"]').click();
  await page.locator('#filter-competency').selectOption('demo-development');
  await page.locator('#filter-project').selectOption('portal');
  const today = await page.evaluate(() => { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; });
  await page.locator('#filter-from').fill(today);
  await page.locator('#filter-to').fill(today);
  await page.locator('.sheet [data-action="close-sheet"]').click();
  await expect(page.locator('.capture-card')).toHaveCount(1);
  await expect(page.locator('.capture-card')).toContainText('Fehler im Login');
  await page.locator('[data-action="clear-filter"]').click();
  await expect(page.locator('.capture-card')).toHaveCount(3);
});

test('report uses matching sources, saves six IPERKA sections and exports escaped text', async ({ page }) => {
  await page.goto('./walkthrough.html');
  await page.locator('.tabbar [data-tab="reports"]').click();
  await page.locator('[data-action="new-report"]').click();
  await page.locator('#report-title').fill('Login <script>prüfung</script>');
  await page.locator('#report-author').fill('Alex Muster');
  await page.locator('#report-competency').selectOption('demo-development');
  await expect(page.locator('.source-note')).toHaveCount(1);
  await page.locator('[data-action="create-report"]').click();
  await expect(page.locator('[data-action="sources"]')).toContainText('1 ausgewählte');
  await page.locator('[data-action="sources"]').click();
  await page.locator('[data-action="insert-source"]').click();
  await page.locator('.sheet [data-action="close-sheet"]').click();
  await expect(page.locator('#section-informieren')).toContainText('Fehler im Login');
  for (const name of ['informieren', 'planen', 'entscheiden', 'realisieren', 'kontrollieren', 'auswerten']) {
    await page.locator('#section-' + name).fill('Eigener Text für ' + name + '.');
  }
  await expect(page.locator('#export-report')).toBeEnabled();
  await page.evaluate(() => { window.print = () => { document.documentElement.dataset.printed = 'true'; }; });
  await page.locator('#export-report').click();
  await expect(page.locator('html')).toHaveAttribute('data-printed', 'true');
  await expect(page.locator('#print-report')).toContainText('Unterschrift Berufsbildner/in');
  await expect(page.locator('#print-report script')).toHaveCount(0);
  await page.reload();
  await page.locator('.tabbar [data-tab="reports"]').click();
  await expect(page.locator('.report-card')).toContainText('6 von 6 Abschnitten');
  await expect(page.locator('.report-card')).toContainText('Login <script>prüfung</script>');
  await page.locator('.report-card').click();
  await expect(page.locator('#section-auswerten')).toHaveValue('Eigener Text für auswerten.');
});

test('photo-only capture persists and draft survives reload', async ({ page }) => {
  await page.goto('./walkthrough.html');
  await page.locator('#capture-text').fill('Noch nicht gespeichert.');
  await page.reload();
  await expect(page.locator('#capture-text')).toHaveValue('Noch nicht gespeichert.');
  await page.locator('#capture-text').fill('');
  await page.locator('#photo-input').setInputFiles('public/app-icon.png');
  await expect(page.locator('.photo-preview')).toBeVisible();
  await expect(page.locator('#save-capture')).toBeEnabled();
  await page.locator('#save-capture').click();
  await page.locator('.tabbar [data-tab="journal"]').click();
  await page.getByRole('button').filter({ hasText: 'Ein Moment in Bildern' }).click();
  await expect(page.locator('.sheet .photo-preview')).toBeVisible();
});

test('all screens fit the viewport and have no runtime errors', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./walkthrough.html');
  await page.screenshot({ path: `../evidence/${testInfo.project.name}-home.png`, fullPage: true, animations: 'disabled' });
  for (const tab of ['capture', 'journal', 'reports', 'coverage']) {
    await page.locator(`.tabbar [data-tab="${tab}"]`).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `../evidence/${testInfo.project.name}-${tab}.png`, fullPage: true, animations: 'disabled' });
  }
  expect(errors).toEqual([]);
});
