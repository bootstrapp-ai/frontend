// reactive-view.js
import { LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";

// theme.js
var FontWeight = {
  thin: "font-thin",
  // 200
  extralight: "font-extralight",
  // 100
  light: "font-light",
  // 300
  normal: "font-normal",
  // 400
  medium: "font-medium",
  // 500
  semibold: "font-semibold",
  // 600
  bold: "font-bold",
  // 700
  extrabold: "font-extrabold",
  // 800
  black: "font-black"
  // 900
};
var FontType = {
  mono: "font-mono",
  sans: "font-sans",
  serif: "font-serif"
};
var Gaps = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
  xl: "gap-16",
  "2xl": "gap-32",
  "3xl": "gap-64",
  "4xl": "gap-96"
};
var TextSizes = {
  "": "",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl"
};
var LeadingSizes = {
  "": "",
  xs: "leading-3",
  sm: "leading-4",
  base: "leading-5",
  md: "leading-6",
  lg: "leading-7",
  xl: "leading-8",
  "2xl": "leading-9",
  "3xl": "leading-10",
  "4xl": "leading-10",
  "5xl": "leading-10",
  "6xl": "leading-10"
};
var JustifyContent = {
  normal: "justify-normal",
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
  strecth: "justify-stretch"
};
var SpacingSizes = {
  "": "",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-12",
  "3xl": "p-16",
  "4xl": "p-24"
};
var ButtonSizes = {
  "": "",
  xs: "p-1",
  sm: "p-2",
  md: "px-4 py-2",
  lg: "px-6 py-3",
  xl: "px-8 py-4",
  "2xl": "px-12 py-5",
  "3xl": "px-16 py-6",
  "4xl": "px-24 py-7"
};
var DimensionSizes = {
  "": "",
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
  "2xl": "w-32 h-32",
  "3xl": "w-48 h-48",
  "4xl": "w-64 h-64"
};
var trackingSizes = {
  "4xl": "tracking-wider",
  "3xl": "tracking-wider",
  "2xl": "tracking-wider",
  xl: "tracking-wide",
  lg: "tracking-wide"
};
var generateClass = (prefix, color, variation) => `${prefix}-${color}-${variation}`;
var generateColorClass = (color, variation) => generateClass("bg", color, variation);
var generateTextColorClass = (color, variation) => generateClass("text", color, variation);
var generateBorderColorClass = (color, variation) => generateClass("border", color, variation);
var generateTextColorVariants = (textVariation, colors) => {
  return Object.keys(colors).reduce((variants, colorKey) => {
    const color = colors[colorKey];
    const textColor = textVariation === "white" ? "50" : textVariation;
    variants[colorKey] = generateTextColorClass(color, textColor);
    return variants;
  }, {});
};
var generateVariants = ({
  bgVariation,
  textVariation,
  hoverBgVariation,
  hoverTextVariation,
  accentVariation = null
}, colors) => {
  const textColorVariants = generateTextColorVariants(textVariation, colors);
  return Object.keys(colors).reduce((variants, colorKey) => {
    const color = colors[colorKey];
    const accentClass = accentVariation && colorKey === "accent" ? `accent-${color}-${accentVariation}` : "";
    const classes = [
      generateColorClass(color, bgVariation),
      `hover:${generateColorClass(color, hoverBgVariation)}`,
      textColorVariants[colorKey],
      `hover:${generateTextColorClass(color, hoverTextVariation)}`,
      accentClass,
      generateBorderColorClass(color, "900")
    ];
    variants[colorKey] = classes.filter(Boolean).join(" ");
    return variants;
  }, {});
};
var cls = (arr) => arr.filter(Boolean).join(" ");
var generateTheme = (userTheme) => {
  const BaseVariants = generateVariants(
    userTheme.baseVariants,
    userTheme.colors
  );
  const ReverseVariants = generateVariants(
    userTheme.reverseVariants,
    userTheme.colors
  );
  const TextColors = generateTextColorVariants(
    userTheme.textVariant,
    userTheme.colors
  );
  const borderRadius = roundedClasses[userTheme.borderRadius || 0];
  return {
    "uix-avatar": {
      _base: cls([userTheme.flexCenter, userTheme.borderStyles, borderRadius]),
      variant: BaseVariants,
      size: [DimensionSizes, TextSizes]
    },
    "uix-avatar__img": {
      _base: "",
      size: DimensionSizes
    },
    "uix-badge": {
      _base: cls([userTheme.flexCenter, userTheme.borderStyles, borderRadius]),
      variant: BaseVariants,
      size: [SpacingSizes, TextSizes]
    },
    "uix-input": {
      _base: cls([
        "block w-full appearance-none focus:outline-none focus:ring-0",
        userTheme.defaultTextColor,
        userTheme.borderStyles,
        userTheme.borderWidth,
        borderRadius
      ]),
      active: {
        true: cls([userTheme.activeTextColor, "border-blue-500"]),
        false: cls([userTheme.defaultTextColor, userTheme.hoverBorder])
      },
      variant: BaseVariants,
      size: [SpacingSizes, TextSizes]
    },
    "uix-input__label": {
      variant: BaseVariants,
      _base: cls([
        "absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-0.5 z-10 origin-[0] left-2.5",
        "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      ])
    },
    "uix-label": {
      _base: cls([userTheme.fontStyles, "cursor-pointer"]),
      variant: BaseVariants,
      size: SpacingSizes
    },
    "uix-textarea": {
      _base: cls([
        "flex px-2.5 py-1 w-full text-sm",
        userTheme.defaultTextColor,
        userTheme.borderStyles,
        userTheme.borderWidth
      ]),
      active: {
        true: cls([userTheme.activeTextColor, "border-blue-500 "]),
        false: cls([userTheme.defaultTextColor, userTheme.hoverBorder])
      },
      variant: BaseVariants,
      size: SpacingSizes
    },
    "uix-dropdown": {
      _base: cls([
        "block w-full text-sm",
        userTheme.defaultTextColor,
        userTheme.borderStyles
      ]),
      active: {
        true: cls([userTheme.activeTextColor, "border-blue-500"]),
        false: cls([userTheme.defaultTextColor, userTheme.hoverBorder])
      },
      variant: BaseVariants,
      size: SpacingSizes
    },
    "uix-modal": {
      _base: cls([
        "rounded-lg bg-white p-8 shadow-2xl min-w-[768px] min-h-[400px]",
        borderRadius
      ]),
      size: SpacingSizes
    },
    "uix-card": {
      _base: "shadow",
      spacing: SpacingSizes,
      variant: BaseVariants
    },
    "uix-block": {
      spacing: SpacingSizes,
      variant: BaseVariants
    },
    "uix-list": {
      _base: "flex",
      spacing: SpacingSizes,
      gap: Gaps,
      justify: JustifyContent,
      full: ({ vertical }) => ({
        true: vertical ? "w-full" : "h-full"
      }),
      vertical: { true: "flex-col" },
      responsive: ({ vertical }) => ({
        true: vertical ? "lg:flex-col sm:flex-row" : "sm:flex-col lg:flex-row"
      }),
      reverse: ({ vertical }) => ({
        true: vertical ? "flex-col-reverse" : "flex-row-reverse"
      })
    },
    "uix-divider": { _base: "flex items-center my-2", spacing: SpacingSizes },
    "uix-divider__border": {
      _base: "border-t  border-gray-400 flex-grow"
    },
    "uix-divider__label": { _base: "px-3 text-gray-800 font-bold text-2xl" },
    "uix-button": {
      _base: cls([
        "cursor-pointer transition ease-in-out duration-200 gap-2 w-full",
        userTheme.flexCenter,
        userTheme.fontStyles,
        borderRadius
      ]),
      variant: ReverseVariants,
      size: [ButtonSizes, TextSizes]
    },
    "uix-icon-button": {
      _base: cls(["transition ease-in-out duration-200 mx-auto", borderRadius]),
      variant: BaseVariants
    },
    "uix-icon-button__icon": {
      _base: cls(["mx-auto"]),
      size: TextSizes
    },
    "uix-tooltip": {
      _base: cls(["group relative m-12", borderRadius]),
      spacing: SpacingSizes
    },
    "uix-tooltip__button": {
      _base: cls([
        "bg-gray-500 px-4 py-2 text-sm shadow-sm text-white",
        borderRadius
      ]),
      variant: BaseVariants,
      spacing: SpacingSizes
    },
    "uix-tooltip__content": {
      _base: "absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-white text-xs group-hover:scale-100",
      spacing: SpacingSizes
    },
    "uix-tabs": {
      _base: "flex w-full overflow-x-auto overflow-y-hidden border-gray-200",
      variant: BaseVariants,
      //size: SpacingSizes,
      spacing: SpacingSizes,
      full: { true: "w-full h-full" }
    },
    "uix-tab": {
      _base: cls([
        "relative group",
        userTheme.flexCenter,
        "px-2 py-2 -mb-px sm:px-4 -px-1 whitespace-nowrap focus:outline-none",
        userTheme.borderStyles,
        userTheme.borderWidth
      ]),
      active: {
        true: cls([userTheme.activeTextColor, "border-blue-500"]),
        false: cls([userTheme.defaultTextColor, userTheme.hoverBorder])
      },
      variant: BaseVariants,
      size: SpacingSizes
    },
    "uix-tab_summary": {
      _base: "cursor-pointer"
    },
    "uix-range": {
      _base: "w-full",
      variant: BaseVariants
    },
    "uix-checkbox": {
      _base: cls([
        `before:content[''] peer
           before:transition-opacity 
           hover:before:opacity-10
           checked:opacity-100
           opacity-30
           `,
        clipRoundedClasses[userTheme.borderRadius]
      ]),
      variant: ReverseVariants,
      size: DimensionSizes
    },
    "uix-select": {
      _base: "w-full",
      border: { true: "border" },
      full: { true: "w-full" },
      size: SpacingSizes
    },
    "uix-text": {
      _base: "",
      variant: TextColors,
      weight: FontWeight,
      font: FontType,
      leading: LeadingSizes,
      size: [LeadingSizes, trackingSizes, TextSizes]
    }
  };
};
var resolveThemeValue = (elementTheme, key = "") => {
  if (Array.isArray(elementTheme))
    return elementTheme.map((entry) => entry[key]).join(" ");
  const theme = elementTheme[key];
  if (typeof theme === "function") return theme();
  return theme;
};
var getElementTheme = (element, props) => {
  const defaultElement = Theme[element];
  if (!defaultElement) return props["containerClass"] || "";
  const classes = Object.keys(defaultElement).reduce((acc, attr) => {
    const elementTheme = defaultElement[attr];
    const resolvedThemeValue = resolveThemeValue(elementTheme, props[attr]);
    if (resolvedThemeValue) acc.push(resolvedThemeValue);
    return acc;
  }, []);
  if (defaultElement["_base"]) classes.push(defaultElement["_base"]);
  if (props["containerClass"]) classes.push(props["containerClass"]);
  return classes.join(" ");
};
var roundedClasses = [
  "rounded-none",
  "rounded-sm",
  "rounded",
  "rounded-md",
  "rounded-lg",
  "rounded-xl",
  "rounded-2xl",
  "rounded-3xl",
  "rounded-full"
];
var clipRoundedClasses = [
  "[clip-path:circle(0% at 50% 50%)]",
  "[clip-path:circle(10% at 50% 50%)]",
  "[clip-path:circle(20% at 50% 50%)]",
  "[clip-path:circle(30% at 50% 50%)]",
  "[clip-path:circle(40% at 50% 50%)]",
  "[clip-path:circle(50% at 50% 50%)]",
  "[clip-path:circle(60% at 50% 50%)]",
  "[clip-path:circle(70% at 50% 50%)]",
  "[clip-path:circle(100% at 50% 50%)]"
];
var baseTheme = {
  colors: {
    default: "gray",
    primary: "blue",
    secondary: "pink",
    accent: "yellow",
    base: "gray",
    info: "teal",
    success: "green",
    warning: "orange",
    error: "red"
  },
  borderRadius: null,
  fontStyles: "font-bold leading-5 hover:leading-5",
  textVariant: "700",
  defaultTextColor: "text-gray-700",
  activeTextColor: "text-blue-600",
  hoverTextColor: "hover:text-blue-400",
  borderStyles: "border border-gray-300",
  hoverBorder: "hover:border-blue-400",
  borderWidth: "border-b-2",
  flexCenter: "flex flex-row items-center gap-2 text-center justify-center",
  baseVariants: {
    bgVariation: "200",
    textVariation: "700",
    hoverBgVariation: "100",
    hoverTextVariation: "800",
    accentVariation: "400"
  },
  reverseVariants: {
    bgVariation: "700",
    textVariation: "white",
    hoverBgVariation: "600",
    hoverTextVariation: "100",
    accentVariation: "200"
  }
};
var Theme = generateTheme(baseTheme);
var updateTheme = (theme) => {
  Theme = generateTheme(theme);
  window?.updateAllStyles?.(true, true);
};

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/i18n.js
var i18n = (key) => key;
var i18n_default = i18n;

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/types.js
var typeHandlers = {
  boolean: (value) => value === "true",
  string: (value) => value,
  array: (value, defaultValue) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error("Failed to parse array from string:", error);
      return defaultValue;
    }
  },
  number: (value, defaultValue) => isNaN(Number(value)) ? defaultValue : Number(value),
  date: (value) => new Date(value),
  function: (value) => new Function(value),
  // Caution: security risk!
  object: (value, defaultValue) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error("Failed to parse object from string:", error);
      return defaultValue;
    }
  }
};
var stringToType = (value, typeDefinition) => {
  const handler = typeHandlers[typeDefinition.type];
  if (handler) {
    return handler(value, typeDefinition.defaultValue);
  }
  return value || typeDefinition.defaultValue;
};
var T = {
  boolean: (options = {}) => ({
    type: "boolean",
    defaultValue: !!options.defaultValue || false,
    ...options
  }),
  string: (options = {}) => ({
    type: "string",
    defaultValue: options.defaultValue || "",
    enum: options.enum || [],
    ...options
  }),
  array: (options = {}) => ({
    type: "array",
    defaultValue: options.defaultValue || [],
    enum: options.enum || [],
    ...options
  }),
  number: (options = {}) => ({
    type: "number",
    defaultValue: options.defaultValue || void 0,
    ...options
  }),
  date: (options = {}) => ({
    type: "date",
    defaultValue: options.defaultValue || void 0,
    ...options
  }),
  function: (options = {}) => ({
    type: "function",
    defaultValue: options.defaultValue || void 0,
    ...options
  }),
  object: (options = {}) => ({
    type: "object",
    defaultValue: options.defaultValue || void 0,
    ...options
  }),
  one: (relationship, targetForeignKey, options = {}) => ({
    type: "one",
    relationship,
    targetForeignKey,
    ...options
  }),
  many: (relationship, targetForeignKey, options = {}) => ({
    type: "many",
    relationship,
    targetForeignKey,
    ...options
  }),
  created_by: (referenceField, options = {}) => ({
    type: "object",
    metadata: "user",
    referenceField,
    ...options
  }),
  created_at: (referenceField, options = {}) => ({
    type: "string",
    metadata: "timestamp",
    referenceField,
    ...options
  }),
  text: (options = {}) => ({
    formType: "text",
    type: T.string(options),
    ...options
  }),
  datetime: (options = {}) => ({
    formType: "datetime",
    type: T.string(options),
    ...options
  }),
  time: (options = {}) => ({
    formType: "time",
    type: T.string(options),
    ...options
  }),
  checkbox: (options = {}) => ({
    formType: "checkbox",
    type: T.boolean(options),
    ...options
  }),
  radio: (options = {}) => ({
    formType: "radio",
    type: T.boolean(options),
    ...options
  }),
  toggle: (options = {}) => ({
    formType: "toggle",
    type: T.boolean(options),
    ...options
  }),
  textarea: (options = {}) => ({
    formType: "textarea",
    type: T.string(options),
    ...options
  }),
  custom: (customFormType, options) => ({
    customFormType,
    type: T[customFormType](options),
    ...options
  })
};

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/url.js
var isServer = typeof window === "undefined";
var url_default = {
  getItem: (key) => {
    if (isServer) return;
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },
  setItem: (key, value) => {
    if (isServer) return;
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    window.history?.replaceState?.(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
    return { key };
  },
  removeItem: (key) => {
    if (isServer) return;
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    window.history.replaceState?.(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
    return { key };
  }
};

// reactive-view.js
var isServer2 = typeof localStorage === "undefined";
var syncAdapters = isServer2 ? { url: url_default } : { url: url_default, localStorage, sessionStorage };
var instances = [];
var BaseReactiveView = class _BaseReactiveView extends LitElement {
  i18n = i18n_default;
  _style;
  _isLoaded;
  _styleElement;
  static updateTheme = updateTheme;
  static formAssociated;
  static _instancesUsingSync = /* @__PURE__ */ new Map();
  constructor({ component }) {
    super();
    instances.push(this);
    this.component = component;
    this._queryCache = {};
    const {
      style,
      connectedCallback,
      disconnectedCallback,
      init: componentInit,
      props,
      ...litPropsAndEvents
    } = this.component;
    componentInit?.(this);
    Object.keys(litPropsAndEvents).forEach(
      function(method) {
        this[method] = litPropsAndEvents[method];
      }.bind(this)
    );
    this.generateTheme = (element) => getElementTheme(element, this);
    const propKeys = Object.keys(props || {});
    propKeys.forEach((key) => {
      const prop = props[key];
      this[key] = prop.defaultValue;
      const syncKey = { key, sync: prop.sync };
      if (prop.sync) {
        if (!_BaseReactiveView._instancesUsingSync.has(syncKey)) {
          _BaseReactiveView._instancesUsingSync.set(syncKey, /* @__PURE__ */ new Set());
        }
        _BaseReactiveView._instancesUsingSync.get(syncKey).add(this);
        Object.defineProperty(this, key, {
          get: () => {
            const value = syncAdapters[prop.sync].getItem(prop.key || key);
            return value ? stringToType(value, prop) : prop.defaultValue;
          },
          set: (newValue) => {
            if (!prop.readonly) {
              const value = newValue ? typeof newValue === "string" ? newValue : JSON.stringify(newValue) : null;
              syncAdapters[prop.sync].setItem(prop.key || key, value);
              this.requestUpdate(key, this[key]);
              _BaseReactiveView._instancesUsingSync.get(syncKey).forEach((instance) => {
                if (instance !== this) {
                  instance.requestUpdate();
                }
              });
            }
          },
          configurable: true
        });
      }
      if (!prop.readonly) {
        const setterName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
        this[setterName] = (newValue) => {
          this[key] = newValue;
        };
      }
    });
    if (typeof window !== "undefined") {
      this.boundServiceWorkerMessageHandler = this.handleServiceWorkerMessage.bind(this);
      navigator.serviceWorker.addEventListener(
        "message",
        this.boundServiceWorkerMessageHandler
      );
    }
  }
  q(element) {
    if (!this._queryCache[element]) {
      this._queryCache[element] = this.shadowRoot.querySelector(element);
    }
    return this._queryCache[element];
  }
  // Query all matching elements
  qa(element) {
    return this.shadowRoot.querySelectorAll(element);
  }
  handleServiceWorkerMessage(event) {
    if (event.data === "REQUEST_UPDATE") {
      this.requestUpdate();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.component.connectedCallback) {
      this.component.connectedCallback.bind(this)();
    }
    if (this.constructor._style && !this._isLoaded) {
      this._injectStyle();
    }
  }
  disconnectedCallback() {
    if (this.component.disconnectedCallback) {
      this.component.disconnectedCallback.bind(this)();
    }
    _BaseReactiveView._instancesUsingSync.forEach((instances2) => {
      instances2.delete(this);
    });
    super.disconnectedCallback();
    if (typeof window !== "undefined") {
      navigator.serviceWorker.removeEventListener(
        "message",
        this.boundServiceWorkerMessageHandler
      );
    }
  }
  updateStyles(stylesheet) {
    this.constructor._style = stylesheet;
    this._injectStyle();
  }
  _injectStyle() {
    const styleEl = document.createElement("style");
    styleEl.textContent = this.constructor._style;
    this.shadowRoot.appendChild(styleEl);
    this._styleElement = styleEl;
    this._isLoaded = true;
  }
};
var reactive_view_default = BaseReactiveView;

// reset.txt
var reset_default = '*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}html{line-height:1.5;-webkit-text-size-adjust:100%;text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}\n';

// uix/app.package.js
import { html } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";
var app_package_default = {
  i18n: {},
  views: {
    "uix-app-shell": {
      props: { containerClass: T.string() },
      render: function() {
        const { containerClass } = this;
        return html`
          <div
            class=${"app-shell w-full h-full flex flex-col " + containerClass || ""}
          >
            <slot name="top-navbar"></slot>
            <div class="flex h-full">
              <slot name="left-navbar"></slot>
              <main class="relative content flex-grow overflow-y-auto">
                <slot></slot>
              </main>
              <slot name="right-navbar"></slot>
            </div>
            <slot name="bottom-navbar"></slot>
          </div>
        `;
      }
    },
    "uix-router": {
      props: {
        routes: T.array(),
        currentRoute: T.string()
      },
      render: function() {
        const { routes, currentRoute } = this;
        const routeItem = routes.find((route) => route.path === currentRoute);
        return routeItem ? html`${routeItem.component}` : html`<uix-block>404: Page not found</uix-block>`;
      }
    }
  }
};

// uix/chat.package.js
import { html as html2 } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";
var chat_package_default = {
  i18n: {},
  views: {
    "uix-chat-message": {
      props: {
        message: T.string(),
        timestamp: T.object(),
        sender: T.object({ defaultValue: { name: "", avatar: "" } }),
        variant: T.string({ defaultValue: "base" }),
        rounded: T.boolean()
      },
      render: function() {
        const { message, timestamp, sender } = this;
        const currentUser = sender?.name === "user" || !sender;
        return html2`
          <uix-list>
            ${!currentUser && html2`<uix-avatar size="xs" src=${sender.avatar}></uix-avatar>` || ""}
            <uix-list
              vertical
              containerClass=${this.generateTheme("uix-chat-message")}
              spacing="md"
            >
              <uix-text font="mono" weight="light" size="xs">
                ${message}
              </uix-text>
              <uix-time
                class="text-xs opacity-50 text-right"
                timestamp=${timestamp}
              ></uix-time>
            </uix-list>
          </uix-list>
        `;
      }
    },
    "uix-chat-card": {
      props: {
        message: T.string(),
        timestamp: T.string(),
        avatar: T.string(),
        sender: T.string(),
        rounded: T.boolean(),
        unread: T.number(),
        href: T.string()
      },
      render: function() {
        const { message, href, avatar, timestamp, unread, sender, rounded } = this;
        return html2`
          <a href=${href}>
            <uix-block spacing="sm">
              <uix-list>
                ${avatar ? html2`
                      <uix-avatar src=${avatar} rounded=${rounded}></uix-avatar>
                    ` : ""}
                <uix-list vertical justify="center" class="flex-grow">
                  <uix-text
                    size="sm"
                    weight="bold"
                    class="tracking-wide text-gray-700"
                    >${sender}</uix-text
                  >
                  <uix-text
                    weight="medium"
                    size="xs"
                    font="mono"
                    containerClass="text-gray-400 text-ellipsis text-xs overflow-hidden whitespace-nowrap w-36"
                  >
                    ${message}
                  </uix-text>
                </uix-list>
                <uix-list vertical justify="evenly" containerClass="text-right">
                  <uix-time
                    class="text-xs opacity-50"
                    timestamp=${timestamp}
                  ></uix-time>
                  ${unread ? html2`<uix-badge>${unread}</uix-badge>` : html2`<div></div>`}
                </uix-list>
              </uix-list>
            </uix-block>
          </a>
        `;
      }
    }
  }
};

// uix/content.package.js
import { html as html3 } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";
var content_package_default = {
  views: {
    "uix-card": {
      props: {
        border: T.boolean({ defaultValue: true }),
        shadow: T.boolean({ defaultValue: true }),
        variant: T.string({ defaultValue: "primary" }),
        text: T.string(),
        rounded: T.boolean({ defaultValue: "none" }),
        spacing: T.string({ defaultValue: "md" })
      },
      render: function() {
        const baseClass = this.generateTheme("uix-card");
        return html3`<uix-block containerClass=${baseClass} spacing=${this.spacing}>
          <slot></slot>
        </uix-block>`;
      }
    },
    "uix-table": {
      props: {
        headers: T.array(),
        rows: T.array(),
        // All rows, not just those for the current page
        currentPage: T.number({ defaultValue: 1 }),
        resultsPerPage: T.number({ defaultValue: 10 })
      },
      paginatedRows() {
        const startIndex = (this.currentPage - 1) * this.resultsPerPage;
        return this.rows.slice(startIndex, startIndex + this.resultsPerPage);
      },
      render: function() {
        const headerElements = this.headers.map(
          (header) => html3`<th scope="col" class="p-3">${header}</th>`
        );
        const rowElements = this.paginatedRows().filter(Boolean).map((row) => {
          const cells = Array.isArray(row) ? row : Object.values(row);
          return html3`<tr>
              ${cells.map(
            (cell) => html3`<td class="px-3 py-2 text-xs">${cell}</td>`
          )}
            </tr>`;
        });
        return html3`
          <div>
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  ${headerElements}
                </tr>
              </thead>
              <tbody>
                ${rowElements}
              </tbody>
            </table>
            <uix-pagination
              totalResults=${this.rows.length}
              currentPage=${this.currentPage}
              resultsPerPage=${this.resultsPerPage}
              .onPageChange=${this.setCurrentPage}
            ></uix-pagination>
          </div>
        `;
      }
    },
    "uix-mockup-phone": {
      props: {
        prefix: T.string(),
        code: T.string(),
        highlight: T.boolean(),
        variant: T.string()
      },
      render: function() {
        return html3`
          <div
            class="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[700px] w-[400px] shadow-xl"
          >
            <div
              class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"
            ></div>
            <div
              class="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"
            ></div>
            <div
              class="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"
            ></div>
            <div
              class="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"
            ></div>
            <div
              class="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"
            ></div>
            <div
              class="rounded-xl overflow-hidden w-[372px] h-[672px] bg-white"
            >
              <slot></slot>
            </div>
          </div>
        `;
      }
    }
  }
};

// uix/crud.package.js
import { html as html4 } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/file.js
var readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/csv.js
var parseCSV = (csvData) => {
  const rows = csvData.trim().split("\n");
  const headers = rows[0].split(",");
  return rows.slice(1).map((row) => {
    const values = row.split(",");
    return headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
  }).filter((row) => Object.values(row).some((value) => value));
};
var getFields = (data) => {
  return data.length > 0 ? Object.keys(data[0]) : [];
};
var transformCsvData = (csvData, fieldMapping) => {
  return csvData.map((row) => mapRowToModel(row, fieldMapping));
};
var mapRowToModel = (row, fieldMapping) => {
  return Object.keys(fieldMapping).reduce((acc, modelField) => {
    const csvField = fieldMapping[modelField];
    acc[modelField] = row[csvField];
    return acc;
  }, {});
};

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/rest.js
function formatEndpoint(endpoint) {
  if (!endpoint.startsWith("http")) {
    return `/api/${endpoint}`.replace("//", "/");
  }
  return endpoint;
}
async function handleResponse(response) {
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    throw new Error(message);
  }
  const text = await response.text();
  if (!text) {
    return null;
  }
  return JSON.parse(text);
}
async function post(endpoint, params) {
  if (!endpoint) return;
  const response = await fetch(formatEndpoint(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });
  return handleResponse(response);
}

// uix/crud.package.js
var crud_package_default = {
  i18n: {},
  views: {
    "uix-crud": {
      props: {
        model: T.string(),
        rows: T.array(),
        fields: T.array(),
        setRows: T.function(),
        ModelClass: T.object()
      },
      render: function() {
        return html4`
          <uix-list containerClass="justify-between" spacing="md">
            <uix-crud-search
              .model=${this.model}
              .setRows=${this.setRows}
            ></uix-crud-search>
            <uix-crud-actions
              .model=${this.model}
              .rows=${this.rows}
              .setRows=${this.setRows}
              .fields=${this.fields}
              .ModelClass=${this.ModelClass}
            ></uix-crud-actions>
          </uix-list>
          <uix-crud-table
            .rows=${this.rows}
            .fields=${this.fields}
          ></uix-crud-table>
        `;
      }
    },
    "uix-crud-search": {
      props: {
        setRows: T.function(),
        model: T.string()
      },
      render: function() {
        return html4`
          <form class="flex items-center flex-grow">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <uix-icon name="search"></uix-icon>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        `;
      }
    },
    "uix-crud-actions": {
      props: {
        setRows: T.function(),
        model: T.string(),
        fields: T.array(),
        ModelClass: T.object(),
        rows: T.array()
      },
      render: function() {
        return html4`
          <uix-list>
            <uix-crud-new-modal
              .addRow=${(newRow) => this.setRows([...this.rows, newRow])}
              model=${this.model}
              .fields=${this.fields}
            ></uix-crud-new-modal>
            <uix-button dropdown="hide">
              <uix-icon name="chevron-down"></uix-icon>
              Actions
              <ul slot="dropdown">
                <li>
                  <app-import-csv-button
                    .setRows=${this.setRows}
                    .rows=${this.rows}
                    model=${this.model}
                    .fields=${this.fields}
                  ></app-import-csv-button>
                </li>
                <li>
                  <uix-button size="xs" variant="secondary"
                    >Export as CSV</uix-button
                  >
                </li>
              </ul>
            </uix-button>
            <uix-button>
              Filter <uix-icon name="chevron-down"></uix-icon>
            </uix-button>
          </uix-list>
        `;
      }
    },
    "uix-crud-table": {
      props: {
        rows: T.array(),
        fields: T.object()
      },
      render: function() {
        return html4`
          <uix-table .headers=${this.fields} .rows=${this.rows}></uix-table>
        `;
      }
    },
    "uix-crud-new-modal": {
      props: {
        fields: T.array(),
        addRow: T.function(),
        model: T.string(),
        icon: T.string()
      },
      render: function() {
        const { addRow = () => {
        }, fields, icon, model } = this;
        return html4`<uix-modal title="Create new">
          ${icon ? html4`<uix-icon-button
                slot="button"
                icon=${icon}
              ></uix-icon-button>` : html4`<uix-button slot="button" variant="primary"
                >+ new</uix-button
              >`}

          <uix-form
            title="New"
            color="base"
            size="md"
            name="uixCRUDForm"
            .fields=${fields.map((field) => ({
          ...field,
          name: field,
          placeholder: field
        }))}
            .actions=${[
          {
            label: "Create " + model,
            type: "submit",
            click: () => {
              const form = this.q("uix-form");
              const data = form.formData();
              if (form.validate()) {
                post(model, data).then(addRow);
                form.reset();
                this.q("uix-modal").hide();
              }
            }
          }
        ]}
          ></uix-form>
        </uix-modal>`;
      }
    },
    "app-import-csv-button": {
      props: {
        fields: T.array(),
        rows: T.array(),
        setRows: T.function(),
        model: T.string(),
        CSVRows: T.array(),
        CSVFields: T.array()
      },
      handleFileChange: async function(e) {
        try {
          const file = e.target.files[0];
          const csvContent = await readFile(file);
          let data = parseCSV(csvContent);
          this.setCSVRows(data);
          this.setCSVFields(getFields(data));
          this.q("uix-modal").show();
        } catch (error) {
          console.error("Error processing file:", error);
        }
      },
      render: function() {
        const { setRows, CSVRows, fields = [], CSVFields, model } = this;
        const form = this.q("uix-form");
        return html4` <uix-button
            @click=${() => this.q("#ImportCSVFileInput").click()}
            size="xs"
            variant="secondary"
          >
            Import CSV
          </uix-button>
          <uix-modal>
            <input
              type="file"
              id="ImportCSVFileInput"
              accept=".csv"
              style="display: none;"
              @change=${this.handleFileChange}
            />
            <uix-list vertical>
              <uix-text size="lg" weight="bold">
                Select the matching CSV fields:
              </uix-text>
              ${html4`<uix-form
                title="New"
                color="base"
                size="md"
                name="uixCRUDForm"
                .fields=${fields.map((field) => ({
          ...field,
          name: field,
          type: "select",
          options: ["choose a field for " + field, ...CSVFields],
          placeholder: field
        }))}
                .actions=${[
          {
            label: "Import " + this.model,
            type: "submit",
            click: () => {
              const fieldMapping = form.formData();
              const rows = transformCsvData(CSVRows, fieldMapping);
              if (form.validate()) {
                post(model, rows).then((newPosts) => {
                  setRows([...rows, newPosts]);
                });
                form.reset();
                this.q("uix-modal").hide();
              }
            }
          }
        ]}
              >
              </uix-form>`}
            </uix-list>
          </uix-modal>`;
      }
    }
  }
};

// uix/datetime.package.js
import { html as html5 } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/datetime.js
var formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(navigator.language);
};
var formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };
  return date.toLocaleTimeString(navigator.language, options);
};
var formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(navigator.language);
};
var timeAgo = (timestamp) => {
  const now = Date.now();
  const difference = now - timestamp;
  const minute = 60 * 1e3;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  if (difference < minute) {
    return "Just now";
  } else if (difference < hour) {
    return Math.round(difference / minute) + " minutes ago";
  } else if (difference < day) {
    return Math.round(difference / hour) + " hours ago";
  } else if (difference < week) {
    return Math.round(difference / day) + " days ago";
  } else {
    return formatDate(timestamp);
  }
};
var datetime_default = { formatDate, formatDateTime, formatTime, timeAgo };

