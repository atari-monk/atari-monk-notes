import { Injector } from './../tool/injector.js'

class InjectorTest {
  #injector;
  #dictionary;

  constructor(injector) {
    this.#injector = injector;
    this.#dictionary = this.#getDictionary();
  }

  #getDictionary() {
    return {
      inject: [
        {
          key: '{%BR%}',
          text: '<br>',
        },
        {
          key: '{%TAB%}',
          text: "<span class='tab'></span>",
        },
        {
          key: '{%BR_TAB%}',
          text: "<br><span class='tab'></span>",
        },
        {
          key: '{%NAV%}',
          text: "<br><a class='center' href='#'>Back to Top</a>",
        },
        {
          key: '{%NAV2%}',
          text: "<br><a href='#'>Back to Top</a>",
        },
        {
          key: '{%CONTENT%}',
          text: "<br><a href='#content'>Back to Content</a>",
        },
        {
          key: '{%CONTENT2%}',
          text: "<a href='#content'>Back to Content</a>",
        },
      ],
    };
  }

  test() {
    const result = this.#injector.inject(
      'bla bla bla {%NAV%} bla bla bla bla bla bla bla {%NAV%} bla bla bla bla bla bla bla {%NAV%} bla bla bla bla',
      this.#dictionary.inject
    );
    console.log(result);
  }
}

const test = new InjectorTest(new Injector());
test.test();