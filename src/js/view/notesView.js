
export class NotesView {

  generateTemplate(data) {
    console.log('NotesView2');
    data.forEach(note => {
      note.points.forEach(point => {
        const title = point.text;
        point.codes.forEach(code => {
          const noteText = code.format.join("\n<br>")
          this.#createContent(title, noteText);
        })
      })
    });

    let noteTexts = document.querySelectorAll('.note-text');
    let noteCopies = document.querySelectorAll('.note-copy');
    let i = 0;
    noteCopies.forEach(copyText => {
      let noteText = noteTexts[i];
      copyText.addEventListener('click', () => {
        let title = noteText.querySelector('.note-title');
        let text = noteText.querySelector('.note-note');
        var txt = `${title.textContent}${text.textContent}`;
        navigator.clipboard.writeText(txt);
      });
      i++;
    });
  }

  #createContent(title, note) {
    const template = document.getElementsByTagName("template")[0];
    const noteCtrl = template.content.querySelector(".note");
    let newNode, i;
    newNode = document.importNode(noteCtrl, true);
    const titleEl = newNode.querySelector(".note-title");
    titleEl.textContent = titleEl.textContent.replace(/{%TITLE%}/g, `${title}\n`);
    const noteEl = newNode.querySelector(".note-note");
    noteEl.innerHTML = noteEl.textContent.replace(/{%NOTE%}/g, note);
    document.body.appendChild(newNode);
  }
}

export default new NotesView();