// uix/datetime.package.js
var getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
var getFirstDayOfMonth = (month, year) => new Date(year, month - 1, 1).getDay();
var getLastDayOfMonth = (month, year) => new Date(year, month - 1, getDaysInMonth(month, year)).getDay();
var datetime_package_default = {
  i18n: {},
  views: {
    "uix-time": {
      props: { timestamp: T.number() },
      render: function() {
        const { timestamp } = this;
        return html5`<time class="whitespace-nowrap"
          >${datetime_default.formatTime(timestamp)}</time
        >`;
      }
    },
    "uix-calendar-day": {
      props: {
        previous: T.boolean(),
        next: T.boolean(),
        currentDay: T.boolean(),
        selected: T.boolean(),
        day: T.number()
      },
      render: function() {
        const { currentMonth, currentDay, next, previous, selected, day } = this;
        return html5` <button
          type="button"
          class="focus:z-10 w-full p-1.5 ${!next && !previous || currentDay || selected ? "bg-white " : ""}  
                ${currentMonth ? " text-gray-900 hover:bg-gray-100" : ""}
                ${currentDay ? "font-semibold text-indigo-600 hover:bg-gray-100 " : ""}"
        >
          <time
            datetime="2022-01-01"
            class="mx-auto flex h-7 w-7 items-center justify-center rounded-full ${selected ? "bg-gray-900 font-semibold text-white" : ""}"
            >${day}</time
          >
        </button>`;
      }
    },
    "uix-calendar-month": {
      props: {
        month: T.number(),
        year: T.number(),
        selectedDay: T.number()
      },
      render: function() {
        const { month, year, selectedDay } = this;
        const today = /* @__PURE__ */ new Date();
        const isToday = (d, m, y) => d === today.getDate() && m === today.getMonth() + 1 && y === today.getFullYear();
        const daysToPrepend = getFirstDayOfMonth(month, year) === 0 ? 6 : getFirstDayOfMonth(month, year) - 1;
        const previousMonthDays = getDaysInMonth(month - 1, year);
        const prependedDays = [...Array(daysToPrepend)].map(
          (_, i) => html5`
            <uix-calendar-day
              day="${previousMonthDays - daysToPrepend + i + 1}"
              previous="true"
              month="${month - 1}"
            ></uix-calendar-day>
          `
        );
        const currentMonthDays = [...Array(getDaysInMonth(month, year))].map(
          (_, i) => html5`
            <uix-calendar-day
              day="${i + 1}"
              month="${month}"
              ?currentDay=${isToday(i + 1, month, year)}
              ?selected=${i + 1 === selectedDay}
            ></uix-calendar-day>
          `
        );
        const daysToAppend = 7 - getLastDayOfMonth(month, year);
        const appendedDays = [...Array(daysToAppend)].map(
          (_, i) => html5`
            <uix-calendar-day
              day="${i + 1}"
              next="true"
              month="${month + 1}"
            ></uix-calendar-day>
          `
        );
        return html5`
          <uix-list vertical>
            <div
              class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500"
            >
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div
              class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200"
            >
              ${[...prependedDays, ...currentMonthDays, ...appendedDays]}
            </div>
          </uix-list>
        `;
      }
    }
  }
};

