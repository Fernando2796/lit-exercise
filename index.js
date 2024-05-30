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
      favoriteList: { type: Array },
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
    this.favoriteList = [];
  }

  existCharacterInListFavorite(id) {
    return this.favoriteList.some((character) => character.id === id);
  }

  addCharacterToLisFavoriteList(event) {
    if (!this.existCharacterInListFavorite(event.detail.character.id)) {
      this.favoriteList = [...this.favoriteList, event.detail.character];
    }

    console.log(event.detail.character.id);

    // const character = event.detail.character;
    // const isFavorite = this.favorites.includes(character);
    // if (isFavorite) {
    //   this.favorites = this.favorites.filter(fav => fav !== character);
    // } else {
    //   this.favorites = [...this.favorites, character];
    // }
  }

  render() {
    return html`
      <div>
        <h1>Rick and Morty</h1>
        ${this.rickAndMortyData.map(
          (character) =>
            html`<card-view
              .character=${character}
              @add-favorite=${this.addCharacterToLisFavoriteList}
            ></card-view>`
        )}

        <div>
          ${this.favoriteList.map(
            (character) =>
              html` <card-view .character=${character}></card-view> `
          )}
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.getDataApi();
  }
}

customElements.define("home-page", HomePage);
