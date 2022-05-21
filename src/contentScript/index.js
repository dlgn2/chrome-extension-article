import React from "react";
import ReactDOM from "react-dom";
import "@webcomponents/custom-elements";
import ContentScript from "./ContentScript";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import { claimPopup } from "./main";

class ReactExtensionContainer extends HTMLElement {
  connectedCallback() {
    let a = `
`;
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

    const mountPoint = document.createElement("div");
    mountPoint.innerHTML = claimPopup.stringPopUp;

    let style2 = document.createElement("style");
    style2.textContent = claimPopup.popUpStyle;

    let scrpt = document.createElement("script");
    scrpt.type = "text/javascript";
    scrpt.appendChild(document.createTextNode(claimPopup.scrptb));

    const reactRoot = this.attachShadow({ mode: "open" });
    reactRoot.appendChild(mountPoint);
    reactRoot.appendChild(style2);
    reactRoot.appendChild(scrpt);

    const reactRoot2 = this.attachShadow({ mode: "open" }).appendChild(s);

    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
      insertionPoint: reactRoot2,
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
  app.id = "react-extension-container";
  document.documentElement.appendChild(app);
};

initWebComponent();
