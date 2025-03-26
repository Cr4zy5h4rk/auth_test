import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
interface OidcConfig {
  acr_values: string;
  authorizeUri: string;
  claims_locales: string;
  client_id: string;
  display: string;
  max_age: number;
  nonce: string;
  prompt: string;
  redirect_uri: string;
  scope: string;
  state: string;
  ui_locales: string;
}

interface ButtonConfig {
  labelText: string;
  shape: string;
  theme: string;
  type: string;
}

declare global {
  interface Window {
    SignInWithEsignetButton?: {
      init: (config: {
        oidcConfig: OidcConfig;
        buttonConfig: ButtonConfig;
        signInElement: HTMLElement | null;
      }) => void;
    };
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  template: `<div id="sign-in-with-esignet" style="width: 100%; height: 100%">sign in</div>`,
  styles: []
})
export class LoginComponent implements AfterViewInit {
  
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.renderButton();
  }

  randomString(length:number) {

    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for ( let i = 0; i < length; i++ ) {

        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));

    }

    return result;

}

  private renderButton(): void {
    if (window.SignInWithEsignetButton) {
      window.SignInWithEsignetButton.init({
        oidcConfig: {
          acr_values: 'mosip:idp:acr:generated-code mosip:idp:acr:biometrics mosip:idp:acr:static-code',
          authorizeUri: 'http://localhost:3000/authorize',
          claims_locales: 'en',
          client_id: 'IIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl4nzy',
          display: 'page',
          max_age: 21,
          nonce: this.randomString(10),
          prompt: 'consent',
          redirect_uri: 'http://localhost:4200/callback',
          scope: 'openid profile',
          state: 'eree2311',
          ui_locales: 'en'
        },
        buttonConfig: {
          labelText: 'Sign in with eSignet',
          shape: 'soft_edges',
          theme: 'filled_orange',
          type: 'standard'
        },
        signInElement: document.getElementById("sign-in-with-esignet")
      });
    }
  }
}