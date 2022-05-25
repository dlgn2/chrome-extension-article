import React from "react";
import ReactDOM from "react-dom";
import "@webcomponents/custom-elements";
import ContentScript from "./ContentScript";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import { claimPopup } from "./main";
import axios from 'axios';

class ReactExtensionContainer extends HTMLElement {
  connectedCallback() {
  
    console.log(chrome);



    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
      if(request.action == "readDom"){
      
      console.log(request);
      userAdd(request,window.location.hostname)
       sessionStorage.setItem("snickerDoodleUser",JSON.stringify(request))
      async function userAdd(main,url) {
        try {
          const response = await axios.post(
            "http://localhost:8800/api/users/userAdd",
            {
              email: `${main.email.email}`,
              email_id: `${main.email.id}`,
              location: `${JSON.stringify(main.location)}`,
              history: [url]
            }
          );
        } catch (error) {
         console.log(error)
        }
      }
      
      }
      })

      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
    try {
      document.head.appendChild(s);
    } catch (e) {
      document.head.appendChild(s);
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

    const reactRoot2 = this.attachShadow({ mode: "open" });
    reactRoot2.appendChild(s);

    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
      insertionPoint: reactRoot2,
    });

    ReactDOM.render(
      <StylesProvider jss={jss}>
        <ContentScript />
      </StylesProvider>
    );
  }
}

const initWebComponent = function () {
  customElements.define("react-extension-container", ReactExtensionContainer);

  const app = document.createElement("react-extension-container");
  app.id = "react-extension-container";
  document.body.appendChild(app);
};

initWebComponent();
