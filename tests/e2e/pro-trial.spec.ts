/**
 * End-to-end smoke tests for the RevoGrid Pro Trial examples.
 *
 * These tests intentionally stay simple: they verify that first-time users can
 * open each top-level example and that the Tree dropdowns show the same styled
 * content in menus as they do in cells.
 */
import { expect, test } from '@playwright/test';

test.describe('RevoGrid Pro trial examples', () => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 600 }, { width: 390, height: 844 }]) {
    test(`keeps every example inside the viewport at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');

      for (const name of ['Tree', 'Pivot', 'Gantt', 'Scheduler']) {
        await page.getByRole('tab', { name, exact: true }).click();
        await expect(page.locator('revo-grid[theme="material"]')).toBeVisible();
        await expect.poll(() => page.evaluate(() => {
          const frame = document.querySelector('.app-frame')!.getBoundingClientRect();
          const host = document.querySelector('.grid-host')!.getBoundingClientRect();
          return document.documentElement.scrollHeight <= window.innerHeight
            && document.body.scrollHeight <= window.innerHeight
            && frame.bottom <= window.innerHeight
            && host.bottom <= frame.bottom
            && host.height > 0;
        }), { message: `${name} should fit without body scrolling` }).toBe(true);
      }
    });
  }

  test('starts on the Tree example and renders a grid', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/#tree$/);
    await expect(page.getByRole('heading', { name: 'Tree view' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Tree' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('button', { name: 'Expand all' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Collapse all' })).toBeVisible();
    await expect(page.locator('.owner-chip').first()).toBeVisible();
    await expect(page.locator('.status-badge--active').first()).toBeVisible();
    await expect(page.locator('revo-grid')).toBeVisible();
  });

  test('shows user chips inside the Tree owner dropdown', async ({ page }) => {
    await page.goto('/#tree');
    await page.locator('.owner-chip').first().click();

    await expect(page.locator('.revo-dropdown-menu .owner-chip').filter({ hasText: 'Maya Chen' })).toBeVisible();
    await expect(page.locator('.revo-dropdown-menu .owner-role').filter({ hasText: 'Product Lead' })).toBeVisible();
  });

  test('shows badge styling inside the Tree status dropdown', async ({ page }) => {
    await page.goto('/#tree');
    await page.locator('.status-badge--active').first().click();

    await expect(page.locator('.revo-dropdown-menu .status-badge--planned')).toBeVisible();
    await expect(page.locator('.revo-dropdown-menu .status-badge--active')).toBeVisible();
    await expect(page.locator('.revo-dropdown-menu .status-badge--review')).toBeVisible();
    await expect(page.locator('.revo-dropdown-menu .status-badge--blocked')).toBeVisible();
  });

  test('switches to Pivot and exposes the row grouping toggle', async ({ page }) => {
    await page.goto('/#tree');
    await page.getByRole('tab', { name: 'Pivot' }).click();

    await expect(page).toHaveURL(/#pivot$/);
    await expect(page.getByRole('heading', { name: 'Pivot analysis' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Pivot' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByLabel('Row grouping')).toBeVisible();
    const layout = page.getByRole('tabpanel', { name: 'Layout', exact: true });
    await expect(layout.getByText('Rows', { exact: true })).toBeVisible();
    await expect(layout.getByText('Columns', { exact: true })).toBeVisible();
    await expect(layout.getByText('Values', { exact: true })).toBeVisible();
    await expect(layout.getByText('Filters', { exact: true })).toBeVisible();
    await expect(page.locator('revo-grid[theme="material"]')).toBeVisible();
  });

  test('switches to Gantt and renders the trial toolbar', async ({ page }) => {
    await page.goto('/#tree');
    await page.getByRole('tab', { name: 'Gantt' }).click();

    await expect(page).toHaveURL(/#gantt$/);
    await expect(page.getByRole('heading', { name: 'Gantt planner' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Gantt' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Basic timeline')).toBeVisible();
    await expect(page.getByPlaceholder('Search tasks...')).toBeVisible();
    await expect(page.locator('revo-grid')).toBeVisible();
  });

  test('switches to Scheduler and renders the full week view', async ({ page }) => {
    await page.goto('/#tree');
    await page.getByRole('tab', { name: 'Scheduler' }).click();

    await expect(page).toHaveURL(/#scheduler$/);
    await expect(page.getByRole('tab', { name: 'Scheduler' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('heading', { name: 'Event scheduler' })).toHaveCount(0);
    await expect(page.getByText('Week view', { exact: true })).toHaveCount(0);
    await expect(page.locator('revo-grid')).toBeVisible();
    const dayHeaders = page.getByRole('columnheader');
    await expect(dayHeaders).toHaveCount(7);
    await expect(dayHeaders.nth(0)).toContainText(/Sun.*7/i);
    await expect(dayHeaders.nth(1)).toContainText(/Mon.*8/i);
    await expect(page.getByText('Customer kickoff').first()).toBeVisible();

    const kickoffColor = await page
      .getByRole('button', { name: /Customer kickoff/ })
      .first()
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    const roadmapColor = await page
      .getByRole('button', { name: /Roadmap review/ })
      .first()
      .evaluate((element) => getComputedStyle(element).backgroundColor);

    expect(kickoffColor).not.toBe(roadmapColor);
  });

  test('shows authored progress in the Gantt Done column', async ({ page }) => {
    await page.goto('/#gantt');
    await page.getByRole('combobox').click();
    for (const name of ['WBS', 'Status', 'Start', 'Finish']) {
      await page.getByRole('option', { name, exact: true }).click();
    }
    await page.keyboard.press('Escape');

    const brief = page.getByRole('row').filter({
      has: page.getByRole('gridcell', { name: 'Stakeholder brief', exact: true }),
    });
    const prototype = page.getByRole('row').filter({
      has: page.getByRole('gridcell', { name: 'Prototype review', exact: true }),
    });
    await expect(brief.getByRole('progressbar', { name: '100%', exact: true })).toBeVisible();
    await expect(prototype.getByRole('progressbar', { name: '45%', exact: true })).toBeVisible();
    const summary = page.getByRole('row').filter({
      has: page.locator('.gantt-task-name-cell').filter({ hasText: 'Discovery' }),
    }).getByRole('progressbar');
    await expect(summary).toBeVisible();
    const summaryProgress = Number(await summary.getAttribute('aria-valuenow'));
    expect(summaryProgress).toBeGreaterThan(45);
    expect(summaryProgress).toBeLessThan(100);
  });

  test('renders a single hierarchy toggle and collapses Gantt children', async ({ page }) => {
    await page.goto('/#gantt');
    const taskNames = page.locator('.gantt-task-name-cell');
    const discovery = taskNames.filter({ hasText: 'Discovery' });
    const child = taskNames.filter({ hasText: 'Stakeholder brief' });
    await expect(child).toBeVisible();
    await expect(discovery.locator('.tree-toggle')).toHaveCount(1);
    await discovery.locator('.tree-toggle').click();
    await expect(child).toHaveCount(0);
    await discovery.locator('.tree-toggle').click();
    await expect(child).toBeVisible();
  });
});
