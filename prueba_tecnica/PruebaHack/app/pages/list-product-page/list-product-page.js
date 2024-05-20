/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaWebCardProduct } from '@bbva-web-components/bbva-web-card-product';
import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer-language-list-item.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
import styles from './list-product-page-styles.js';

/* eslint-disable new-cap */
class ListProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'list-product-page';
  }

  static get styles() {
    return [ styles ];
  }

  static get properties() {
    return {
      _product: { type: Object }
    };
  }

  constructor() {
    super();
    this.i18nKeys = {};
  }


  onPageEnter() {
    this.subscribe('añadir_producto', (ev) => {
      this._product = ev;
    });
    this._handlePublish(this._product);
    this._renderCardProduct();
  }


  _handlePublish() {
    const { nameP, priceP } = this._product;

    if (this._product) {
      const existingProducts = JSON.parse(localStorage.getItem('productos')) || [];
      const newProduct = { nameP, priceP};
      existingProducts.push(newProduct);
      localStorage.setItem('productos', JSON.stringify(existingProducts));
    }
  }
  _goBack() {
    this.navigate('create-product');
  }
  _renderCardProduct() {
    const products = JSON.parse(localStorage.getItem('productos')) || [];
    return html`
      ${products.map((product, index) => html`
        <bbva-web-card-product
          badge-text="${index + 1}. ${product.nameP}"
          preheading="${product.priceP} €"
        ></bbva-web-card-product>
      `)}
    `;
  }


  render() {
    return html`
      <demo-web-template page-title="List Products">
        <div class="top" slot="app-top-content">
        <h1>Lista productos</h1>
        </div>
        <div class="main" slot="app-main-content">  
          ${this._renderCardProduct()}
          <bbva-web-button-default @click="${this._goBack}">Volver</bbva-web-button-default>
        </div>
        <demo-data-dm ></demo-data-dm>
      </demo-web-template>
    `;
  }
}

window.customElements.define(ListProductPage.is, ListProductPage);