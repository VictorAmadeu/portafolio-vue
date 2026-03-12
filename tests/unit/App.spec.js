import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import HomeView from "@/views/HomeView.vue";
import ProjectDetail from "@/views/ProjectDetail.vue";
import ProjectsView from "@/views/ProjectsView.vue";

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "Home", component: HomeView },
      { path: "/about", name: "About", component: AboutView },
      { path: "/projects", name: "Projects", component: ProjectsView },
      {
        path: "/projects/:slug",
        name: "ProjectDetail",
        component: ProjectDetail,
      },
      { path: "/contact", name: "Contact", component: ContactView },
    ],
  });
}

describe("App", () => {
  it("permite navegar a la vista de proyectos", async () => {
    const router = createTestRouter();
    router.push("/");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/projects");
    await flushPromises();

    expect(wrapper.text()).toContain("Mis Proyectos");
    expect(wrapper.findAll(".project-card").length).toBeGreaterThan(0);
  });
});