// uix/docs.package.js
import { html as html6 } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";
var docs_package_default = {
  i18n: {},
  views: {
    "uix-docs-page": {
      props: {
        title: T.string(),
        description: T.string(),
        tableData: T.array(),
        examples: T.array()
      },
      render: function() {
        const { title, description, tableData, examples } = this;
        const formattedTitle = (title2) => title2.toLowerCase().replace(/ /g, "-");
        return html6`
          <uix-list layout="responsive">
            <uix-block class="flex-grow">
              <uix-block>
                <uix-text size="2">${title}</uix-text>
                <p>${description}</p>
              </uix-block>
              <uix-block>
                <uix-table
                  .headers=${[
          "Type",
          "Property",
          "Description",
          "Lit Property?"
        ]}
                  .rows=${tableData}
                ></uix-table>
              </uix-block>
              <uix-divider></uix-divider>
              ${examples.map(
          (example) => html6`
                  <section id="${formattedTitle(example.title)}">
                    <uix-block>
                      <uix-text size="4">${example.title}</uix-text>
                      <p>${example.description}</p>
                    </uix-block>
                    <uix-block> ${example.codeComponent} </uix-block>
                    <uix-block>
                      <uix-mockup-code code=${example.code}></uix-mockup-code>
                    </uix-block>
                  </section>
                `
        )}
            </uix-block>

            <uix-block class="w-1/4 lg:w-1/3 xl:w-1/3">
              <uix-text size="4">Contents</uix-text>
              <ul>
                <li><a href="#description">Description</a></li>
                <li><a href="#properties">Properties</a></li>
                <li><a href="#examples">Examples</a></li>
                ${examples.map(
          (example) => html6`
                    <li>
                      <a href="#${formattedTitle(example.title)}"
                        >${example.title}</a
                      >
                    </li>
                  `
        )}
                <li><a href="#source-code">Source Code</a></li>
              </ul>
            </uix-block>
          </uix-list>
        `;
      }
    }
  }
};

