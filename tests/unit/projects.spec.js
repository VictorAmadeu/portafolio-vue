import { getProjectBySlug, getProjects } from "@/data/projects";

describe("projects data", () => {
  it("devuelve el listado principal de proyectos", () => {
    const projects = getProjects();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects.some((project) => project.slug === "media-kit-jhulyana")).toBe(true);
  });

  it("recupera un proyecto por slug", () => {
    const project = getProjectBySlug("victorai-blog");

    expect(project).toBeDefined();
    expect(project.title).toBe("VictorAI Blog");
  });

  it("devuelve undefined si el slug no existe", () => {
    expect(getProjectBySlug("no-existe")).toBeUndefined();
  });
});
