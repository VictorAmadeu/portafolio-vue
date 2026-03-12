import { devices, expect, test } from "@playwright/test";

test.use({
  ...devices["iPhone 12"],
});

test("abre el menu movil y navega a contacto", async ({ page }) => {
  await page.goto("/portafolio-vue/");

  const toggleButton = page.locator(".navbar-toggler");
  const navCollapse = page.locator("#navbarNav");

  await toggleButton.click();
  await expect(navCollapse).toHaveClass(/show/);

  await page.getByRole("link", { name: /Contacto/i }).click();

  await expect(page).toHaveURL(/#\/contact$/);
  await expect(page.getByRole("heading", { name: /Contacto/i })).toBeVisible();
  await expect(navCollapse).not.toHaveClass(/show/);
});
