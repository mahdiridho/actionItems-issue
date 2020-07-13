import { LitElement, html } from 'lit-element';
import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';

class MyApp extends (LitElement) {
  render() {
    return html`
      <style>
        mwc-icon-button.menu[hidden] {
          display: none;
        }
        mwc-top-app-bar {
          --mdc-top-app-bar-width: ${this.desktop?'calc(100% - 256px)':'100%'};
        }
      </style>
      <mwc-drawer hasHeader .type="${this.desktop ? '' : 'modal'}" ?open=${this.drawerState} @MDCDrawer:closed="${() => this.drawerState = !this.drawerState}">
        <span slot="title">Menu</span>
        <span slot="subtitle">subtitle</span>
        <div>
          <p>Drawer content!</p>
        </div>
        <div slot="appContent">
          <mwc-top-app-bar>
            <mwc-icon-button slot="navigationIcon" class="menu" icon="menu" ?hidden="${this.desktop}" @click="${() => this.drawerState = !this.drawerState}"></mwc-icon-button>
            <div slot="title">My App</div>
            <mwc-icon-button slot="actionItems" icon="account_circle" title="Profile"></mwc-icon-button>
          </mwc-top-app-bar>
          <div>
            <p>Main Content!</p>
          </div>
        </div>
      </mwc-drawer>
    `;
  }

  static get properties() {
    return {
      desktop: { type: Boolean },
      drawerState: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.desktop = false;
    this.drawerState = false;
  }

  installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
    let mql = window.matchMedia(mediaQuery);
    mql.addListener(e => layoutChangedCallback(e.matches));
    layoutChangedCallback(mql.matches);
  };

  firstUpdated() {
    this.installMediaQueryWatcher(`(min-width: 460px)`, desktop => {
      this.desktop = desktop
    });
  }
}

window.customElements.define('my-app', MyApp);