// uix/form.package.js
import {
  css,
  html as html7,
  ifDefined
} from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";
var FormControls = (element) => ({
  reportValidity: function() {
    const validity = this.$input?.reportValidity();
    if (!validity) {
      this.$input.classList.add("input-error");
    } else {
      this.$input.classList.remove("input-error");
    }
    return validity;
  },
  change: function(e) {
    this._setValue(e.target.value, this);
  },
  _getValue: function() {
    return this.$input ? this.$input.value : "";
  },
  _setValue: function(value) {
    this.$input.value = value;
    let formData = new FormData();
    const name = this.$input.name;
    formData.append(name, value);
    setTimeout(() => {
      this._internals.setFormValue(formData);
      this._internals.setValidity(
        this.$input.validity,
        this.$input.validationMessage,
        this.$input
      );
    }, 0);
  },
  formAssociated: true,
  firstUpdated: function() {
    this._defaultValue = this.value;
    this._internals = this.attachInternals();
    if (!this.$input) {
      this.$input = this.q(element || "input");
      if (this.$input) {
        this._internals.setValidity(
          this.$input.validity,
          this.$input.validationMessage,
          this.$input
        );
      }
    }
  },
  formResetCallback() {
    if (!["submit", "button", "reset"].includes(this.$input.type))
      this.$input.value = this._defaultValue || "";
  },
  formDisabledCallback(disabled) {
    this.$input.disabled = disabled;
  },
  formStateRestoreCallback(state) {
    this.$input.value = state;
  }
});
var InputField = (props) => html7`
    <uix-input
      .input=${props.input}
      ?autofocus=${props.autofocus}
      ?disabled=${props.disabled}
      ?required=${props.required}
      name=${props.name}
      value=${ifDefined(props.value)}
      placeholder=${ifDefined(props.placeholder)}
      regex=${ifDefined(props.regex)}
      type=${ifDefined(props.formType || props.type)}
      maxLength=${ifDefined(props.maxLength)}
      variant=${ifDefined(props.variant)}
      color=${ifDefined(props.color)}
      size=${ifDefined(props.size)}
      containerClass="w-full"
    >
    </uix-input>
  `;
