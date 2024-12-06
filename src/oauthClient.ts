export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
}

export class OAuthClient {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;

  constructor(config: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    authorizationEndpoint: string;
    tokenEndpoint: string;
  }) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
    this.authorizationEndpoint = config.authorizationEndpoint;
    this.tokenEndpoint = config.tokenEndpoint;
  }

  startAuthFlow(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: "code",
      scope: "openid profile email offline_access",
      state: this.generateState(),
    });
    return `${this.authorizationEndpoint}?${params.toString()}`;
  }

  //handleCallback method that exchanges the code for tokens
  async handleCallback(callbackParams: {
    code: string;
    state: string;
  }): Promise<TokenResponse> {
    const { code } = callbackParams;
    const response = await fetch(this.tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Token exchange failed:", errorData);
      throw new Error("Failed to exchange code for tokens");
    }

    const tokenResponse = await response.json();
    console.log("Token response:", tokenResponse);

    return tokenResponse;
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
