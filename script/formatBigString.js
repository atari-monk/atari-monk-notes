function splitStringToFormat(str) {
  const lines = str.split('\n');
  const formattedLines = lines.map((line) => `${line}`);
  //formattedLines.unshift('');
  //formattedLines.push('');
  return formattedLines;
}

const bigString = `<!DOCTYPE html>
<html>
  <head>
    <title>Edit Navigation List</title>
  </head>

  <body>
    <h1>Edit Navigation List</h1>
    <form>
      {{#each nav}} <label for="title_{{@index}}">Title:</label>
      <input
        type="text"
        id="title_{{@index}}"
        name="title_{{@index}}"
        value="{{this.title}}"
      />
      <label for="link_{{@index}}">Link:</label>
      <input
        type="text"
        id="link_{{@index}}"
        name="link_{{@index}}"
        value="{{this.link}}"
      />
      <br /><br />
      {{/each}}
      <h2>Add New Navigation Item</h2>
      <label for="new_title">Title:</label>
      <input type="text" id="new_title" name="new_title" />
      <label for="new_link">Link:</label>
      <input type="text" id="new_link" name="new_link" /> <br /><br />
      <button type="submit">Save Changes</button>
    </form>
  </body>
</html>`;
const formattedLines = splitStringToFormat(bigString);
console.log(formattedLines);
