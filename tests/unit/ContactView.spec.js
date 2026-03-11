import { flushPromises, mount } from "@vue/test-utils";
import ContactView from "@/views/ContactView.vue";
import { supabase } from "@/services/supabase.js";

vi.mock("@/services/supabase.js", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

async function fillForm(wrapper) {
  await wrapper.get("#name").setValue("Victor");
  await wrapper.get("#email").setValue("victor@example.com");
  await wrapper.get("#subject").setValue("Consulta");
  await wrapper.get("#message").setValue("Quiero hablar sobre una oportunidad.");
}

describe("ContactView", () => {
  beforeEach(() => {
    supabase.from.mockReset();
  });

  it("envia el mensaje y reinicia el formulario cuando Supabase responde sin error", async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    supabase.from.mockReturnValue({
      insert: insertMock,
    });

    const wrapper = mount(ContactView);

    await fillForm(wrapper);
    await wrapper.get("form").trigger("submit.prevent");
    await flushPromises();

    expect(supabase.from).toHaveBeenCalledWith("mensajes");
    expect(insertMock).toHaveBeenCalledWith([
      {
        nombre: "Victor",
        email: "victor@example.com",
        asunto: "Consulta",
        mensaje: "Quiero hablar sobre una oportunidad.",
      },
    ]);
    expect(wrapper.text()).toContain("Su mensaje ha sido enviado");
    expect(wrapper.vm.form).toEqual({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  });

  it("muestra un error cuando Supabase devuelve un fallo", async () => {
    const insertMock = vi.fn().mockResolvedValue({
      error: { message: "fallo de prueba" },
    });
    supabase.from.mockReturnValue({
      insert: insertMock,
    });

    const wrapper = mount(ContactView);

    await fillForm(wrapper);
    await wrapper.get("form").trigger("submit.prevent");
    await flushPromises();

    expect(wrapper.text()).toContain("No ha sido posible enviar su mensaje.");
    expect(wrapper.text()).not.toContain("Su mensaje ha sido enviado");
  });
});
