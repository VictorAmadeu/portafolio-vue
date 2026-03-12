import { expect, test } from "@playwright/test";

test("envia el formulario de contacto sin usar Supabase real", async ({ page }) => {
  await page.route("**/rest/v1/mensajes*", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({
        status: 200,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "*",
        },
        body: "",
      });
      return;
    }

    await route.fulfill({
      status: 201,
      contentType: "application/json",
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "*",
      },
      body: JSON.stringify([{ id: 1 }]),
    });
  });

  await page.goto("/portafolio-vue/#/contact");

  await page.locator("#name").fill("Victor");
  await page.locator("#email").fill("victor@example.com");
  await page.locator("#subject").fill("Consulta");
  await page.locator("#message").fill("Quiero saber mas sobre tu trabajo.");
  await page.getByRole("button", { name: /Enviar/i }).click();

  await expect(page.getByText(/Su mensaje ha sido enviado/i)).toBeVisible();
});
