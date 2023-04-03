export class Beautifier {
  #options;

  constructor() {
    this.#options = {
      indent_size: '2',
      indent_char: ' ',
      max_preserve_newlines: '5',
      preserve_newlines: true,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'collapse',
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: '0',
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
    };
  }

  #getType(note) {
    if (note.hasOwnProperty('beautify') === false) return 'none';
    else return note.beautify.trim().toLowerCase();
  }

  beautify(note, code) {
    switch (this.#getType(note)) {
      case 'css':
        return css_beautify(code, this.#options);
      case 'js':
        return js_beautify(code, this.#options);
      case 'html':
        return html_beautify(code, this.#options);
      case 'none':
        return code;
    }
  }
}
