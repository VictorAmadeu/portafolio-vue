import { mount, RouterLinkStub } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
  it("renderiza el nombre, el resumen profesional y las acciones principales", () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Victor Amadeu Braga Heleno");
    expect(wrapper.text()).toContain("Desarrollador Full Stack Junior");
    expect(wrapper.text()).toContain("Hablemos");
    expect(wrapper.text()).toContain("Ver proyectos");
    expect(wrapper.text()).toContain("Descargar CV");

    const downloadLink = wrapper.get("a[download]");
    expect(downloadLink.attributes("href")).toContain("curriculo.pdf");
  });
});