var TextareaField = (props) => html7`
  <uix-textarea
    .input=${props.input}
    ?disabled=${props.disabled}
    ?required=${props.required}
    ?autofocus=${props.autofocus}
    value=${ifDefined(props.value)}
    placeholder=${ifDefined(props.placeholder)}
    rows=${ifDefined(props.rows)}
    variant=${ifDefined(props.variant)}
    color=${ifDefined(props.color)}
    size=${ifDefined(props.size)}
    label=${ifDefined(props.label)}
    labelAlt=${ifDefined(props.labelAlt)}
    name=${props.name}
    containerClass="w-full"
  ></uix-textarea>
`;
var SelectField = (props) => html7`
  <uix-select
    .options=${props.options}
    ?required=${props.required}
    color=${ifDefined(props.color)}
    label=${ifDefined(props.label)}
    altLabel=${ifDefined(props.altLabel)}
    name=${props.name}
    size=${ifDefined(props.size)}
    containerClass="w-full"
  ></uix-select>
`;
var fieldRenderers = {
  input: InputField,
  textarea: TextareaField,
  select: SelectField
};
var renderField = (field, host) => {
  const { type, formType, llm, ...props } = field;
  const FieldRenderer = fieldRenderers[formType || type] || fieldRenderers.input;
  const keydown = (e) => {
    return props.keydown?.(e);
  };
  const fieldComponent = FieldRenderer({
    ...props,
    type: formType || type,
    keydown
  });
  if (field.label || field.labelAlt && field.labelAlt.length) {
    return html7`
      <uix-form-control
        .label=${field.label || ""}
        .labelAlt=${llm ? [
      html7`<uix-icon
                class="cursor-pointer"
                name="brush-outline"
                @click=${() => host.wizardForm(field.name)}
              >
              </uix-icon>`
    ] : field.labelAlt || []}
      >
        ${fieldComponent}
      </uix-form-control>
    `;
  }
  return fieldComponent;
};
var form_package_default = {
  i18n: {},
  views: {
    "uix-form": {
      props: {
        fields: T.array(),
        actions: T.array(),
        method: T.string({ defaultValue: "post" }),
        endpoint: T.string(),
        llm: T.object()
      },
      getForm: function() {
        if (!this.$form) this.$form = this.renderRoot.querySelector("form");
        return this.$form;
      },
      validate: function() {
        const formControls = this.getForm().querySelectorAll(
          "uix-input, uix-select, uix-textarea, uix-file-input"
        );
        let isFormValid = true;
        formControls.forEach((control) => {
          if (!control.reportValidity()) {
            isFormValid = false;
          }
        });
        return isFormValid;
      },
      submit: function() {
        if (this.validate()) {
          this.getForm().submit();
        }
      },
      reset: function() {
        const formControls = this.getForm().querySelectorAll(
          "uix-input, uix-select, uix-textarea, uix-file-input"
        );
        formControls.forEach((control) => {
          control.formResetCallback?.();
        });
      },
      formData: function() {
        const form = this.getForm();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        return data;
      },
      wizardForm: async function(name) {
        const data = this.formData();
        const magicField = data[name];
        if (magicField) {
          const prompt = `
          Help me create the JSON with an object with the fields:
          Events -
          ${JSON.stringify(this.fields)}
                    
          reply in the format:
          '''
          { prop1: value, prop2: value }
          '''

          only the JSON response, nothing else. 
           
          we have a system that the user can supply a basic summary 
          and we will analyze it, improve and complete the fields based on the description or make assumptions
          for example:
          Dentist tomorrow 4pm would become
          
          would become:
          {
            "summary": "Dentist Appointment",
            "description": "Going to the dentist for a check-up.",
            "cron": "0 20 16 10 ? 2023",
            "duration": 3600000
          }

          Pay attention to the cron format. For summary, reuse and expand and fix the supplied summary.

          Today is ${/* @__PURE__ */ new Date()}.
          user prompt (summary):
          ${magicField}
          `;
          const response = await this.llm.send(prompt);
          const form = this.getForm();
          const obj = JSON.parse(response);
          Object.keys(obj).forEach(
            (key) => form.elements[key].setValue(obj[key])
          );
        }
      },
      renderField: function(row) {
        if (Array.isArray(row)) {
          return html7`
            <uix-list>
              ${row.map((field) => {
            return html7`<uix-block spacing="0" class="w-full">
                  ${renderField(field, this)}
                </uix-block>`;
          })}
            </uix-list>
          `;
        } else {
          return renderField(row, this);
        }
      },
      render: function() {
        const { fields, actions, method, endpoint, renderField: renderField2 } = this;
        return html7`
          <form class="m-0" method=${method} action=${endpoint}>
            <uix-list gap="lg" vertical>
              ${fields.map((field) => renderField2(field))}
            </uix-list>
            <uix-list>
              ${actions ? html7`<uix-list responsive gap="md" class="mx-auto mt-10">
                    ${actions.map(
          (action) => html7`<uix-input
                        type=${action.type}
                        @click=${action.click}
                        class=${action.class}
                        value=${action.value}
                      >
                      </uix-input>`
        )}
                  </uix-list>` : ""}
            </uix-list>
          </form>
        `;
      }
    },
    "uix-form-control": {
      props: {
        label: T.string({ type: String, defaultValue: null }),
        labelAlt: T.array({ defaultValue: [] })
      },
      render: function() {
        const { label, labelAlt } = this;
        return html7`
          <div class="form-control w-full">
            ${label ? html7`<label class="label"
                  ><span class="label-text">${label}</span></label
                >` : ""}
            <slot></slot>
            ${labelAlt && labelAlt.length ? html7` <label class="label">
                  ${labelAlt.map(
          (alt) => html7`<span class="label-text-alt">${alt}</span>`
        )}
                </label>` : ""}
          </div>
        `;
      }
    },
    "uix-input": {
      props: {
        autofocus: T.boolean(),
        value: T.string(),
        placeholder: T.string(),
        name: T.string(),
        disabled: T.boolean(),
        regex: T.string(),
        required: T.boolean(),
        type: T.string({
          defaultValue: "text",
          enum: [
            "text",
            "password",
            "email",
            "number",
            "decimal",
            "search",
            "tel",
            "url"
          ]
        }),
        maxLength: T.number(),
        variant: T.string({
          defaultValue: "default"
        }),
        size: T.string({
          defaultValue: "md"
        }),
        keydown: T.function()
      },
      ...FormControls("input"),
      render: function() {
        const {
          name,
          autofocus,
          value,
          change,
          placeholder,
          disabled,
          required,
          regex,
          type,
          keydown
        } = this;
        return html7`
          <div class="relative">
            <input
              type="text"
              id="filled"
              style="line-height: 1.05rem;/*quick hack, should find a better fix*/"
              aria-describedby="filled_success_help"
              class=${this.generateTheme("uix-input")}
              .value=${value || ""}
              ?autofocus=${autofocus}
              ?disabled=${disabled}
              ?required=${required}
              name=${ifDefined(name)}
              regex=${ifDefined(regex)}
              @keydown=${keydown}
              @change=${change}
              type=${type}
              placeholder=" "
            />
            <label for="filled" class=${this.generateTheme("uix-input__label")}>
              ${placeholder}
            </label>
          </div>
        `;
      }
    },
    "uix-select-option": {
      props: {
        value: T.string(),
        label: T.string()
      },
      render: function() {
        const { value, label } = this;
        return html7` <option value=${value}>${label}</option> `;
      }
    },
    "uix-select": {
      ...FormControls("select"),
      props: {
        options: T.array(),
        value: T.string(),
        variant: T.string({ defaultValue: "base" }),
        size: T.string({ defaultValue: "md" }),
        name: T.string()
      },
      render: function() {
        const { name, options } = this;
        return html7`
          <select
            name=${name}
            @change=${this.change}
            class=${this.generateTheme("uix-select")}
          >
            ${options && options.map((option) => html7` <option>${option}</option> `) || ""}
            <slot></slot>
          </select>
        `;
      }
    },
    "uix-textarea": {
      props: {
        value: T.string(),
        placeholder: T.string(),
        name: T.string(),
        disabled: T.boolean(),
        required: T.boolean(),
        autofocus: T.boolean(),
        rows: T.number({ defaultValue: 4 }),
        variant: T.string({ defaultValue: "bordered" }),
        size: T.string({ defaultValue: "md" }),
        input: T.function(),
        keydown: T.function()
      },
      ...FormControls("textarea"),
      render: function() {
        const {
          autofocus,
          value,
          name,
          placeholder,
          disabled,
          rows,
          required,
          keydown
        } = this;
        return html7`
          <textarea
            class=${this.generateTheme("uix-textarea")}
            placeholder=${placeholder}
            ?disabled=${disabled}
            name=${name}
            rows=${rows}
            ?autofocus=${autofocus}
            ?required=${required}
            @input=${this.change}
            @keydown=${keydown}
          >
${value}</textarea
          >
        `;
      }
    },
    "uix-range": {
      props: {
        variant: T.string(),
        min: T.number({ defaultValue: 0 }),
        value: T.number({ defaultValue: 0 }),
        max: T.number({ defaultValue: 100 })
      },
      ...FormControls("range"),
      render: function() {
        const { generateTheme: generateTheme2, min, max, value } = this;
        return html7`<div>
          <input
            class=${generateTheme2("uix-range")}
            type="range"
            @input=${this.change}
            min=${min}
            max=${max}
            value=${value}
          />
          <div class="-mt-2 flex w-full justify-between">
            <span class="text-sm text-gray-600">Squared</span>
            <span class="text-sm text-gray-600">Rounded</span>
          </div>
        </div>`;
      }
    },
    "uix-checkbox": {
      style: [
        css`
          input[type="checkbox"] {
            // TODO: set borderRadius as a css variable and use here for the border
            clip-path: circle(46% at 50% 50%); /* Set the clip path of circle*/
          }
        `
      ],
      props: {
        name: T.string(),
        variant: T.string({ defaultValue: "default" }),
        size: T.string({ defaultValue: "md" }),
        checked: T.boolean(),
        value: T.boolean(),
        disabled: T.boolean(),
        change: T.function()
      },
      ...FormControls("toggle"),
      render: function() {
        const { checked, change, disabled, name } = this;
        return html7`
          <input
            class=${this.generateTheme("uix-checkbox")}
            type="checkbox"
            name=${name}
            @change=${function(e) {
          this.setChecked(e.target.checked);
          change?.(e);
        }}
            ?checked=${checked}
            ?disabled=${disabled}
          />
        `;
      }
    },
    "uix-icon-button": {
      props: {
        icon: T.string(),
        variant: T.string(),
        size: T.string(),
        alt: T.string()
      },
      render: function() {
        const { icon, alt } = this;
        return html7`<button
          alt=${alt}
          class=${this.generateTheme("uix-icon-button")}
        >
          <uix-icon
            class=${this.generateTheme("uix-icon-button__icon")}
            name=${icon}
          ></uix-icon>
        </button>`;
      }
    },
    "uix-button": {
      props: {
        size: T.string({ defaultValue: "md" }),
        variant: T.string({ defaultValue: "default" }),
        type: T.string({ defaultValue: "button" }),
        href: T.string(),
        click: T.function(),
        dropdown: T.string()
      },
      render: function() {
        const { type, click, href, dropdown } = this;
        const btnClass = this.generateTheme("uix-button");
        if (dropdown) {
          return html7` <details class="text-left" ?open=${dropdown === "open"}>
            ${href && html7`<summary class=${btnClass}>
                <a href=${href}><slot></slot></a>
              </summary>` || ""}
            ${!href && html7`<summary class=${btnClass}><slot></slot></summary>` || ""}
            <slot name="dropdown"></slot>
          </details>`;
        }
        return href ? html7`
              <a
                class=${btnClass}
                href=${href}
                @click=${(event) => click?.({ event, props: this })}
              >
                <slot></slot>
              </a>
            ` : html7`
              <button
                type=${type || "button"}
                class=${btnClass}
                @click=${(event) => click?.({ event, props: this })}
              >
                <slot></slot>
              </button>
            `;
      }
    }
  }
};

