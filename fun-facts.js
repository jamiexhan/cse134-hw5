class FunFacts extends HTMLElement {

  static get observedAttributes() {
    return ['data-compact'];
  }

  constructor() {
    super();
    this.items = [
      {
        title: 'I am a dancer!',
        detail: 'I have performed and competed in various styles, including contemporary, hip hop, lyrical, jazz, drill, and colorguard.'
      },
      {
        title: 'A camera hobbyist',
        detail: 'I am a photography and film hobbyist, photographing landscapes and creating rhythm-based video montages.'
      }
    ];
    //Which card is showing (0 = the first one)
    this.index = 0;
  }

  //Runs when the component is added to the page
  connectedCallback() {
    this.heading = document.createElement('h3');
    this.heading.textContent = 'Get to know me';

    this.itemTitle = document.createElement('h4');
    this.itemDetail = document.createElement('p');

    this.status = document.createElement('p');
    this.status.setAttribute('role', 'status');   //screen readers announce changes

    this.nextButton = document.createElement('button');
    this.nextButton.type = 'button';
    this.nextButton.textContent = 'Next fact';

    //Arrow keeps "this" pointing at the component
    this.nextButton.addEventListener('click', () => {
      this.index = this.index + 1;
      if (this.index >= this.items.length) {
        this.index = 0;                 //wrap around to the first card
      }
      this.render();
    });

    this.appendChild(this.heading);
    this.appendChild(this.itemTitle);
    this.appendChild(this.itemDetail);
    this.appendChild(this.status);
    this.appendChild(this.nextButton);

    this.render();                      
  }

  render() {
    const item = this.items[this.index];
    this.itemTitle.textContent = item.title;
    this.itemDetail.textContent = item.detail;

    //Compact mode hides detail line, expanded mode shows it
    this.itemDetail.hidden = this.hasAttribute('data-compact');

    this.status.textContent = 'Fact ' + (this.index + 1) + ' of ' + this.items.length;
  }

  //Calls this when data-compact is added, changed, or removed
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.itemTitle) {
      return;
    }
    this.render();
  }
}

customElements.define('fun-facts', FunFacts);


const toggleButton = document.getElementById('compact-toggle');
const funFacts = document.querySelector('fun-facts');

toggleButton.addEventListener('click', () => {
  // Adds data-compact if missing, removes it if present.
  // Returns true when the attribute is now on.
  const isCompact = funFacts.toggleAttribute('data-compact');

  if (isCompact) {
    toggleButton.textContent = 'Switch to expanded view';
  } else {
    toggleButton.textContent = 'Switch to compact view';
  }
});