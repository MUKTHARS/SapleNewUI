// types/google.d.ts
interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: Record<string, unknown>) => void;
          auto_select?: boolean;
        }) => void;
        prompt: (callback?: (notification: Record<string, unknown>) => void) => void;
        renderButton: (
          element: HTMLElement | null,
          config: {
            theme?: string;
            size?: string;
            text?: string;
            shape?: string;
            width?: number;
          }
        ) => void;
      };
    };
  };
}