// uix/layout.package.js
import {
  css as css2,
  html as html8,
  staticHtml,
  unsafeStatic
} from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";

// node_modules/.pnpm/helpers@https+++codeload.github.com+bootstrapp-ai+helpers+tar.gz+ff8e0ca2b12c3114151ef3df4c7a644c32b8fef4/node_modules/helpers/droparea.js
var currentDroparea;
var currentDraggedItem;
var currentPosition;
var placeholderElement;
var createPlaceholderElement = () => {
  if (!placeholderElement) {
    placeholderElement = document.createElement("div");
    placeholderElement.classList.add(
      "drag-placeholder",
      "h-24",
      "w-24",
      "bg-primary",
      "border",
      "transition-all",
      "m-auto"
    );
  }
  return placeholderElement;
};
var insertPlaceholder = (parent, position = "end", referenceNode = null) => {
  const placeholder = createPlaceholderElement();
  if (position === "start") {
    parent.insertBefore(placeholder, parent.firstChild);
  } else if (position === "before" && referenceNode) {
    parent.insertBefore(placeholder, referenceNode);
  } else {
    parent.appendChild(placeholder);
  }
};
var removeExistingPlaceholder = (parent) => {
  const existingPlaceholder = parent.querySelector(".drag-placeholder");
  existingPlaceholder?.remove();
};
var droparea = {
  drop: function(event) {
    event.preventDefault();
    const children = Array.from(event.currentTarget.children);
    currentPosition = children.indexOf(placeholderElement);
    removeExistingPlaceholder(event.currentTarget);
  },
  dragleave: function(event) {
    const dropareaBounds = event.currentTarget.getBoundingClientRect();
    removeExistingPlaceholder(event.currentTarget);
    if (this.vertical && event.clientY === 0 || !this.vertical && event.clientX === 0) {
      currentDroparea = null;
      currentDraggedItem = null;
      currentPosition = null;
    } else if (this.vertical && event.clientY < dropareaBounds.top || !this.vertical && event.clientX < dropareaBounds.left) {
      insertPlaceholder(event.currentTarget, "start");
      currentPosition = 0;
    }
  },
  dragover: function(event) {
    event.preventDefault();
    const droparea2 = event.currentTarget;
    const items = Array.from(droparea2.children).filter(
      (child) => !child.classList.contains("drag-placeholder")
    );
    if (!items.length) {
      if (!placeholderElement) {
        insertPlaceholder(droparea2);
      }
      currentPosition = 0;
      currentDroparea = droparea2.id;
      return;
    }
    const compareVal = this.vertical ? event.clientY : event.clientX;
    const targetItem = items.find((item, index) => {
      if (this.vertical && item.getBoundingClientRect().top > compareVal || !this.vertical && item.getBoundingClientRect().left > compareVal) {
        currentPosition = index;
        currentDroparea = droparea2.id;
        return true;
      }
      return false;
    });
    if (!targetItem && (this.vertical && compareVal > items[items.length - 1].getBoundingClientRect().bottom || !this.vertical && compareVal > items[items.length - 1].getBoundingClientRect().right)) {
      currentPosition = items.length;
      currentDroparea = droparea2.id;
    }
    if (!placeholderElement || targetItem && placeholderElement.nextSibling !== targetItem) {
      insertPlaceholder(droparea2, "before", targetItem);
    }
  },
  connectedCallback: function() {
    if (this.droparea) {
      this.addEventListener("drop", this.drop);
      this.addEventListener("dragover", this.dragover);
      this.addEventListener("dragleave", this.dragleave);
    }
  },
  disconnectedCallback: function() {
    if (this.droparea) {
      this.removeEventListener("drop", this.drop);
      this.removeEventListener("dragover", this.dragover);
      this.removeEventListener("dragleave", this.dragleave);
    }
  }
};

