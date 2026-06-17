interface Window {
  gapi: {
    load: (api: string, callback: () => void) => void;
    auth2: {
      init: (params: { client_id: string }) => Promise<void>;
      getAuthInstance: () => {
        signIn: () => Promise<{
          getBasicProfile: () => {
            getName: () => string;
            getEmail: () => string;
          };
        }>;
      };
    };
  };
  google: {
    accounts: {
      oauth2: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (response: { error?: string; access_token?: string }) => void;
        }) => {
          requestAccessToken: () => void;
        };
        getToken: () => { access_token: string };
      };
    };
  };
  FB: {
    init: (config: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
    login: (callback: (response: any) => void, options: { scope: string }) => void;
    api: (path: string, params: any, callback: (response: any) => void) => void;
  };
} 