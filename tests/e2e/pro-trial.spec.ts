/**
 * End-to-end smoke tests for the RevoGrid Pro Trial examples.
 *
 * These tests intentionally stay simple: they verify that first-time users can
 * open each top-level example and that the Tree dropdowns show the same styled
 * content in menus as they do in cells.
 */
import { expect, test } from '@playwright/test';

test.describe('RevoGrid Pro trial examples', () => {
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
    await expect(page.locator('revo-grid')).toBeVisible();
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
});
