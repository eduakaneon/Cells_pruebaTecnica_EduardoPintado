## README

# Proyecto de Gestión de Productos

Este proyecto está compuesto por dos páginas principales: `CreateProductPage` y `ListProductPage`. Estas páginas permiten crear y listar productos utilizando componentes web de LitElement y BBVA.

## Contenidos

1. [Instalación](#instalación)
2. [Uso](#uso)
3. [Componentes](#componentes)
   - [CreateProductPage](#createproductpage)
   - [ListProductPage](#listproductpage)
4. [Estilos](#estilos)
5. [Internacionalización](#internacionalización)

## Instalación

Para instalar las dependencias del proyecto, asegúrate de tener `npm` instalado y ejecuta:

```bash
npm i
```

## Uso

Para ejecutar el proyecto en un entorno de desarrollo, puedes utilizar Docker para configurar el entorno Cells.

```bash
npm run start
```

## Componentes

### CreateProductPage

Este componente permite al usuario crear un nuevo producto mediante un formulario.

#### Código

```javascript
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
    return [styles];
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
    this._clearForm(); // Limpiar el formulario después de agregar el producto
    this.navigate('list-product');
  }
}

window.customElements.define(CreateProductPage.is, CreateProductPage);
```

#### Explicación

- **Método `_addProduct`**: Se encarga de capturar los datos del formulario, publicarlos en un evento y navegar a la página de listado.
- **Método `_clearForm`**: Limpia los campos del formulario después de que se añade un producto.
- **Renderizado del formulario**: Usa componentes de BBVA para crear el formulario.

### ListProductPage

Este componente muestra una lista de productos almacenados en `localStorage` y permite regresar a la página de creación de productos.

#### Código

```javascript
/* eslint-disable new-cap */
class ListProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'list-product-page';
  }

  static get styles() {
    return [styles];
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
      this._handlePublish();
    });
  }

  _handlePublish() {
    const { nameP, priceP } = this._product;

    if (this._product) {
      const existingProducts = JSON.parse(localStorage.getItem('productos')) || [];
      const newProduct = { nameP, priceP };
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
        <demo-data-dm></demo-data-dm>
      </demo-web-template>
    `;
  }
}

window.customElements.define(ListProductPage.is, ListProductPage);
```

#### Explicación

- **Método `_handlePublish`**: Guarda los productos en `localStorage` cada vez que se recibe un nuevo producto.
- **Método `_goBack`**: Navega de regreso a la página de creación de productos.
- **Método `_renderCardProduct`**: Renderiza la lista de productos desde `localStorage`.

## Estilos

Los estilos de cada componente se definen en archivos separados (`list-product-page-styles.js` y `create-product-page-styles.js`) y se importan dentro de los componentes.

```javascript
import styles from './list-product-page-styles.js';
import styles from './create-product-page-styles.js';
```

## Internacionalización

Se utilizan claves de internacionalización para los textos de la interfaz de usuario.

```javascript
const DEFAULT_I18N_KEYS = {
  formHeading: 'Formulario Producto',
  labelInput1: 'Nombre producto',
  labelInput2: 'Precio producto',
  labelButton: 'Crear Producto',
};
```

## Conclusión

Este proyecto proporciona una implementación básica para crear y listar productos utilizando componentes web personalizados. 
