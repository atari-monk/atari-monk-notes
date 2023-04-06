import { View } from './view.js';

export class KeyView extends View {
  createContent() {
    document.body.appendChild(
      this._getNewParent(
        this._getParentElement('template-protect-overlay', '#protect-overlay')
      )
    );
  }

  protect() {
    const overlay = document.getElementById('protect-overlay');
    overlay.getElementsByTagName('form')[0].onsubmit = function () {
      if (this.answer.value === atob('c2hvR3VuMjg0MTg=')) {
        overlay.style.display = 'none';
        console.log('Welcome');
      } else {
        alert('Wrong password!');
      }
      return false;
    };
  }
}
