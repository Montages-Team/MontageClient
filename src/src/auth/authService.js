import auth0 from 'auth0-js';
import { EventEmitter } from 'events';
import authConfig from '../../auth_config.json';

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain, // auth0の認証サーバ
  // リクエストID取得後にリダイレクトされるURL
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId, // auth0のクライアントID
  responseType: 'token id_token', // token id_tokenと書くことでaccess_tokenとid_token両方を要求
  scope: 'openid profile email',
});

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
  idToken = null;
  profile = null; // 取得される情報はprofileにまとめて取得される
  tokenExpiry = null;
  accessToken = null;
  accessTokenExpiry = null;

  login(customState) {
    // ログイン時に認証処理を行う。
    webAuth.authorize({
      appState: customState,
    });
  }

  logOut() {
    // ログアウト時にセッション情報の削除などを行う。
    localStorage.removeItem(localStorageKey);

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    webAuth.logout({
      returnTo: `${window.location.origin}`,
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  handleAuthentication() {
    /**
     * CallbackURLへ遷移されてcreatedされたときに呼ばれる
     */
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          this.emit(loginEvent, {
            loggedIn: false,
            error: err,
            errorMsg: err.statusText,
          });
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
          // localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('Authorization', authResult.idToken);
          localStorage.setItem('access_token', authResult.accessToken);
        }
      });
    });
  }

  isAuthenticated() {
    /**
     * 認証されているかをトークンの有効期限を検証して確認する.
     */
    return (
      Date.now() < this.tokenExpiry &&
      localStorage.getItem(localStorageKey) === 'true'
    );
  }

  isIdTokenValid() {
    /**
     * トークンの存在確認と有効期限の検証
     */
    return this.idToken && this.tokenExpiry && Date.now() < this.tokenExpiry;
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken);
      } else if (this.isAuthenticated()) {
        this.renewTokens().then( (authResult) => {
              resolve(authResult.idToken);
            }, reject);
      } else {
        resolve();
      }
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.tokenExpiry = new Date(this.profile.exp * 1000);
    this.accessToken = authResult.accessToken;
    this.accessTokenExpiry = new Date(Date.now() + authResult.expiresIn * 1000);

    localStorage.setItem(localStorageKey, 'true');

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {},
    });
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        return reject('Not logged in');
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }

  isAccessTokenValid() {
    return (
      this.accessToken &&
      this.accessTokenExpiry &&
      Date.now() < this.accessTokenExpiry
    );
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        resolve(this.accessToken);
      } else {
        this.renewTokens().then(authResult => {
          resolve(authResult.accessToken);
        }, reject);
      }
    });
  }
}

const service = new AuthService();

service.setMaxListeners(5);

export default service;
