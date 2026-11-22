class FunFacts extends HTMLElement {

  static get observedAttributes() {
    return ['data-compact'];
  }

  constructor() {
    super();
    this.count = 0;
  }

  connectedCallback() {
    this.itemTitle = document.createElement('h3');
    this.itemTitle.textContent = 'Random useless fact';

    this.factText = document.createElement('p');
    this.factText.textContent = 'Press the button to load a fact.';

    this.itemDetail = document.createElement('p');
    this.itemDetail.textContent = 'Source: appears after a fact loads.';

    this.status = document.createElement('p');
    this.status.setAttribute('role', 'status');

    this.nextButton = document.createElement('button');
    this.nextButton.type = 'button';
    this.nextButton.textContent = 'Get a fact';

    //Request
    this.nextButton.addEventListener('click', () => {
      this.loadFact();
    });

    this.appendChild(this.itemTitle);
    this.appendChild(this.factText);     
    this.appendChild(this.itemDetail);
    this.appendChild(this.status);
    this.appendChild(this.nextButton);

    this.render();
  }

  render() {
    this.itemDetail.hidden = this.hasAttribute('data-compact');
  }

  async loadFact() {
    this.nextButton.disabled = true;
    this.nextButton.textContent = 'Loading...';
    this.status.textContent = 'Loading a new fact...';

    try {
      const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');

      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }

      const data = await response.json();

      if (typeof data?.text !== 'string' || data.text === '') {
        throw new Error('Expected a fact in the response.');
      }

      this.factText.textContent = data.text;

      if (typeof data.source === 'string') {
        this.itemDetail.textContent = 'Source: ' + data.source;
      } else {
        this.itemDetail.textContent = 'Source: not provided';
      }

      this.count = this.count + 1;
      this.status.textContent = 'Loaded fact ' + this.count + '.';
      this.nextButton.textContent = 'Get another fact';

    } catch (error) {
      console.error('Could not load the fact.', error);
      this.status.textContent = 'Could not load a fact. Check your connection and try again.';
      this.nextButton.textContent = 'Try again';

    } finally {
      this.nextButton.disabled = false;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.itemDetail) {
      return;
    }
    this.render();
  }
}

customElements.define('fun-facts', FunFacts);


const toggleButton = document.getElementById('compact-toggle');
const funFacts = document.querySelector('fun-facts');

toggleButton.addEventListener('click', () => {
  const isCompact = funFacts.toggleAttribute('data-compact');

  if (isCompact) {
    toggleButton.textContent = 'Switch to expanded view';
  } else {
    toggleButton.textContent = 'Switch to compact view';
  }
});