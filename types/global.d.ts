// types/global.d.ts
interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: any) => void;
          auto_select?: boolean;
          context?: string;
        }) => void;
        prompt: (callback?: (notification: any) => void) => void;
        renderButton: (
          element: HTMLElement | null,
          config: {
            theme?: 'outline' | 'filled_blue' | 'filled_black';
            size?: 'large' | 'medium' | 'small';
            text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
            shape?: 'rectangular' | 'pill' | 'circle' | 'square';
            logo_alignment?: 'left' | 'center';
            width?: number;
            locale?: string;
          }
        ) => void;
        disableAutoSelect?: () => void;
        storeCredential?: (credential: string, callback: () => void) => void;
      };
    };
  };
}