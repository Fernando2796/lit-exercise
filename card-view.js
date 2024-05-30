import { LitElement, html, css } from "lit-element";

class CardView extends LitElement {
  static get properties() {
    return {
      character: { type: Object },
    };
  }

  addFavorite() {
    this.dispatchEvent(
      new CustomEvent("add-favorite", {
        detail: { character: this.character },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles() {
    return css`
      div {
        width: 250px;
        display: flex;
        flex-direction: column;
        height: auto;
        border-radius: 8px;
        padding: 16px;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        figure {
          width: 75%;
          height: auto;
        }
      }
    `;
  }
  constructor() {
    super();
    this.character = {};
  }

  render() {
    return html`
      <div>
        <figure>
          <img src=${this.character.image} />
        </figure>
        <h3>${this.character.name}</h3>
        <button @click=${this.addFavorite}>Agregar a favoritos</button>
      </div>
    `;
  }
}

customElements.define("card-view", CardView);