// uix/layout.package.js
var layout_package_default = {
  views: {
    "uix-block": {
      props: {
        variant: T.string(),
        spacing: T.string({ defaultValue: "md" }),
        containerClass: T.string()
      },
      render: function() {
        const baseClass = this.generateTheme("uix-block");
        return html8`
          <div class=${baseClass}>
            <slot></slot>
          </div>
        `;
      }
    },
    "uix-list": {
      style: [
        css2`
          :host {
            display: inherit;
          }
        `
      ],
      props: {
        vertical: T.boolean(),
        responsive: T.boolean(),
        tag: T.string({ defaultValue: "div" }),
        reverse: T.boolean(),
        droparea: T.boolean(),
        justify: T.string(),
        spacing: T.string({ defaultValue: "sm" }),
        gap: T.string({ defaultValue: "sm" }),
        full: T.boolean(),
        rounded: T.boolean(),
        containerClass: T.string()
      },
      ...droparea,
      render: function() {
        const { tag } = this;
        const baseClass = this.generateTheme("uix-list");
        return staticHtml`
          <${unsafeStatic(tag)}            
            class="${unsafeStatic(baseClass)}">
            <slot></slot>
          </${unsafeStatic(tag)}>
        `;
      }
    },
    "uix-divider": {
      props: {
        label: T.string(),
        spacing: T.string({ default: "md" })
      },
      render: function() {
        const { label } = this;
        return html8`<div class=${this.generateTheme("uix-divider")}>
          <div class=${this.generateTheme("uix-divider__border")}></div>
          ${label && html8`<div class=${this.generateTheme("uix-divider__label")}>
              ${label}
            </div>
            <div class=${this.generateTheme("uix-divider__border")}></div>`}
        </div>`;
      }
    }
  }
};

// uix/navigation.package.js
import { html as html9 } from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";
var navigation_package_default = {
  views: {
    "uix-modal": {
      props: {
        actions: T.function(),
        size: T.string({ defaultValue: "md" }),
        parent: T.object(),
        open: T.boolean()
      },
      firstUpdated: function() {
        this.$modal = this.shadowRoot.querySelector("#modal");
        if (this.parent) this.parent.hide = this.hide;
      },
      hide: function(msg = "") {
        this.$modal.close(msg);
      },
      show: function() {
        this.$modal.showModal();
      },
      render: function() {
        const { actions, open } = this;
        return html9`
          <slot name="button" @click=${this.show}></slot>
          <dialog
            id="modal"
            ?open=${open}
            class=${this.generateTheme("uix-modal")}
          >
            <div class="modal-box">
              <uix-button
                @click=${this.hide}
                variant=""
                shape="circle"
                size="sm"
                class="absolute right-1 top-0"
              >
                ✕
              </uix-button>

              <uix-list vertical>
                <slot></slot>
                <!--// TODO: remove this and inline the buttons wherever it is used-->
                <uix-list>
                  <slot name="footer"></slot>
                  ${actions?.({ host: this }) || ""}
                </uix-list>
              </uix-list>
            </div>
          </dialog>
        `;
      }
    },
    "uix-tooltip": {
      render: function() {
        return html9`
          <div class=${this.generateTheme("uix-tooltip")}>
            <button class=${this.generateTheme("uix-tooltip__button")}>
              <slot name="button"></slot>
            </button>
            <span class=${this.generateTheme("uix-tooltip__content")}>
              <slot></slot>
            </span>
          </div>
        `;
      }
    },
    "uix-tabs": {
      props: {
        items: T.array(),
        size: T.string({ defaultValue: "md" }),
        gap: T.string({ defaultValue: "md" }),
        spacing: T.string({ defaultValue: "md" }),
        full: T.boolean(),
        selectTab: T.string()
      },
      unselectTab() {
        const slot = this.shadowRoot.querySelector("slot");
        const tabs = slot.assignedNodes().filter(
          (node) => node.tagName && node.tagName.toLowerCase() === "uix-tab"
        );
        tabs.forEach((tab) => {
          tab.setActive(false);
        });
      },
      render: function() {
        return html9`
          <div class=${this.generateTheme("uix-tabs")}>
            <slot></slot>
          </div>
        `;
      }
    },
    "uix-tab": {
      props: {
        icon: T.string(),
        label: T.string(),
        active: T.boolean(),
        parent: T.object(),
        onclick: T.function(),
        onclose: T.function()
      },
      selectTab: function(e) {
        this.parentElement.unselectTab();
        this.setActive(true);
        this.onclick?.(e);
      },
      firstUpdated: function() {
        const { onclose } = this;
        if (onclose) {
          this.shadowRoot.addEventListener("auxclick", function(event) {
            event.stopPropagation();
            if (event.button === 1) {
              onclose();
            }
          });
        }
      },
      render: function() {
        const { active, selectTab, onclose } = this;
        return html9`
          <button
            role="tab"
            ?active=${active}
            @click=${selectTab}
            class=${this.generateTheme("uix-tab")}
          >
            <slot></slot>
            ${onclose && html9`<button
              @click=${(event) => {
          event.stopPropagation();
          onclose();
        }}
              class="absolute top-1 right-2 text-sm font-bold leading-none group-hover:inline hidden"
            >
              &times;
            </button>`}
          </button>
        `;
      }
    },
    "uix-pagination": {
      props: {
        totalResults: T.number(),
        currentPage: T.number(),
        resultsPerPage: T.number({ defaultValue: 10 }),
        onPageChange: T.function()
      },
      render: function() {
        const totalPageCount = Math.floor(
          this.totalResults / this.resultsPerPage
        );
        const startItem = (this.currentPage - 1) * this.resultsPerPage + 1;
        const endItem = Math.min(
          startItem + this.resultsPerPage - 1,
          this.totalResults
        );
        const pageLinks = [];
        const visiblePages = 5;
        let startPage = Math.max(
          1,
          this.currentPage - Math.floor(visiblePages / 2)
        );
        let endPage = Math.min(totalPageCount, startPage + visiblePages - 1);
        if (endPage - startPage + 1 < visiblePages && startPage > 1) {
          startPage = Math.max(1, endPage - visiblePages + 1);
        }
        if (this.currentPage > 1) {
          pageLinks.push(this.renderPageLink(this.currentPage - 1, "Previous"));
        }
        if (startPage > 1) {
          pageLinks.push(this.renderPageLink(1));
          if (startPage > 2) {
            pageLinks.push(this.renderPageLink(startPage - 1, "..."));
          }
        }
        for (let page = startPage; page <= endPage; page++) {
          pageLinks.push(this.renderPageLink(page));
        }
        if (endPage < totalPageCount) {
          if (endPage < totalPageCount - 1) {
            pageLinks.push(this.renderPageLink(endPage + 1, "..."));
          }
          pageLinks.push(this.renderPageLink(totalPageCount));
        }
        if (this.currentPage < totalPageCount) {
          pageLinks.push(this.renderPageLink(this.currentPage + 1, "Next"));
        }
        return html9`
          <nav
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white"
                >${startItem}-${endItem}</span
              >
              of
              <span class="font-semibold text-gray-900 dark:text-white"
                >${this.totalResults}</span
              >
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              ${pageLinks}
            </ul>
          </nav>
        `;
      },
      renderPageLink(page, label) {
        label = label || page;
        const isActive = page === this.currentPage;
        const linkClass = isActive ? "text-blue-600 bg-blue-50 border border-blue-300" : "text-gray-500 bg-white border border-gray-300";
        return html9`
          <li class="p-2">
            <a
              href="#"
              class="flex items-center justify-center p-2 text-sm leading-tight ${linkClass} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click=${() => this.onPageChange(page)}
              >${label}</a
            >
          </li>
        `;
      }
    },
    "uix-context-menu": {
      props: { open: T.boolean(), contextmenu: T.function() },
      closeContextMenuHandler: function() {
        this.setOpen(false);
      },
      documentClickHandler: function(event) {
        if (!this.contains(event.target) && this !== event.target) {
          this.setOpen(false);
        }
      },
      escapeKeyHandler: function(event) {
        if (event.key === "Escape") {
          this.setOpen(false);
        }
      },
      connectedCallback: function() {
        document.addEventListener(
          "close-context-menu",
          this.closeContextMenuHandler.bind(this)
        );
        document.addEventListener(
          "click",
          this.documentClickHandler.bind(this)
        );
        document.addEventListener("keydown", this.escapeKeyHandler.bind(this));
      },
      disconnectedCallback: function() {
        document.removeEventListener(
          "close-context-menu",
          this.closeContextMenuHandler
        );
        document.removeEventListener("click", this.documentClickHandler);
        document.removeEventListener("keydown", this.escapeKeyHandler);
      },
      render: function() {
        const { open, setOpen } = this;
        return html9` <div
            class="z-10 absolute top-6 left-10 ${open ? "" : "hidden"} bg-white border border-gray-300 shadow-lg"
          >
            <slot name="menu"></slot>
          </div>
          <slot
            @contextmenu=${(e) => {
          e.preventDefault();
          document.dispatchEvent(new CustomEvent("close-context-menu"));
          setTimeout(() => {
            setOpen(true);
          }, 0);
        }}
          ></slot>`;
      }
    }
  }
};

