import { expect, test } from "@playwright/test";

test("carga la home y permite navegar al listado de proyectos", async ({ page }) => {
  await page.goto("/portafolio-vue/");

  await expect(
    page.getByRole("heading", { name: "Victor Amadeu Braga Heleno" })
  ).toBeVisible();

  await page.locator("nav").getByRole("link", { name: /Proyectos/i }).click();

  await expect(page).toHaveURL(/#\/projects$/);
  await expect(page.getByRole("heading", { name: /Mis Proyectos/i })).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(2);
});
