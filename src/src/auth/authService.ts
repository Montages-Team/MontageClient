import auth0 from 'auth0-js';
import { EventEmitter } from 'events';
// import authConfig from '../../auth_config.json';

const webAuth = new auth0.WebAuth({
  domain: 'montage.auth0.com', // auth0の認証サーバ
  // リクエストID取得後にリダイレクトされるURL
  redirectUri: `${window.location.origin}/callback`,
  clientID: 'RGVd2YKMt0igpii0SWSGPmYV2MiPtT7Z', // auth0のクライアントID
  responseType: 'token id_token', // token id_tokenと書くことでaccess_tokenとid_token両方を要求
  scope: 'openid profile email',
});

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

export class AuthService extends EventEmitter {
  public idToken!: any;
  public profile!: any; // 取得される情報はprofileにまとめて取得される
  public tokenExpiry!: any;
  public accessToken!: any;
  public accessTokenExpiry!: any;

  public login(customState: any) {
    // ログイン時に認証処理を行う。
    webAuth.authorize({
      appState: customState,
      connection: 'twitter',
    });
  }

  public logOut() {
    // ログアウト時にセッション情報の削除などを行う。
    localStorage.removeItem(localStorageKey);

    this.idToken = undefined;
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
      console.log('renew token checkSession!');
      webAuth.parseHash((err: any, authResult: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('handle auth authResult');
          console.log(authResult);
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
    // console.log('isAuthenticated');
    // console.log('date now = ' + Date.now());
    // console.log(Date.parse('tokenExpiry = ' + this.tokenExpiry));
    // console.log('now bigger token' + Date.now() < this.tokenExpiry);
    // console.log('expired_at = ' + localStorage.getItem('expired_at'));
    const dt = localStorage.getItem('expired_at');
    // if (dt !== null) {
    //   console.log('dt がnullじゃない');
    //   console.log('dt = ' + dt);
    //   console.log('type dt' + typeof(dt));
    //   console.log('type date now' + typeof(Date.now()));
    // } else {
    //   console.log('dt がnullです');
    // }
    // console.log(localStorage.getItem(localStorageKey));
    // console.log(Date.now() < this.tokenExpiry && localStorage.getItem(localStorageKey) === 'true');
    if (localStorage.getItem('expired_at') !== null) {
      this.tokenExpiry = localStorage.getItem('expired_at');
    } else {
      console.log('set date now');
      this.tokenExpiry = Date.now();
    }
    return(localStorage.getItem(localStorageKey) === 'true');
    // return(Date.now() < this.tokenExpiry && localStorage.getItem(localStorageKey) === 'true');

    // return true;
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
    localStorage.setItem('expired_at', authResult.expiresIn);
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
        console.log('Not Logged in!');
        return reject('Not logged in');
      }

      console.log('Logged in!');
      webAuth.checkSession({}, (err: any, authResult: any) => {
        console.log('renew token checkSession!');
        console.log(authResult);
        if (err) {
          console.log('Error checkSession!');
          console.log(err);
          reject(err);
        } else {
          console.log('renew token!');
          console.log(authResult);
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