// uix/ui.package.js
import {
  html as html10,
  staticHtml as staticHtml2,
  unsafeStatic as unsafeStatic2
} from "https://cdn.jsdelivr.net/gh/lit/dist@3.1.3/all/lit-all.min.js";
var TAG_MAP = {
  "4xl": "h1",
  "3xl": "h2",
  "2xl": "h2",
  xl: "h2",
  lg: "h3",
  md: "h4",
  sm: "h5",
  xs: "h6"
};
var ui_package_default = {
  views: {
    "uix-avatar": {
      props: {
        src: T.string(),
        alt: T.string({ defaultValue: "" }),
        size: T.string({ defaultValue: "sm" }),
        placeholder: T.string({ defaultValue: "" })
      },
      render: function() {
        const { src, alt, placeholder } = this;
        let content;
        if (src) {
          content = html10`<img
            src=${src}
            class=${this.generateTheme("uix-avatar__img")}
            alt=${alt}
          />`;
        } else if (placeholder) {
          content = html10`<span class=${this.generateTheme("uix-avatar__img")}
            >${placeholder}</span
          >`;
        }
        return html10`
          <div class=${this.generateTheme("uix-avatar")}>${content}</div>
        `;
      }
    },
    "uix-badge": {
      props: {
        size: T.string({ defaultValue: "xs" }),
        variant: T.string({ defaultValue: "default" }),
        icon: T.string({ defaultValue: null })
      },
      render: function() {
        return html10`
          <span @click=${this.click} class=${this.generateTheme("uix-badge")}>
            <slot></slot>
          </span>
        `;
      }
    },
    "uix-icon": {
      props: {
        name: T.string(),
        size: T.string({ defaultValue: "" }),
        containerClass: T.string()
      },
      render: function() {
        const { name } = this;
        return html10`<ion-icon name=${name} role="img"></ion-icon>`;
      }
    },
    "uix-loading": {
      props: {
        isVisible: T.boolean(),
        message: T.string({ defaultValue: null }),
        size: T.string({ defaultValue: "md" }),
        variant: T.string({ defaultValue: "primary" })
      },
      render: function() {
        const { isVisible, message, type, size } = this;
        if (!isVisible) return html10``;
        const Loading = {
          spinner: "loading loading-spinner",
          dots: "loading loading-dots",
          ring: "loading loading-ring",
          ball: "loading loading-ball",
          bars: "loading loading-bars",
          infinity: "loading loading-infinity"
        };
        const LoadingSize = {
          lg: "loading-lg",
          md: "loading-md",
          sm: "loading-sm",
          xs: "loading-xs"
        };
        const loadingClass = `${Loading[type]} ${LoadingSize[size]}`;
        return html10`
          <span class="${loadingClass}">
            ${message ? html10`<span>${message}</span>` : ""}
            ${message && type === "spinner" ? html10`<uix-icon name="spinner"></uix-icon>` : ""}
          </span>
        `;
      }
    },
    "uix-text": {
      props: {
        size: T.string({}),
        variant: T.string({ defaultValue: "default" }),
        weight: T.string({ defaultValue: "" }),
        font: T.string({ defaultValue: "sans" }),
        leading: T.string({})
      },
      render: function() {
        const { size } = this;
        const tag = TAG_MAP[size] || "p";
        return staticHtml2`
              <${unsafeStatic2(tag)} class="${unsafeStatic2(
          `${this.generateTheme("uix-text")}`
        )}">
                <slot></slot>
              </${unsafeStatic2(tag)}>
            `;
      }
    }
  }
};

// index.js
var TYPE_MAP = {
  boolean: Boolean,
  number: Number,
  string: String,
  object: Object,
  date: Date,
  array: Array
};
var _tailwindBase;
function defineView({ tag, component, style }) {
  const { props, formAssociated, style: componentStyle } = component;
  class ReactiveView extends reactive_view_default {
    static formAssociated = formAssociated;
    static properties = !props ? {} : Object.keys(props).reduce((acc, key) => {
      const value = props[key];
      acc[key] = {
        ...value,
        type: TYPE_MAP[value.type] || TYPE_MAP["string"]
      };
      return acc;
    }, {});
    constructor() {
      super({ component });
    }
  }
  if (!_tailwindBase) {
    _tailwindBase = new CSSStyleSheet();
    _tailwindBase.replaceSync([reset_default, style].join(" "));
  }
  if (Array.isArray(componentStyle))
    ReactiveView.styles = componentStyle.concat(_tailwindBase).filter(Boolean);
  customElements.define(tag, ReactiveView);
  return ReactiveView;
}
var definePackage = ({ pkg, style }) => {
  const views = Object.fromEntries(
    Object.entries(pkg.views).map(([tag, component]) => {
      return [
        tag,
        defineView({
          tag,
          component,
          style
        })
      ];
    })
  );
  return { views, models: pkg.models, controllers: pkg.controllers };
};
export {
  app_package_default as appKit,
  chat_package_default as chatKit,
  content_package_default as contentKit,
  crud_package_default as crudKit,
  datetime_package_default as datetimeKit,
  definePackage,
  defineView,
  docs_package_default as docsKit,
  form_package_default as formKit,
  layout_package_default as layoutKit,
  navigation_package_default as navigationKit,
  instances as reactiveViewInstances,
  reset_default as reset,
  ui_package_default as uiKit
};
//# sourceMappingURL=bundle.js.map
