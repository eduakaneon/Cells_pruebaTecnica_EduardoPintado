/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { randomID } from '@bbva-web-components/bbva-core-lit-helpers/utils/randomId.js';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import {
  bbvaCarbonfootprint,
  bbvaClimateaction,
  bbvaInclusivegrowth,
  bbvaFacebook,
  bbvaTwitter,
  bbvaInstagram,
  bbvaLinkedin,
  bbvaGoogleplus,
  bbvaPinterest,
  bbvaYoutube
} from '@bbva-web-components/bbva-foundations-icons';
import {
  expenses,
  moneygraphic
} from '@bbva-web-components/bbva-foundations-microillustrations';
import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-web-form-fieldset/bbva-web-form-fieldset.js';
import '@bbva-web-components/bbva-web-form-radio-button/bbva-web-form-radio-button.js';

import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';
import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer-language-list-item.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './create-product-page-styles.js';

const panelIcons = {
  carbonfootprint: bbvaCarbonfootprint(),
  climateaction: bbvaClimateaction(),
  inclusivegrowth: bbvaInclusivegrowth(),
};

const footerIcons = {
  facebook: bbvaFacebook(),
  twitter: bbvaTwitter(),
  instagram: bbvaInstagram(),
  linkedin: bbvaLinkedin(),
  googleplus: bbvaGoogleplus(),
  pinterest: bbvaPinterest(),
  youtub: bbvaYoutube()
};

const DEFAULT_I18N_KEYS = {

  formHeading: 'Formulario Producto',

  labelInput1: 'Nombre producto',
  labelInput2: 'Precio producto',
  labelButton: 'Crear Producto',

};

/* eslint-disable new-cap */
class CreateProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'create-product-page';
  }


  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
  }

  static get properties() {
    return {
      i18nKeys: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    window.IntlMsg.lang = localStorage.getItem('language') || 'en-US';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this.i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }
    super.update && super.update(props);
  }

  _clearForm() {
    this.shadowRoot.querySelector('#name').value = '';
    this.shadowRoot.querySelector('#amount').value = '';
  }

  render() {
    return html`
      <demo-web-template page-title="Create Product">
        <div slot="app-main-content">
          ${this._formProductTpl}
        </div>
      </demo-web-template>
    `;
  }

  get _formProductTpl() {
    return html`
      <form enctype="multipart/form-data">
        <h2>${this.t(this.i18nKeys.formHeading)}</h2>
        <bbva-web-form-text id="name" label="${this.t(this.i18nKeys.labelInput1)}"></bbva-web-form-text>
        <bbva-web-form-amount id="amount" label="${this.t(this.i18nKeys.labelInput2)}"></bbva-web-form-amount>
        <bbva-web-button-default id="send" type="button" @click="${this._addProduct}">
          ${this.t(this.i18nKeys.labelButton)}
        </bbva-web-button-default>
      </form>
    `;
  }

  _addProduct(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const productName = this.shadowRoot.querySelector('#name').value;
    const productAmount = this.shadowRoot.querySelector('#amount').value;

    const details = {
      nameP: productName,
      priceP: productAmount
    };

    this.publish('añadir_producto', details);
    this._clearForm();
    this.navigate('list-product');
  }


}

window.customElements.define(CreateProductPage.is, CreateProductPage);