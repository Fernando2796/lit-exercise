import { LitElement, html, css } from "lit-element";
import "./card-view";
class HomePage extends LitElement {
  static get styles() {
    return css`
      div {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        box-sizing: border-box;
        gap: 2rem;
        overflow: auto;
        padding: 1.5rem;
      }

      h1 {
        width: 100%;
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      rickAndMortyData: { type: Array },
    };
  }
  async getDataApi() {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    this.rickAndMortyData = data.results;
  }

  constructor() {
    super();
    this.rickAndMortyData = [];
  }

  render() {
    return html`
      <div>
        <h1>Rick and Morty</h1>
        ${this.rickAndMortyData.map(
          (character) => html`<card-view .character=${character}></card-view>`
        )}
      </div>
    `;
  }

  firstUpdated() {
    this.getDataApi();
  }
}

customElements.define("home-page", HomePage);
