import React from "react";
import ReactDOM from "react-dom";
import "@webcomponents/custom-elements";
import ContentScript from "./ContentScript";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";

class ReactExtensionContainer extends HTMLElement {
  connectedCallback() {
    let a = `if(typeof window.ethereum !== 'undefined') {
      async function getAccount() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        alert(account);
      }
      getAccount();
 }else{
alert('Not installed');
}`;
    var s = document.createElement("script");
    s.type = "text/javascript";
    var code = a;
    try {
      s.appendChild(document.createTextNode(code));
      document.body.appendChild(s);
    } catch (e) {
      s.text = code;
      document.body.appendChild(s);
    }

    const mountPoint = document.createElement("span");
    mountPoint.id = "reactExtensionPoint";

    const reactRoot = this.attachShadow({ mode: "open" }).appendChild(
      mountPoint
    );
    const reactRoot2 = this.attachShadow({ mode: "open" }).appendChild(s);

    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
      insertionPoint: reactRoot,
    });

    ReactDOM.render(
      <StylesProvider jss={jss}>
        <ContentScript />
      </StylesProvider>,
      mountPoint
    );
  }
}

const initWebComponent = function () {
  customElements.define("react-extension-container", ReactExtensionContainer);

  const app = document.createElement("react-extension-container");
  document.documentElement.appendChild(app);
};

initWebComponent();
