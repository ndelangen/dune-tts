export const formatFactionName = (name: string) => {
  const sections = name.split("-");
  return sections.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
};
