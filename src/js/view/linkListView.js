
export class LinkListView {

  createContent(data) {
    const articleTemplate = document.getElementById("template-link-list");
    const articleEl = articleTemplate.content.querySelector(".link-list");
    let newArticle = document.importNode(articleEl, true);
    const sectionTemplate = document.getElementById("template-link-list-list");
    const sectionEl = sectionTemplate.content.querySelector(".link-list-list");
    const itemTemplate = document.getElementById("template-link-list-item");
    const itemEl = itemTemplate.content.querySelector(".link-list-item");
    const sections = data.notes.filter(link => link.type === 'section');
    sections.forEach(sectionData => {
      const newSection = this.#buildSection(sectionData, sectionEl);
      this.#buildSectionLinks(sectionData, newSection.querySelector("ul"), itemEl);
      newArticle.appendChild(newSection);
    });
    document.body.appendChild(newArticle);
  }

  #buildSection(data, sectionEl) {
    const newSection = document.importNode(sectionEl, true);
    const titleEl = newSection.querySelector("h3");
    titleEl.textContent = titleEl.textContent.replace(/{%TITLE%}/g, `${data.title}`);
    return newSection;
  }

  #buildSectionLinks(data, parentEl, itemEl) {
    data.links.forEach(linkData => {
      const newItem = document.importNode(itemEl, true);
      const newItemLink = newItem.querySelector("a");
      newItemLink.textContent = newItemLink.textContent
        .replace(/{%LINK_TEXT%}/g, `${linkData.text}`);
      newItemLink.setAttribute("href", `${linkData.link}`);
      parentEl.appendChild(newItem);
    });
  }
}

export default new LinkListView();