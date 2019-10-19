import auth0 from 'auth0-js';
import { EventEmitter } from 'events';

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN || '', // auth0の認証サーバ
  // リクエストID取得後にリダイレクトされるURL
  redirectUri: `${window.location.origin}/callback`,
  clientID: process.env.VUE_APP_AUTH0_CLIENT_ID || '', // auth0のクライアントID
  responseType: 'token id_token', // token id_tokenと書くことでaccess_tokenとid_token両方を要求
  scope: 'openid profile email',
});

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

export interface IAuth {
  idToken: any;
  profile: any;
  tokenExpiry: any;
  accessToken: any;
  accessTokenExpiry: any;
  login: any;
  logOut: any;
  handleAuthentication: any;
  isAuthenticated: any;
  isIdTokenValid: any;
  getIdToken: any;
  localLogin: any;
  renewTokens: any;
  isAccessTokenValid: any;
  getAccessToken: any;
}

export class AuthService extends EventEmitter {
  public idToken!: any;
  public profile!: any; // 取得される情報はprofileにまとめて取得される
  public tokenExpiry!: any;
  public accessToken!: any;
  public accessTokenExpiry!: any;

  public login(customState?: any) {
    // ログイン時に認証処理を行う。
    webAuth.authorize({
      appState: customState,
      connection: 'twitter',
    });
  }

  public logOut() {
    // ログアウト時にセッション情報の削除などを行う。
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem('expires_at');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('Authorization');

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    webAuth.logout({
      returnTo: `${window.location.origin}`,
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  public handleAuthentication() {
    /**
     * auth0からのcallbackリクエストをハンドルする関数
     * CallbackURLへ遷移されてcreatedされたときに呼ばれる
     * 認証情報はCallbackURL内にhashとして格納され、このメソッドではそのハッシュの処理を担当する
     */
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err: any, authResult: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  public isAuthenticated() {
    /**
     * 認証されているかをローカルストレージフラグがTrueかどうかで確認
     * また、トークンの有効期限を確認する.
     */
    if (this.tokenExpiry === undefined) {
      this.tokenExpiry = localStorage.getItem('expires_at');
    }
    return(Date.now() < Date.parse(this.tokenExpiry) && localStorage.getItem(localStorageKey) === 'true');
  }

  public isIdTokenValid() {
    /**
     * トークンの存在確認と有効期限の検証
     */
    return this.idToken && this.tokenExpiry && Date.now() < this.tokenExpiry;
  }

  public getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken);
      } else if (this.isAuthenticated()) {
        this.renewTokens().then( (authResult: any) => {
              resolve(authResult.idToken);
            }, reject);
      } else {
        resolve();
      }
    });
  }

  public localLogin(authResult: any) {
    /**
     * ユーザーのIDトークンと、IDトークンの有効期限を設定します。
     * 有効期限はミリ秒に変換されるため、ネイティブのJavaScript Dateオブジェクトを使用できます。
     */
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.tokenExpiry = new Date(this.profile.exp * 1000);
    this.accessToken = authResult.accessToken;
    this.accessTokenExpiry = new Date(Date.now() + authResult.expiresIn * 1000);

    localStorage.setItem(localStorageKey, 'true');
    localStorage.setItem('expires_at', this.tokenExpiry);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('Authorization', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {},
    });
  }

  public renewTokens() {
    /**
     * auth0.jsのcheckSessionメソッドを使用してユーザーの認証ステータスを更新し、
     * ログインセッションがまだ有効な場合にlocalLoginを呼び出します
     */
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        return reject('Not logged in');
      }

      webAuth.checkSession({}, (err: any, authResult: any) => {
        /**
         * socialログインのときにAuth0が提供するdev key
         * を使っているとcheckSessionはlogin_requiredとなって失敗する。
         * また、ブラウザ機能のenable 3rd-party cookiesをONにしていないと失敗する
         */
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }

  public isAccessTokenValid() {
    return (
      this.accessToken &&
      this.accessTokenExpiry &&
      Date.now() < this.accessTokenExpiry
    );
  }

  public getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        resolve(this.accessToken);
      } else {
        this.renewTokens().then(( authResult: any ) => {
          resolve(authResult.accessToken);
        }, reject);
      }
    });
  }
}

export default new AuthService();
