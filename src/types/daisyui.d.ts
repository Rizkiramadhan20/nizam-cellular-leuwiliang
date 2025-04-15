declare module "daisyui" {
  const daisyui: import("tailwindcss").PluginAPI;
  export default daisyui;
}

declare module "tailwindcss" {
  interface Config {
    content: string[];
    theme?: {
      extend?: {
        colors?: Record<string, string>;
      };
    };
    plugins?: import("tailwindcss").PluginAPI[];
    daisyui?: {
      themes?: string[];
      darkTheme?: string;
      base?: boolean;
      styled?: boolean;
      utils?: boolean;
      logs?: boolean;
      rtl?: boolean;
      prefix?: string;
    };
  }
}
