var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};

// .svelte-kit/output/server/chunks/index3.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a2, b) {
  return a2 != a2 ? b == b : a2 !== b || (a2 && typeof a2 === "object" || typeof a2 === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component9) {
  current_component = component9;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component9, name) {
  if (!component9 || !component9.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component9;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css4) => css4.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_index3 = __esm({
  ".svelte-kit/output/server/chunks/index3.js"() {
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, message) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, message);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var HttpError, Redirect, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class HttpError2 {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class Redirect2 {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    ActionFailure = class ActionFailure2 {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// .svelte-kit/output/server/chunks/index2.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_index3();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options3) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options3 || {};
      var dec = opt.decode || decode;
      var index9 = 0;
      while (index9 < str.length) {
        var eqIdx = str.indexOf("=", index9);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index9);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index9 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index9, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index9 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options3) {
      var opt = options3 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e3) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options3) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options3 = options3 ? Object.assign({}, defaultParseOptions, options3) : defaultParseOptions;
      try {
        value = options3.decodeValues ? decodeURIComponent(value) : value;
      } catch (e3) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e3
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options3) {
      options3 = options3 ? Object.assign({}, defaultParseOptions, options3) : defaultParseOptions;
      if (!input) {
        if (!options3.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options3.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options3 = options3 ? Object.assign({}, defaultParseOptions, options3) : defaultParseOptions;
      if (!options3.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options3);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options3);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/chunks/globals.js
var isDark, isAuthenticated, userData, apiURL;
var init_globals = __esm({
  ".svelte-kit/output/server/chunks/globals.js"() {
    init_index2();
    isDark = writable(true);
    isAuthenticated = writable(false);
    userData = writable({ id: -1, username: "", bio: "", profile_icon: "", role: "default" });
    apiURL = "https://api.datapackhub.net";
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_index3();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        updated: stores.updated
      };
    };
    page = {
      /** @param {(value: any) => void} fn */
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var ColorSchemeSelector, css, ProfileNavComponent, Navbar, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_index3();
    init_globals();
    init_stores();
    ColorSchemeSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let dark;
      let unsubscribeDark = isDark.subscribe((v) => {
        dark = v;
      });
      onDestroy(unsubscribeDark);
      return `<div class="z-20">${dark ? `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-0 md:ml-6 w-12 md:w-12 cursor-pointer hover:brightness-75"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-0 md:ml-6 cursor-pointer hover: brightness-200"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`}</div>`;
    });
    css = {
      code: ".admin-outline.svelte-1yjb8pi{outline-color:#ef4444\n}.admin-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.moderator-outline.svelte-1yjb8pi{outline-color:#f97316\n}.moderator-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}.developer-outline.svelte-1yjb8pi{outline-color:#84cc16\n}.developer-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(132 204 22 / var(--tw-text-opacity))\n}.helper-outline.svelte-1yjb8pi{outline-color:#3b82f6\n}.helper-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.nerd-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}.nerd-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}",
      map: null
    };
    ProfileNavComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $isAuthenticated, $$unsubscribe_isAuthenticated;
      let $userData, $$unsubscribe_userData;
      let $$unsubscribe_page;
      $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
      $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
      $$unsubscribe_page = subscribe(page, (value) => value);
      (async () => {
      })();
      $$result.css.add(css);
      $$unsubscribe_isAuthenticated();
      $$unsubscribe_userData();
      $$unsubscribe_page();
      return `<a href="/" target="_self" class="flex items-center justify-center ml-6 z-50">${$isAuthenticated ? `${$userData.role != "default" ? `<a href="/moderation/console"><img src="/icons/moderation.svg" width="32" height="32" alt="wip" class="dark:invert z-20 mr-7"></a>` : ``}
    <img src="/icons/bell.svg" width="32" height="32" alt="wip" class="dark:invert z-20">
    <a href="${"/user/" + escape($userData.username, true)}"><img${add_attribute("src", $userData.profile_icon, 0)} alt="${escape($userData.username, true) + "'s profile picture"}" height="32" width="32" class="${"rounded-full outline outline-2 " + escape($userData.role, true) + "-outline outline-offset-2 ml-6 svelte-1yjb8pi"}"></a>` : `<a id="sign_in" href="${escape(apiURL, true) + "/auth/login"}" class="dark:text-red-400 text-red-500 dark:bg-red-400 bg-red-500 bg-opacity-30 dark:bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-1 md:py-2 text-md md:text-lg lg:text-xl hover:scale-110 transition-all border-2 dark:border-red-400 border-red-500 active:brightness-75">Sign in
    </a>`}
</a>`;
    });
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<nav class="w-full fixed top-full -translate-y-full md:top-0 md:translate-y-0 transition-all px-8 md:px-16 lg:px-24 z-50"><div class="funky-gradient w-full"><div class="flex items-center mt-4 md:mt-0"><a href="/" class="flex items-center z-20 cursor-pointer"><img src="/logos/dph.svg" alt="logo" class="h-8 rounded-full hover:brightness-75 transition-all" height="32" width="32">
        <span class="dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 text-black font-brand font-bold text-2xl transition-colors hidden md:block">Datapack Hub
        </span></a>
      <a href="/projects" target="_self" class="pl-8 dark:text-white text-black text-lg font-brand font-light dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 z-20 transition-colors">Explore
      </a>
      <a href="/" target="_self" class="pl-4 dark:text-white text-black text-lg font-brand font-light dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 z-20 transition-colors">Create
      </a>
      <a href="https://discord.gg/aEXsdjjdu4" target="_self" class="pl-4 text-indigo-500 text-lg font-brand font-light hover:text-indigo-400 active:text-neutral-400 z-20 transition-colors">Discord
      </a></div>
    <div class="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">${validate_component(ColorSchemeSelector, "ColorSchemeSelector").$$render($$result, {}, {}, {})}
      ${validate_component(ProfileNavComponent, "ProfileNavComponent").$$render($$result, {}, {}, {})}</div></div></nav>`;
    });
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $isDark, $$unsubscribe_isDark;
      $$unsubscribe_isDark = subscribe(isDark, (value) => $isDark = value);
      $$unsubscribe_isDark();
      return `<div${add_attribute("class", $isDark ? " dark" : "", 0)}>${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  ${slots.default ? slots.default({}) : ``}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  file: () => file,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component, file, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    file = "_app/immutable/entry/_layout.svelte.860f2fd9.js";
    imports = ["_app/immutable/entry/_layout.svelte.860f2fd9.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/index.b9de2425.js", "_app/immutable/chunks/globals.39000825.js", "_app/immutable/chunks/index.1f9e5d30.js", "_app/immutable/chunks/navigation.77c8ff8f.js", "_app/immutable/chunks/singletons.a51fab03.js", "_app/immutable/chunks/stores.e1c020d6.js"];
    stylesheets = ["_app/immutable/assets/_layout.c5c8f227.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/pages/_error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_error.svelte.js"() {
    init_index3();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let message = $page.error?.description;
      if (!message) {
        switch ($page.status) {
          case 404:
            message = "This link either stopped existing, no longer exists, or never existed in the first place, you may want to check if the link is correct!";
            break;
          case 401:
            message = "Please log in! This page contains data which needs you to be logged in!";
            break;
          case 403:
            message = "You don't have permission to visit this page! If you think this is an error, contact an admin!";
            break;
          case 500:
            message = "Our servers are currently blowing up, look what you did!";
            break;
          default:
            message = "We haven't coded a message for this error yet! If you think we should, reach out to us, or, if you're a dev, make a pull request.";
        }
      }
      $$unsubscribe_page();
      return `<main class="dark:bg-stone-900 bg-new-white transition-colors h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-start px-8 md:px-16 lg:px-24"><p class="font-mono text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[15rem] dark:text-white w-full mb-8 md:mb-0 md:w-1/2 text-center">${escape($page.status)}</p>
  <div class="w-full md:w-1/3"><p class="font-brand text-5xl md:text-6xl lg:text-8xl xl:text-9xl dark:text-white mb-6 text-center md:text-left">${escape($page.error?.message)}</p>
    <p class="font-brand text-lg md:text-xl lg:text-2xl dark:text-white opacity-40">${escape(message)}</p></div></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  file: () => file2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, file2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    file2 = "_app/immutable/entry/_error.svelte.a9de4c53.js";
    imports2 = ["_app/immutable/entry/_error.svelte.a9de4c53.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/stores.e1c020d6.js", "_app/immutable/chunks/singletons.a51fab03.js", "_app/immutable/chunks/index.1f9e5d30.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/animejs/lib/anime.es.js
function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function stringContains(str, text2) {
  return str.indexOf(text2) > -1;
}
function applyArguments(func, args) {
  return func.apply(null, args);
}
function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(",").map(function(p) {
    return parseFloat(p);
  }) : [];
}
function spring(string, duration) {
  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
  var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a2 = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
  function solver(t2) {
    var progress = duration ? duration * t2 / 1e3 : t2;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a2 * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a2 + b * progress) * Math.exp(-progress * w0);
    }
    if (t2 === 0 || t2 === 1) {
      return t2;
    }
    return 1 - progress;
  }
  function getDuration() {
    var cached = cache.springs[string];
    if (cached) {
      return cached;
    }
    var frame = 1 / 6;
    var elapsed = 0;
    var rest = 0;
    while (true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) {
          break;
        }
      } else {
        rest = 0;
      }
    }
    var duration2 = elapsed * frame * 1e3;
    cache.springs[string] = duration2;
    return duration2;
  }
  return duration ? solver : getDuration;
}
function steps(steps2) {
  if (steps2 === void 0)
    steps2 = 10;
  return function(t2) {
    return Math.ceil(minMax(t2, 1e-6, 1) * steps2) * (1 / steps2);
  };
}
function parseEasings(easing, duration) {
  if (is.fnc(easing)) {
    return easing;
  }
  var name = easing.split("(")[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case "spring":
      return spring(easing, duration);
    case "cubicBezier":
      return applyArguments(bezier, args);
    case "steps":
      return applyArguments(steps, args);
    default:
      return applyArguments(ease, args);
  }
}
function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch (e3) {
    return;
  }
}
function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}
function flattenArray(arr) {
  return arr.reduce(function(a2, b) {
    return a2.concat(is.arr(b) ? flattenArray(b) : b);
  }, []);
}
function toArray(o2) {
  if (is.arr(o2)) {
    return o2;
  }
  if (is.str(o2)) {
    o2 = selectString(o2) || o2;
  }
  if (o2 instanceof NodeList || o2 instanceof HTMLCollection) {
    return [].slice.call(o2);
  }
  return [o2];
}
function arrayContains(arr, val) {
  return arr.some(function(a2) {
    return a2 === val;
  });
}
function cloneObject(o2) {
  var clone = {};
  for (var p in o2) {
    clone[p] = o2[p];
  }
  return clone;
}
function replaceObjectProps(o1, o2) {
  var o3 = cloneObject(o1);
  for (var p in o1) {
    o3[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
  }
  return o3;
}
function mergeObjects(o1, o2) {
  var o3 = cloneObject(o1);
  for (var p in o2) {
    o3[p] = is.und(o1[p]) ? o2[p] : o1[p];
  }
  return o3;
}
function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}
function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function(m, r3, g2, b2) {
    return r3 + r3 + g2 + g2 + b2 + b2;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r2 = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return "rgba(" + r2 + "," + g + "," + b + ",1)";
}
function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s3 = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a2 = hsl[4] || 1;
  function hue2rgb(p2, q2, t2) {
    if (t2 < 0) {
      t2 += 1;
    }
    if (t2 > 1) {
      t2 -= 1;
    }
    if (t2 < 1 / 6) {
      return p2 + (q2 - p2) * 6 * t2;
    }
    if (t2 < 1 / 2) {
      return q2;
    }
    if (t2 < 2 / 3) {
      return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
    }
    return p2;
  }
  var r2, g, b;
  if (s3 == 0) {
    r2 = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s3) : l + s3 - l * s3;
    var p = 2 * l - q;
    r2 = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return "rgba(" + r2 * 255 + "," + g * 255 + "," + b * 255 + "," + a2 + ")";
}
function colorToRgb(val) {
  if (is.rgb(val)) {
    return rgbToRgba(val);
  }
  if (is.hex(val)) {
    return hexToRgba(val);
  }
  if (is.hsl(val)) {
    return hslToRgba(val);
  }
}
function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) {
    return split[1];
  }
}
function getTransformUnit(propName) {
  if (stringContains(propName, "translate") || propName === "perspective") {
    return "px";
  }
  if (stringContains(propName, "rotate") || stringContains(propName, "skew")) {
    return "deg";
  }
}
function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) {
    return val;
  }
  return val(animatable.target, animatable.id, animatable.total);
}
function getAttribute(el, prop) {
  return el.getAttribute(prop);
}
function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
    return value;
  }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) {
    return cached;
  }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = "absolute";
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}
function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}
function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
    return "attribute";
  }
  if (is.dom(el) && arrayContains(validTransforms, prop)) {
    return "transform";
  }
  if (is.dom(el) && (prop !== "transform" && getCSSValue(el, prop))) {
    return "css";
  }
  if (el[prop] != null) {
    return "object";
  }
}
function getElementTransforms(el) {
  if (!is.dom(el)) {
    return;
  }
  var str = el.style.transform || "";
  var reg = /(\w+)\(([^)]*)\)/g;
  var transforms = /* @__PURE__ */ new Map();
  var m;
  while (m = reg.exec(str)) {
    transforms.set(m[1], m[2]);
  }
  return transforms;
}
function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms["last"] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}
function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case "transform":
      return getTransformValue(target, propName, animatable, unit);
    case "css":
      return getCSSValue(target, propName, unit);
    case "attribute":
      return getAttribute(target, propName);
    default:
      return target[propName] || 0;
  }
}
function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) {
    return to;
  }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ""));
  switch (operator[0][0]) {
    case "+":
      return x + y + u;
    case "-":
      return x - y + u;
    case "*":
      return x * y + u;
  }
}
function validateValue(val, unit) {
  if (is.col(val)) {
    return colorToRgb(val);
  }
  if (/\s/g.test(val)) {
    return val;
  }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) {
    return unitLess + unit;
  }
  return unitLess;
}
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, "r");
}
function getRectLength(el) {
  return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
}
function getLineLength(el) {
  return getDistance(
    { x: getAttribute(el, "x1"), y: getAttribute(el, "y1") },
    { x: getAttribute(el, "x2"), y: getAttribute(el, "y2") }
  );
}
function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) {
      totalLength += getDistance(previousPos, currentPos);
    }
    previousPos = currentPos;
  }
  return totalLength;
}
function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}
function getTotalLength(el) {
  if (el.getTotalLength) {
    return el.getTotalLength();
  }
  switch (el.tagName.toLowerCase()) {
    case "circle":
      return getCircleLength(el);
    case "rect":
      return getRectLength(el);
    case "line":
      return getLineLength(el);
    case "polyline":
      return getPolylineLength(el);
    case "polygon":
      return getPolygonLength(el);
  }
}
function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute("stroke-dasharray", pathLength);
  return pathLength;
}
function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) {
      break;
    }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}
function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  };
}
function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function(property) {
    return {
      property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    };
  };
}
function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if (offset === void 0)
      offset = 0;
    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case "x":
      return (p.x - svg.x) * scaleX;
    case "y":
      return (p.y - svg.y) * scaleY;
    case "angle":
      return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}
function decomposeValue(val, unit) {
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
  var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: is.str(val) || unit ? value.split(rgx) : []
  };
}
function parseTargets(targets) {
  var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
  return filterArray(targetsArray, function(item, pos, self2) {
    return self2.indexOf(item) === pos;
  });
}
function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function(t2, i) {
    return { target: t2, id: i, total: parsed.length, transforms: { list: getElementTransforms(t2) } };
  });
}
function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  if (/^spring/.test(settings.easing)) {
    settings.duration = spring(settings.easing);
  }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = l === 2 && !is.obj(prop[0]);
    if (!isFromTo) {
      if (!is.fnc(tweenSettings.duration)) {
        settings.duration = tweenSettings.duration / l;
      }
    } else {
      prop = { value: prop };
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function(v, i) {
    var obj = is.obj(v) && !is.pth(v) ? v : { value: v };
    if (is.und(obj.delay)) {
      obj.delay = !i ? tweenSettings.delay : 0;
    }
    if (is.und(obj.endDelay)) {
      obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
    }
    return obj;
  }).map(function(k) {
    return mergeObjects(k, settings);
  });
}
function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function(key2) {
    return Object.keys(key2);
  })), function(p) {
    return is.key(p);
  }).reduce(function(a2, b) {
    if (a2.indexOf(b) < 0) {
      a2.push(b);
    }
    return a2;
  }, []);
  var properties = {};
  var loop = function(i2) {
    var propName = propertyNames[i2];
    properties[propName] = keyframes.map(function(key2) {
      var newKey = {};
      for (var p in key2) {
        if (is.key(p)) {
          if (p == propName) {
            newKey.value = key2[p];
          }
        } else {
          newKey[p] = key2[p];
        }
      }
      return newKey;
    });
  };
  for (var i = 0; i < propertyNames.length; i++)
    loop(i);
  return properties;
}
function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) {
    params = mergeObjects(flattenKeyframes(keyframes), params);
  }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}
function normalizeTweenValues(tween, animatable) {
  var t2 = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function(v) {
        return getFunctionValue(v, animatable);
      });
      if (value.length === 1) {
        value = value[0];
      }
    }
    t2[p] = value;
  }
  t2.duration = parseFloat(t2.duration);
  t2.delay = parseFloat(t2.delay);
  return t2;
}
function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function(t2) {
    var tween = normalizeTweenValues(t2, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) {
      to = previousValue;
    }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) {
      tween.round = 1;
    }
    previousTween = tween;
    return tween;
  });
}
function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function(animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}
function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable,
      tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    };
  }
}
function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function(animatable) {
    return properties.map(function(prop) {
      return createAnimation(animatable, prop);
    });
  })), function(a2) {
    return !is.und(a2);
  });
}
function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function(anim) {
    return anim.timelineOffset ? anim.timelineOffset : 0;
  };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration;
  })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.delay;
  })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration - anim.endDelay;
  })) : tweenSettings.endDelay;
  return timings;
}
function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id,
    children: [],
    animatables,
    animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}
function isDocumentHidden() {
  return !!document && document.hidden;
}
function anime(params) {
  if (params === void 0)
    params = {};
  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;
  function makePromise(instance2) {
    var promise2 = window.Promise && new Promise(function(_resolve) {
      return resolve = _resolve;
    });
    instance2.finished = promise2;
    return promise2;
  }
  var instance = createNewInstance(params);
  var promise = makePromise(instance);
  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== "alternate") {
      instance.direction = direction !== "normal" ? "normal" : "reverse";
    }
    instance.reversed = !instance.reversed;
    children.forEach(function(child) {
      return child.reversed = instance.reversed;
    });
  }
  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }
  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }
  function seekChild(time, child) {
    if (child) {
      child.seek(time - child.timelineOffset);
    }
  }
  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) {
        seekChild(time, children[i]);
      }
    } else {
      for (var i$1 = childrenLength; i$1--; ) {
        seekChild(time, children[i$1]);
      }
    }
  }
  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      if (tweenLength) {
        tween = filterArray(tweens, function(t2) {
          return insTime < t2.end;
        })[0] || tween;
      }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = void 0;
      for (var n2 = 0; n2 < toNumbersLength; n2++) {
        var value = void 0;
        var toNumber = tween.to.numbers[n2];
        var fromNumber = tween.from.numbers[n2] || 0;
        if (!tween.isPath) {
          value = fromNumber + eased * (toNumber - fromNumber);
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }
        if (round) {
          if (!(tween.isColor && n2 > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s3 = 0; s3 < stringsLength; s3++) {
          var a2 = strings[s3];
          var b = strings[s3 + 1];
          var n$1 = numbers[s3];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + " ";
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }
  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) {
      instance[cb](instance);
    }
  }
  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }
  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax(insTime / insDuration * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) {
      syncInstanceChildren(insTime);
    }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback("begin");
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback("loopBegin");
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback("changeBegin");
      }
      setCallback("change");
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback("changeComplete");
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) {
      setCallback("update");
    }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback("loopComplete");
          setCallback("complete");
          if (!instance.passThrough && "Promise" in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback("loopComplete");
        instance.loopBegan = false;
        if (instance.direction === "alternate") {
          toggleInstanceDirection();
        }
      }
    }
  }
  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === "reverse";
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--; ) {
      instance.children[i].reset();
    }
    if (instance.reversed && instance.loop !== true || direction === "alternate" && instance.loop === 1) {
      instance.remaining++;
    }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };
  instance._onDocumentVisibility = resetTime;
  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };
  instance.tick = function(t2) {
    now = t2;
    if (!startTime) {
      startTime = now;
    }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };
  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };
  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };
  instance.play = function() {
    if (!instance.paused) {
      return;
    }
    if (instance.completed) {
      instance.reset();
    }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };
  instance.reverse = function() {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };
  instance.restart = function() {
    instance.reset();
    instance.play();
  };
  instance.remove = function(targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };
  instance.reset();
  if (instance.autoplay) {
    instance.play();
  }
  return instance;
}
function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a2 = animations.length; a2--; ) {
    if (arrayContains(targetsArray, animations[a2].animatable.target)) {
      animations.splice(a2, 1);
    }
  }
}
function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c2 = children.length; c2--; ) {
    var child = children[c2];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);
    if (!childAnimations.length && !child.children.length) {
      children.splice(c2, 1);
    }
  }
  if (!animations.length && !children.length) {
    instance.pause();
  }
}
function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--; ) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
}
function stagger(val, params) {
  if (params === void 0)
    params = {};
  var direction = params.direction || "normal";
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === "first";
  var fromCenter = fromIndex === "center";
  var fromLast = fromIndex === "last";
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function(el, i, t2) {
    if (fromFirst) {
      fromIndex = 0;
    }
    if (fromCenter) {
      fromIndex = (t2 - 1) / 2;
    }
    if (fromLast) {
      fromIndex = t2 - 1;
    }
    if (!values.length) {
      for (var index9 = 0; index9 < t2; index9++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index9));
        } else {
          var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          var toX = index9 % grid[0];
          var toY = Math.floor(index9 / grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === "x") {
            value = -distanceX;
          }
          if (axis === "y") {
            value = -distanceY;
          }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) {
        values = values.map(function(val3) {
          return easing(val3 / maxValue) * maxValue;
        });
      }
      if (direction === "reverse") {
        values = values.map(function(val3) {
          return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
        });
      }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
  };
}
function timeline(params) {
  if (params === void 0)
    params = {};
  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) {
      activeInstances.splice(tlIndex, 1);
    }
    function passThrough(ins2) {
      ins2.passThrough = true;
    }
    for (var i = 0; i < children.length; i++) {
      passThrough(children[i]);
    }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) {
      tl.play();
    }
    return tl;
  };
  return tl;
}
var defaultInstanceSettings, defaultTweenSettings, validTransforms, cache, is, bezier, penner, setProgressValue, instanceID, activeInstances, engine;
var init_anime_es = __esm({
  "node_modules/animejs/lib/anime.es.js"() {
    defaultInstanceSettings = {
      update: null,
      begin: null,
      loopBegin: null,
      changeBegin: null,
      change: null,
      changeComplete: null,
      loopComplete: null,
      complete: null,
      loop: 1,
      direction: "normal",
      autoplay: true,
      timelineOffset: 0
    };
    defaultTweenSettings = {
      duration: 1e3,
      delay: 0,
      endDelay: 0,
      easing: "easeOutElastic(1, .5)",
      round: 0
    };
    validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
    cache = {
      CSS: {},
      springs: {}
    };
    is = {
      arr: function(a2) {
        return Array.isArray(a2);
      },
      obj: function(a2) {
        return stringContains(Object.prototype.toString.call(a2), "Object");
      },
      pth: function(a2) {
        return is.obj(a2) && a2.hasOwnProperty("totalLength");
      },
      svg: function(a2) {
        return a2 instanceof SVGElement;
      },
      inp: function(a2) {
        return a2 instanceof HTMLInputElement;
      },
      dom: function(a2) {
        return a2.nodeType || is.svg(a2);
      },
      str: function(a2) {
        return typeof a2 === "string";
      },
      fnc: function(a2) {
        return typeof a2 === "function";
      },
      und: function(a2) {
        return typeof a2 === "undefined";
      },
      nil: function(a2) {
        return is.und(a2) || a2 === null;
      },
      hex: function(a2) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a2);
      },
      rgb: function(a2) {
        return /^rgb/.test(a2);
      },
      hsl: function(a2) {
        return /^hsl/.test(a2);
      },
      col: function(a2) {
        return is.hex(a2) || is.rgb(a2) || is.hsl(a2);
      },
      key: function(a2) {
        return !defaultInstanceSettings.hasOwnProperty(a2) && !defaultTweenSettings.hasOwnProperty(a2) && a2 !== "targets" && a2 !== "keyframes";
      }
    };
    bezier = function() {
      var kSplineTableSize = 11;
      var kSampleStepSize = 1 / (kSplineTableSize - 1);
      function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
      }
      function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
      }
      function C(aA1) {
        return 3 * aA1;
      }
      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }
      function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
      }
      function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
          currentT = aA + (aB - aA) / 2;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > 1e-7 && ++i < 10);
        return currentT;
      }
      function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < 4; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);
          if (currentSlope === 0) {
            return aGuessT;
          }
          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
      }
      function bezier2(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
          return;
        }
        var sampleValues = new Float32Array(kSplineTableSize);
        if (mX1 !== mY1 || mX2 !== mY2) {
          for (var i = 0; i < kSplineTableSize; ++i) {
            sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
          }
        }
        function getTForX(aX) {
          var intervalStart = 0;
          var currentSample = 1;
          var lastSample = kSplineTableSize - 1;
          for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
          }
          --currentSample;
          var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
          var guessForT = intervalStart + dist * kSampleStepSize;
          var initialSlope = getSlope(guessForT, mX1, mX2);
          if (initialSlope >= 1e-3) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
          } else if (initialSlope === 0) {
            return guessForT;
          } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
          }
        }
        return function(x) {
          if (mX1 === mY1 && mX2 === mY2) {
            return x;
          }
          if (x === 0 || x === 1) {
            return x;
          }
          return calcBezier(getTForX(x), mY1, mY2);
        };
      }
      return bezier2;
    }();
    penner = function() {
      var eases = { linear: function() {
        return function(t2) {
          return t2;
        };
      } };
      var functionEasings = {
        Sine: function() {
          return function(t2) {
            return 1 - Math.cos(t2 * Math.PI / 2);
          };
        },
        Circ: function() {
          return function(t2) {
            return 1 - Math.sqrt(1 - t2 * t2);
          };
        },
        Back: function() {
          return function(t2) {
            return t2 * t2 * (3 * t2 - 2);
          };
        },
        Bounce: function() {
          return function(t2) {
            var pow2, b = 4;
            while (t2 < ((pow2 = Math.pow(2, --b)) - 1) / 11) {
            }
            return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t2, 2);
          };
        },
        Elastic: function(amplitude, period) {
          if (amplitude === void 0)
            amplitude = 1;
          if (period === void 0)
            period = 0.5;
          var a2 = minMax(amplitude, 1, 10);
          var p = minMax(period, 0.1, 2);
          return function(t2) {
            return t2 === 0 || t2 === 1 ? t2 : -a2 * Math.pow(2, 10 * (t2 - 1)) * Math.sin((t2 - 1 - p / (Math.PI * 2) * Math.asin(1 / a2)) * (Math.PI * 2) / p);
          };
        }
      };
      var baseEasings = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
      baseEasings.forEach(function(name, i) {
        functionEasings[name] = function() {
          return function(t2) {
            return Math.pow(t2, i + 2);
          };
        };
      });
      Object.keys(functionEasings).forEach(function(name) {
        var easeIn = functionEasings[name];
        eases["easeIn" + name] = easeIn;
        eases["easeOut" + name] = function(a2, b) {
          return function(t2) {
            return 1 - easeIn(a2, b)(1 - t2);
          };
        };
        eases["easeInOut" + name] = function(a2, b) {
          return function(t2) {
            return t2 < 0.5 ? easeIn(a2, b)(t2 * 2) / 2 : 1 - easeIn(a2, b)(t2 * -2 + 2) / 2;
          };
        };
        eases["easeOutIn" + name] = function(a2, b) {
          return function(t2) {
            return t2 < 0.5 ? (1 - easeIn(a2, b)(1 - t2 * 2)) / 2 : (easeIn(a2, b)(t2 * 2 - 1) + 1) / 2;
          };
        };
      });
      return eases;
    }();
    setProgressValue = {
      css: function(t2, p, v) {
        return t2.style[p] = v;
      },
      attribute: function(t2, p, v) {
        return t2.setAttribute(p, v);
      },
      object: function(t2, p, v) {
        return t2[p] = v;
      },
      transform: function(t2, p, v, transforms, manual) {
        transforms.list.set(p, v);
        if (p === transforms.last || manual) {
          var str = "";
          transforms.list.forEach(function(value, prop) {
            str += prop + "(" + value + ") ";
          });
          t2.style.transform = str;
        }
      }
    };
    instanceID = 0;
    activeInstances = [];
    engine = function() {
      var raf;
      function play() {
        if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
          raf = requestAnimationFrame(step);
        }
      }
      function step(t2) {
        var activeInstancesLength = activeInstances.length;
        var i = 0;
        while (i < activeInstancesLength) {
          var activeInstance = activeInstances[i];
          if (!activeInstance.paused) {
            activeInstance.tick(t2);
            i++;
          } else {
            activeInstances.splice(i, 1);
            activeInstancesLength--;
          }
        }
        raf = i > 0 ? requestAnimationFrame(step) : void 0;
      }
      function handleVisibilityChange() {
        if (!anime.suspendWhenDocumentHidden) {
          return;
        }
        if (isDocumentHidden()) {
          raf = cancelAnimationFrame(raf);
        } else {
          activeInstances.forEach(
            function(instance) {
              return instance._onDocumentVisibility();
            }
          );
          engine();
        }
      }
      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", handleVisibilityChange);
      }
      return play;
    }();
    anime.version = "3.2.1";
    anime.speed = 1;
    anime.suspendWhenDocumentHidden = true;
    anime.running = activeInstances;
    anime.remove = removeTargetsFromActiveInstances;
    anime.get = getOriginalTargetValue;
    anime.set = setTargetsValue;
    anime.convertPx = convertPxToUnit;
    anime.path = getPath;
    anime.setDashoffset = setDashoffset;
    anime.stagger = stagger;
    anime.timeline = timeline;
    anime.easing = parseEasings;
    anime.penner = penner;
    anime.random = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  }
});

// node_modules/marked/lib/marked.esm.js
function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
function escape2(html, encode2) {
  if (encode2) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
function unescape(html) {
  return html.replace(unescapeTest, (_, n2) => {
    n2 = n2.toLowerCase();
    if (n2 === "colon")
      return ":";
    if (n2.charAt(0) === "#") {
      return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
    }
    return "";
  });
}
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
function cleanUrl(sanitize, base2, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e3) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base2 && !originIndependentUrl.test(href)) {
    href = resolveUrl(base2, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e3) {
    return null;
  }
  return href;
}
function resolveUrl(base2, href) {
  if (!baseUrls[" " + base2]) {
    if (justDomain.test(base2)) {
      baseUrls[" " + base2] = base2 + "/";
    } else {
      baseUrls[" " + base2] = rtrim(base2, "/", true);
    }
  }
  base2 = baseUrls[" " + base2];
  const relativeBase = base2.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base2.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base2.replace(domain, "$1") + href;
  } else {
    return base2 + href;
  }
}
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped2 = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped2 = !escaped2;
    if (escaped2) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c2, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c2 && !invert) {
      suffLen++;
    } else if (currChar !== c2 && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern2, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern2;
    }
    count >>= 1;
    pattern2 += pattern2;
  }
  return result + pattern2;
}
function outputLink(cap, link, raw, lexer2) {
  const href = link.href;
  const title = link.title ? escape2(link.title) : null;
  const text2 = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text: text2,
      tokens: lexer2.inlineTokens(text2)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape2(text2)
  };
}
function indentCodeCompensation(raw, text2) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text2;
  }
  const indentToCode = matchIndentToCode[1];
  return text2.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
function smartypants(text2) {
  return text2.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text2) {
  let out = "", i, ch;
  const l = text2.length;
  for (i = 0; i < l; i++) {
    ch = text2.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
function onError(silent, async, callback) {
  return (e3) => {
    e3.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (silent) {
      const msg = "<p>An error occurred:</p><pre>" + escape2(e3.message + "", true) + "</pre>";
      if (async) {
        return Promise.resolve(msg);
      }
      if (callback) {
        callback(null, msg);
        return;
      }
      return msg;
    }
    if (async) {
      return Promise.reject(e3);
    }
    if (callback) {
      callback(e3);
      return;
    }
    throw e3;
  };
}
function parseMarkdown(lexer2, parser2) {
  return (src, opt, callback) => {
    if (typeof opt === "function") {
      callback = opt;
      opt = null;
    }
    const origOpt = { ...opt };
    opt = { ...marked.defaults, ...origOpt };
    const throwError = onError(opt.silent, opt.async, callback);
    if (typeof src === "undefined" || src === null) {
      return throwError(new Error("marked(): input parameter is undefined or null"));
    }
    if (typeof src !== "string") {
      return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
    }
    checkSanitizeDeprecation(opt);
    if (opt.hooks) {
      opt.hooks.options = opt;
    }
    if (callback) {
      const highlight = opt.highlight;
      let tokens;
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        tokens = lexer2(src, opt);
      } catch (e3) {
        return throwError(e3);
      }
      const done = function(err) {
        let out;
        if (!err) {
          try {
            if (opt.walkTokens) {
              marked.walkTokens(tokens, opt.walkTokens);
            }
            out = parser2(tokens, opt);
            if (opt.hooks) {
              out = opt.hooks.postprocess(out);
            }
          } catch (e3) {
            err = e3;
          }
        }
        opt.highlight = highlight;
        return err ? throwError(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!tokens.length)
        return done();
      let pending = 0;
      marked.walkTokens(tokens, function(token) {
        if (token.type === "code") {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, function(err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }
              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });
      if (pending === 0) {
        done();
      }
      return;
    }
    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.walkTokens ? Promise.all(marked.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html) => opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
    }
    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      const tokens = lexer2(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      let html = parser2(tokens, opt);
      if (opt.hooks) {
        html = opt.hooks.postprocess(html);
      }
      return html;
    } catch (e3) {
      return throwError(e3);
    }
  };
}
function marked(src, opt, callback) {
  return parseMarkdown(Lexer.lex, Parser.parse)(src, opt, callback);
}
var defaults, escapeTest, escapeReplace, escapeTestNoEncode, escapeReplaceNoEncode, escapeReplacements, getEscapeReplacement, unescapeTest, caret, nonWordAndColonTest, originIndependentUrl, baseUrls, justDomain, protocol, domain, noopTest, Tokenizer, block, inline, Lexer, Renderer, TextRenderer, Slugger, Parser, Hooks, options2, setOptions, use, walkTokens, parseInline, parser, lexer;
var init_marked_esm = __esm({
  "node_modules/marked/lib/marked.esm.js"() {
    defaults = getDefaults();
    escapeTest = /[&<>"']/;
    escapeReplace = new RegExp(escapeTest.source, "g");
    escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
    escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
    escapeReplacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    getEscapeReplacement = (ch) => escapeReplacements[ch];
    unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
    caret = /(^|[^\[])\^/g;
    nonWordAndColonTest = /[^\w:]/g;
    originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    baseUrls = {};
    justDomain = /^[^:]+:\/*[^/]*$/;
    protocol = /^([^:]+:)[\s\S]*$/;
    domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    noopTest = { exec: function noopTest2() {
    } };
    Tokenizer = class {
      constructor(options3) {
        this.options = options3 || defaults;
      }
      space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap && cap[0].length > 0) {
          return {
            type: "space",
            raw: cap[0]
          };
        }
      }
      code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
          const text2 = cap[0].replace(/^ {1,4}/gm, "");
          return {
            type: "code",
            raw: cap[0],
            codeBlockStyle: "indented",
            text: !this.options.pedantic ? rtrim(text2, "\n") : text2
          };
        }
      }
      fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
          const raw = cap[0];
          const text2 = indentCodeCompensation(raw, cap[3] || "");
          return {
            type: "code",
            raw,
            lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
            text: text2
          };
        }
      }
      heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
          let text2 = cap[2].trim();
          if (/#$/.test(text2)) {
            const trimmed = rtrim(text2, "#");
            if (this.options.pedantic) {
              text2 = trimmed.trim();
            } else if (!trimmed || / $/.test(trimmed)) {
              text2 = trimmed.trim();
            }
          }
          return {
            type: "heading",
            raw: cap[0],
            depth: cap[1].length,
            text: text2,
            tokens: this.lexer.inline(text2)
          };
        }
      }
      hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
          return {
            type: "hr",
            raw: cap[0]
          };
        }
      }
      blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
          const text2 = cap[0].replace(/^ *>[ \t]?/gm, "");
          const top = this.lexer.state.top;
          this.lexer.state.top = true;
          const tokens = this.lexer.blockTokens(text2);
          this.lexer.state.top = top;
          return {
            type: "blockquote",
            raw: cap[0],
            tokens,
            text: text2
          };
        }
      }
      list(src) {
        let cap = this.rules.block.list.exec(src);
        if (cap) {
          let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
          let bull = cap[1].trim();
          const isordered = bull.length > 1;
          const list = {
            type: "list",
            raw: "",
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : "",
            loose: false,
            items: []
          };
          bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
          if (this.options.pedantic) {
            bull = isordered ? bull : "[*+-]";
          }
          const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
          while (src) {
            endEarly = false;
            if (!(cap = itemRegex.exec(src))) {
              break;
            }
            if (this.rules.block.hr.test(src)) {
              break;
            }
            raw = cap[0];
            src = src.substring(raw.length);
            line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t2) => " ".repeat(3 * t2.length));
            nextLine = src.split("\n", 1)[0];
            if (this.options.pedantic) {
              indent = 2;
              itemContents = line.trimLeft();
            } else {
              indent = cap[2].search(/[^ ]/);
              indent = indent > 4 ? 1 : indent;
              itemContents = line.slice(indent);
              indent += cap[1].length;
            }
            blankLine = false;
            if (!line && /^ *$/.test(nextLine)) {
              raw += nextLine + "\n";
              src = src.substring(nextLine.length + 1);
              endEarly = true;
            }
            if (!endEarly) {
              const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
              const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
              const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
              const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
              while (src) {
                rawLine = src.split("\n", 1)[0];
                nextLine = rawLine;
                if (this.options.pedantic) {
                  nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
                }
                if (fencesBeginRegex.test(nextLine)) {
                  break;
                }
                if (headingBeginRegex.test(nextLine)) {
                  break;
                }
                if (nextBulletRegex.test(nextLine)) {
                  break;
                }
                if (hrRegex.test(src)) {
                  break;
                }
                if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                  itemContents += "\n" + nextLine.slice(indent);
                } else {
                  if (blankLine) {
                    break;
                  }
                  if (line.search(/[^ ]/) >= 4) {
                    break;
                  }
                  if (fencesBeginRegex.test(line)) {
                    break;
                  }
                  if (headingBeginRegex.test(line)) {
                    break;
                  }
                  if (hrRegex.test(line)) {
                    break;
                  }
                  itemContents += "\n" + nextLine;
                }
                if (!blankLine && !nextLine.trim()) {
                  blankLine = true;
                }
                raw += rawLine + "\n";
                src = src.substring(rawLine.length + 1);
                line = nextLine.slice(indent);
              }
            }
            if (!list.loose) {
              if (endsWithBlankLine) {
                list.loose = true;
              } else if (/\n *\n *$/.test(raw)) {
                endsWithBlankLine = true;
              }
            }
            if (this.options.gfm) {
              istask = /^\[[ xX]\] /.exec(itemContents);
              if (istask) {
                ischecked = istask[0] !== "[ ] ";
                itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
              }
            }
            list.items.push({
              type: "list_item",
              raw,
              task: !!istask,
              checked: ischecked,
              loose: false,
              text: itemContents
            });
            list.raw += raw;
          }
          list.items[list.items.length - 1].raw = raw.trimRight();
          list.items[list.items.length - 1].text = itemContents.trimRight();
          list.raw = list.raw.trimRight();
          const l = list.items.length;
          for (i = 0; i < l; i++) {
            this.lexer.state.top = false;
            list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
            if (!list.loose) {
              const spacers = list.items[i].tokens.filter((t2) => t2.type === "space");
              const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => /\n.*\n/.test(t2.raw));
              list.loose = hasMultipleLineBreaks;
            }
          }
          if (list.loose) {
            for (i = 0; i < l; i++) {
              list.items[i].loose = true;
            }
          }
          return list;
        }
      }
      html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
          const token = {
            type: "html",
            raw: cap[0],
            pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
            text: cap[0]
          };
          if (this.options.sanitize) {
            const text2 = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]);
            token.type = "paragraph";
            token.text = text2;
            token.tokens = this.lexer.inline(text2);
          }
          return token;
        }
      }
      def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
          const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
          const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
          const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
          return {
            type: "def",
            tag,
            raw: cap[0],
            href,
            title
          };
        }
      }
      table(src) {
        const cap = this.rules.block.table.exec(src);
        if (cap) {
          const item = {
            type: "table",
            header: splitCells(cap[1]).map((c2) => {
              return { text: c2 };
            }),
            align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
          };
          if (item.header.length === item.align.length) {
            item.raw = cap[0];
            let l = item.align.length;
            let i, j, k, row;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
            l = item.rows.length;
            for (i = 0; i < l; i++) {
              item.rows[i] = splitCells(item.rows[i], item.header.length).map((c2) => {
                return { text: c2 };
              });
            }
            l = item.header.length;
            for (j = 0; j < l; j++) {
              item.header[j].tokens = this.lexer.inline(item.header[j].text);
            }
            l = item.rows.length;
            for (j = 0; j < l; j++) {
              row = item.rows[j];
              for (k = 0; k < row.length; k++) {
                row[k].tokens = this.lexer.inline(row[k].text);
              }
            }
            return item;
          }
        }
      }
      lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
          return {
            type: "heading",
            raw: cap[0],
            depth: cap[2].charAt(0) === "=" ? 1 : 2,
            text: cap[1],
            tokens: this.lexer.inline(cap[1])
          };
        }
      }
      paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
          const text2 = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
          return {
            type: "paragraph",
            raw: cap[0],
            text: text2,
            tokens: this.lexer.inline(text2)
          };
        }
      }
      text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
          return {
            type: "text",
            raw: cap[0],
            text: cap[0],
            tokens: this.lexer.inline(cap[0])
          };
        }
      }
      escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
          return {
            type: "escape",
            raw: cap[0],
            text: escape2(cap[1])
          };
        }
      }
      tag(src) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
          if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
            this.lexer.state.inLink = true;
          } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
            this.lexer.state.inLink = false;
          }
          if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = true;
          } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = false;
          }
          return {
            type: this.options.sanitize ? "text" : "html",
            raw: cap[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]) : cap[0]
          };
        }
      }
      link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
          const trimmedUrl = cap[2].trim();
          if (!this.options.pedantic && /^</.test(trimmedUrl)) {
            if (!/>$/.test(trimmedUrl)) {
              return;
            }
            const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
            if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
              return;
            }
          } else {
            const lastParenIndex = findClosingBracket(cap[2], "()");
            if (lastParenIndex > -1) {
              const start = cap[0].indexOf("!") === 0 ? 5 : 4;
              const linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = "";
            }
          }
          let href = cap[2];
          let title = "";
          if (this.options.pedantic) {
            const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
            if (link) {
              href = link[1];
              title = link[3];
            }
          } else {
            title = cap[3] ? cap[3].slice(1, -1) : "";
          }
          href = href.trim();
          if (/^</.test(href)) {
            if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
              href = href.slice(1);
            } else {
              href = href.slice(1, -1);
            }
          }
          return outputLink(cap, {
            href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
            title: title ? title.replace(this.rules.inline._escapes, "$1") : title
          }, cap[0], this.lexer);
        }
      }
      reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
          let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
          link = links[link.toLowerCase()];
          if (!link) {
            const text2 = cap[0].charAt(0);
            return {
              type: "text",
              raw: text2,
              text: text2
            };
          }
          return outputLink(cap, link, cap[0], this.lexer);
        }
      }
      emStrong(src, maskedSrc, prevChar = "") {
        let match = this.rules.inline.emStrong.lDelim.exec(src);
        if (!match)
          return;
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
          return;
        const nextChar = match[1] || match[2] || "";
        if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
          const lLength = match[0].length - 1;
          let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
          const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
          endReg.lastIndex = 0;
          maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
          while ((match = endReg.exec(maskedSrc)) != null) {
            rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
            if (!rDelim)
              continue;
            rLength = rDelim.length;
            if (match[3] || match[4]) {
              delimTotal += rLength;
              continue;
            } else if (match[5] || match[6]) {
              if (lLength % 3 && !((lLength + rLength) % 3)) {
                midDelimTotal += rLength;
                continue;
              }
            }
            delimTotal -= rLength;
            if (delimTotal > 0)
              continue;
            rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
            const raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);
            if (Math.min(lLength, rLength) % 2) {
              const text3 = raw.slice(1, -1);
              return {
                type: "em",
                raw,
                text: text3,
                tokens: this.lexer.inlineTokens(text3)
              };
            }
            const text2 = raw.slice(2, -2);
            return {
              type: "strong",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
            };
          }
        }
      }
      codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
          let text2 = cap[2].replace(/\n/g, " ");
          const hasNonSpaceChars = /[^ ]/.test(text2);
          const hasSpaceCharsOnBothEnds = /^ /.test(text2) && / $/.test(text2);
          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text2 = text2.substring(1, text2.length - 1);
          }
          text2 = escape2(text2, true);
          return {
            type: "codespan",
            raw: cap[0],
            text: text2
          };
        }
      }
      br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
          return {
            type: "br",
            raw: cap[0]
          };
        }
      }
      del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
          return {
            type: "del",
            raw: cap[0],
            text: cap[2],
            tokens: this.lexer.inlineTokens(cap[2])
          };
        }
      }
      autolink(src, mangle2) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
          let text2, href;
          if (cap[2] === "@") {
            text2 = escape2(this.options.mangle ? mangle2(cap[1]) : cap[1]);
            href = "mailto:" + text2;
          } else {
            text2 = escape2(cap[1]);
            href = text2;
          }
          return {
            type: "link",
            raw: cap[0],
            text: text2,
            href,
            tokens: [
              {
                type: "text",
                raw: text2,
                text: text2
              }
            ]
          };
        }
      }
      url(src, mangle2) {
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
          let text2, href;
          if (cap[2] === "@") {
            text2 = escape2(this.options.mangle ? mangle2(cap[0]) : cap[0]);
            href = "mailto:" + text2;
          } else {
            let prevCapZero;
            do {
              prevCapZero = cap[0];
              cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
            } while (prevCapZero !== cap[0]);
            text2 = escape2(cap[0]);
            if (cap[1] === "www.") {
              href = "http://" + cap[0];
            } else {
              href = cap[0];
            }
          }
          return {
            type: "link",
            raw: cap[0],
            text: text2,
            href,
            tokens: [
              {
                type: "text",
                raw: text2,
                text: text2
              }
            ]
          };
        }
      }
      inlineText(src, smartypants2) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
          let text2;
          if (this.lexer.state.inRawBlock) {
            text2 = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape2(cap[0]) : cap[0];
          } else {
            text2 = escape2(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
          }
          return {
            type: "text",
            raw: cap[0],
            text: text2
          };
        }
      }
    };
    block = {
      newline: /^(?: *(?:\n|$))+/,
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
      hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
      html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
      def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
      table: noopTest,
      lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      // regex template, placeholders will be replaced according to different paragraph
      // interruption rules of commonmark and the original markdown spec:
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
      text: /^[^\n]+/
    };
    block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
    block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
    block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
    block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
    block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
    block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
    block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
    block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
    block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
    block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
    block.normal = { ...block };
    block.gfm = {
      ...block.normal,
      table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
      // Cells
    };
    block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.pedantic = {
      ...block.normal,
      html: edit(
        `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
      ).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: noopTest,
      // fences not supported
      lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    };
    inline = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest,
      tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
      // CDATA section
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(ref)\]/,
      nolink: /^!?\[(ref)\](?:\[\])?/,
      reflinkSearch: "reflink|nolink(?!\\()",
      emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
        //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
        rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
        rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
        // ^- Not allowed for _
      },
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: noopTest,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
      punctuation: /^([\spunctuation])/
    };
    inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
    inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
    inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
    inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
    inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
    inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
    inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
    inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
    inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
    inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
    inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
    inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
    inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
    inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
    inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
    inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
    inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
    inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
    inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
    inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
    inline.normal = { ...inline };
    inline.pedantic = {
      ...inline.normal,
      strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
      },
      link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
      reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
    };
    inline.gfm = {
      ...inline.normal,
      escape: edit(inline.escape).replace("])", "~|])").getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    };
    inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
    inline.breaks = {
      ...inline.gfm,
      br: edit(inline.br).replace("{2,}", "*").getRegex(),
      text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    };
    Lexer = class {
      constructor(options3) {
        this.tokens = [];
        this.tokens.links = /* @__PURE__ */ Object.create(null);
        this.options = options3 || defaults;
        this.options.tokenizer = this.options.tokenizer || new Tokenizer();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
          inLink: false,
          inRawBlock: false,
          top: true
        };
        const rules = {
          block: block.normal,
          inline: inline.normal
        };
        if (this.options.pedantic) {
          rules.block = block.pedantic;
          rules.inline = inline.pedantic;
        } else if (this.options.gfm) {
          rules.block = block.gfm;
          if (this.options.breaks) {
            rules.inline = inline.breaks;
          } else {
            rules.inline = inline.gfm;
          }
        }
        this.tokenizer.rules = rules;
      }
      /**
       * Expose Rules
       */
      static get rules() {
        return {
          block,
          inline
        };
      }
      /**
       * Static Lex Method
       */
      static lex(src, options3) {
        const lexer2 = new Lexer(options3);
        return lexer2.lex(src);
      }
      /**
       * Static Lex Inline Method
       */
      static lexInline(src, options3) {
        const lexer2 = new Lexer(options3);
        return lexer2.inlineTokens(src);
      }
      /**
       * Preprocessing
       */
      lex(src) {
        src = src.replace(/\r\n|\r/g, "\n");
        this.blockTokens(src, this.tokens);
        let next;
        while (next = this.inlineQueue.shift()) {
          this.inlineTokens(next.src, next.tokens);
        }
        return this.tokens;
      }
      /**
       * Lexing
       */
      blockTokens(src, tokens = []) {
        if (this.options.pedantic) {
          src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
        } else {
          src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
            return leading + "    ".repeat(tabs.length);
          });
        }
        let token, lastToken, cutSrc, lastParagraphClipped;
        while (src) {
          if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
            if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              return true;
            }
            return false;
          })) {
            continue;
          }
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);
            if (token.raw.length === 1 && tokens.length > 0) {
              tokens[tokens.length - 1].raw += "\n";
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.code(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.def(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.raw;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }
            continue;
          }
          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startBlock) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startBlock.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === "number" && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
            lastToken = tokens[tokens.length - 1];
            if (lastParagraphClipped && lastToken.type === "paragraph") {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            lastParagraphClipped = cutSrc.length !== src.length;
            src = src.substring(token.raw.length);
            continue;
          }
          if (token = this.tokenizer.text(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === "text") {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (src) {
            const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        this.state.top = true;
        return tokens;
      }
      inline(src, tokens = []) {
        this.inlineQueue.push({ src, tokens });
        return tokens;
      }
      /**
       * Lexing/Compiling
       */
      inlineTokens(src, tokens = []) {
        let token, lastToken, cutSrc;
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;
        if (this.tokens.links) {
          const links = Object.keys(this.tokens.links);
          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        }
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
          this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
        }
        while (src) {
          if (!keepPrevChar) {
            prevChar = "";
          }
          keepPrevChar = false;
          if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
            if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              return true;
            }
            return false;
          })) {
            continue;
          }
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.tag(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === "text" && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === "text" && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.autolink(src, mangle)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startInline) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startInline.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === "number" && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
            src = src.substring(token.raw.length);
            if (token.raw.slice(-1) !== "_") {
              prevChar = token.raw.slice(-1);
            }
            keepPrevChar = true;
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (src) {
            const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        return tokens;
      }
    };
    Renderer = class {
      constructor(options3) {
        this.options = options3 || defaults;
      }
      code(code, infostring, escaped2) {
        const lang = (infostring || "").match(/\S*/)[0];
        if (this.options.highlight) {
          const out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped2 = true;
            code = out;
          }
        }
        code = code.replace(/\n$/, "") + "\n";
        if (!lang) {
          return "<pre><code>" + (escaped2 ? code : escape2(code, true)) + "</code></pre>\n";
        }
        return '<pre><code class="' + this.options.langPrefix + escape2(lang) + '">' + (escaped2 ? code : escape2(code, true)) + "</code></pre>\n";
      }
      /**
       * @param {string} quote
       */
      blockquote(quote) {
        return `<blockquote>
${quote}</blockquote>
`;
      }
      html(html) {
        return html;
      }
      /**
       * @param {string} text
       * @param {string} level
       * @param {string} raw
       * @param {any} slugger
       */
      heading(text2, level, raw, slugger) {
        if (this.options.headerIds) {
          const id = this.options.headerPrefix + slugger.slug(raw);
          return `<h${level} id="${id}">${text2}</h${level}>
`;
        }
        return `<h${level}>${text2}</h${level}>
`;
      }
      hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
      }
      list(body, ordered, start) {
        const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
        return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
      }
      /**
       * @param {string} text
       */
      listitem(text2) {
        return `<li>${text2}</li>
`;
      }
      checkbox(checked) {
        return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
      }
      /**
       * @param {string} text
       */
      paragraph(text2) {
        return `<p>${text2}</p>
`;
      }
      /**
       * @param {string} header
       * @param {string} body
       */
      table(header, body) {
        if (body)
          body = `<tbody>${body}</tbody>`;
        return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
      }
      /**
       * @param {string} content
       */
      tablerow(content) {
        return `<tr>
${content}</tr>
`;
      }
      tablecell(content, flags) {
        const type = flags.header ? "th" : "td";
        const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
        return tag + content + `</${type}>
`;
      }
      /**
       * span level renderer
       * @param {string} text
       */
      strong(text2) {
        return `<strong>${text2}</strong>`;
      }
      /**
       * @param {string} text
       */
      em(text2) {
        return `<em>${text2}</em>`;
      }
      /**
       * @param {string} text
       */
      codespan(text2) {
        return `<code>${text2}</code>`;
      }
      br() {
        return this.options.xhtml ? "<br/>" : "<br>";
      }
      /**
       * @param {string} text
       */
      del(text2) {
        return `<del>${text2}</del>`;
      }
      /**
       * @param {string} href
       * @param {string} title
       * @param {string} text
       */
      link(href, title, text2) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text2;
        }
        let out = '<a href="' + href + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ">" + text2 + "</a>";
        return out;
      }
      /**
       * @param {string} href
       * @param {string} title
       * @param {string} text
       */
      image(href, title, text2) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text2;
        }
        let out = `<img src="${href}" alt="${text2}"`;
        if (title) {
          out += ` title="${title}"`;
        }
        out += this.options.xhtml ? "/>" : ">";
        return out;
      }
      text(text2) {
        return text2;
      }
    };
    TextRenderer = class {
      // no need for block level renderers
      strong(text2) {
        return text2;
      }
      em(text2) {
        return text2;
      }
      codespan(text2) {
        return text2;
      }
      del(text2) {
        return text2;
      }
      html(text2) {
        return text2;
      }
      text(text2) {
        return text2;
      }
      link(href, title, text2) {
        return "" + text2;
      }
      image(href, title, text2) {
        return "" + text2;
      }
      br() {
        return "";
      }
    };
    Slugger = class {
      constructor() {
        this.seen = {};
      }
      /**
       * @param {string} value
       */
      serialize(value) {
        return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
      }
      /**
       * Finds the next safe (unique) slug to use
       * @param {string} originalSlug
       * @param {boolean} isDryRun
       */
      getNextSafeSlug(originalSlug, isDryRun) {
        let slug = originalSlug;
        let occurenceAccumulator = 0;
        if (this.seen.hasOwnProperty(slug)) {
          occurenceAccumulator = this.seen[originalSlug];
          do {
            occurenceAccumulator++;
            slug = originalSlug + "-" + occurenceAccumulator;
          } while (this.seen.hasOwnProperty(slug));
        }
        if (!isDryRun) {
          this.seen[originalSlug] = occurenceAccumulator;
          this.seen[slug] = 0;
        }
        return slug;
      }
      /**
       * Convert string to unique id
       * @param {object} [options]
       * @param {boolean} [options.dryrun] Generates the next unique slug without
       * updating the internal accumulator.
       */
      slug(value, options3 = {}) {
        const slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options3.dryrun);
      }
    };
    Parser = class {
      constructor(options3) {
        this.options = options3 || defaults;
        this.options.renderer = this.options.renderer || new Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new TextRenderer();
        this.slugger = new Slugger();
      }
      /**
       * Static Parse Method
       */
      static parse(tokens, options3) {
        const parser2 = new Parser(options3);
        return parser2.parse(tokens);
      }
      /**
       * Static Parse Inline Method
       */
      static parseInline(tokens, options3) {
        const parser2 = new Parser(options3);
        return parser2.parseInline(tokens);
      }
      /**
       * Parse Loop
       */
      parse(tokens, top = true) {
        let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
            if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
              out += ret || "";
              continue;
            }
          }
          switch (token.type) {
            case "space": {
              continue;
            }
            case "hr": {
              out += this.renderer.hr();
              continue;
            }
            case "heading": {
              out += this.renderer.heading(
                this.parseInline(token.tokens),
                token.depth,
                unescape(this.parseInline(token.tokens, this.textRenderer)),
                this.slugger
              );
              continue;
            }
            case "code": {
              out += this.renderer.code(
                token.text,
                token.lang,
                token.escaped
              );
              continue;
            }
            case "table": {
              header = "";
              cell = "";
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(
                  this.parseInline(token.header[j].tokens),
                  { header: true, align: token.align[j] }
                );
              }
              header += this.renderer.tablerow(cell);
              body = "";
              l2 = token.rows.length;
              for (j = 0; j < l2; j++) {
                row = token.rows[j];
                cell = "";
                l3 = row.length;
                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(
                    this.parseInline(row[k].tokens),
                    { header: false, align: token.align[k] }
                  );
                }
                body += this.renderer.tablerow(cell);
              }
              out += this.renderer.table(header, body);
              continue;
            }
            case "blockquote": {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }
            case "list": {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = "";
              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = "";
                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);
                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                      item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                        item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: "text",
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }
                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }
              out += this.renderer.list(body, ordered, start);
              continue;
            }
            case "html": {
              out += this.renderer.html(token.text);
              continue;
            }
            case "paragraph": {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }
            case "text": {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;
              while (i + 1 < l && tokens[i + 1].type === "text") {
                token = tokens[++i];
                body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }
              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
      /**
       * Parse Inline Tokens
       */
      parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = "", i, token, ret;
        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
            if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
              out += ret || "";
              continue;
            }
          }
          switch (token.type) {
            case "escape": {
              out += renderer.text(token.text);
              break;
            }
            case "html": {
              out += renderer.html(token.text);
              break;
            }
            case "link": {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }
            case "image": {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }
            case "strong": {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }
            case "em": {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }
            case "codespan": {
              out += renderer.codespan(token.text);
              break;
            }
            case "br": {
              out += renderer.br();
              break;
            }
            case "del": {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }
            case "text": {
              out += renderer.text(token.text);
              break;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
    };
    Hooks = class {
      constructor(options3) {
        this.options = options3 || defaults;
      }
      /**
       * Process markdown before marked
       */
      preprocess(markdown) {
        return markdown;
      }
      /**
       * Process HTML after marked is finished
       */
      postprocess(html) {
        return html;
      }
    };
    __publicField(Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
      "preprocess",
      "postprocess"
    ]));
    marked.options = marked.setOptions = function(opt) {
      marked.defaults = { ...marked.defaults, ...opt };
      changeDefaults(marked.defaults);
      return marked;
    };
    marked.getDefaults = getDefaults;
    marked.defaults = defaults;
    marked.use = function(...args) {
      const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = marked.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if (ext.renderer) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if (ext.tokenizer) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              if (extensions[ext.level]) {
                extensions[ext.level].unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if (ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = marked.defaults.renderer || new Renderer();
          for (const prop in pack.renderer) {
            const prevRenderer = renderer[prop];
            renderer[prop] = (...args2) => {
              let ret = pack.renderer[prop].apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret;
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = marked.defaults.tokenizer || new Tokenizer();
          for (const prop in pack.tokenizer) {
            const prevTokenizer = tokenizer[prop];
            tokenizer[prop] = (...args2) => {
              let ret = pack.tokenizer[prop].apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = marked.defaults.hooks || new Hooks();
          for (const prop in pack.hooks) {
            const prevHook = hooks[prop];
            if (Hooks.passThroughHooks.has(prop)) {
              hooks[prop] = (arg) => {
                if (marked.defaults.async) {
                  return Promise.resolve(pack.hooks[prop].call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = pack.hooks[prop].call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[prop] = (...args2) => {
                let ret = pack.hooks[prop].apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = marked.defaults.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(pack.walkTokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        marked.setOptions(opts);
      });
    };
    marked.walkTokens = function(tokens, callback) {
      let values = [];
      for (const token of tokens) {
        values = values.concat(callback.call(marked, token));
        switch (token.type) {
          case "table": {
            for (const cell of token.header) {
              values = values.concat(marked.walkTokens(cell.tokens, callback));
            }
            for (const row of token.rows) {
              for (const cell of row) {
                values = values.concat(marked.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            values = values.concat(marked.walkTokens(token.items, callback));
            break;
          }
          default: {
            if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
              marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
                values = values.concat(marked.walkTokens(token[childTokens], callback));
              });
            } else if (token.tokens) {
              values = values.concat(marked.walkTokens(token.tokens, callback));
            }
          }
        }
      }
      return values;
    };
    marked.parseInline = parseMarkdown(Lexer.lexInline, Parser.parseInline);
    marked.Parser = Parser;
    marked.parser = Parser.parse;
    marked.Renderer = Renderer;
    marked.TextRenderer = TextRenderer;
    marked.Lexer = Lexer;
    marked.lexer = Lexer.lex;
    marked.Tokenizer = Tokenizer;
    marked.Slugger = Slugger;
    marked.Hooks = Hooks;
    marked.parse = marked;
    options2 = marked.options;
    setOptions = marked.setOptions;
    use = marked.use;
    walkTokens = marked.walkTokens;
    parseInline = marked.parseInline;
    parser = Parser.parse;
    lexer = Lexer.lex;
  }
});

// node_modules/dompurify/dist/purify.js
var require_purify = __commonJS({
  "node_modules/dompurify/dist/purify.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.DOMPurify = factory());
    })(exports, function() {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
          return typeof obj2;
        } : function(obj2) {
          return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof(obj);
      }
      function _setPrototypeOf(o2, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
          o3.__proto__ = p2;
          return o3;
        };
        return _setPrototypeOf(o2, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e3) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a2 = [null];
            a2.push.apply(a2, args2);
            var Constructor = Function.bind.apply(Parent2, a2);
            var instance = new Constructor();
            if (Class2)
              _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
          return _arrayLikeToArray(arr);
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
          return Array.from(iter);
      }
      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _unsupportedIterableToArray(o2, minLen) {
        if (!o2)
          return;
        if (typeof o2 === "string")
          return _arrayLikeToArray(o2, minLen);
        var n2 = Object.prototype.toString.call(o2).slice(8, -1);
        if (n2 === "Object" && o2.constructor)
          n2 = o2.constructor.name;
        if (n2 === "Map" || n2 === "Set")
          return Array.from(o2);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
          return _arrayLikeToArray(o2, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++)
          arr2[i] = arr[i];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _createForOfIteratorHelper(o2, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
        if (!it) {
          if (Array.isArray(o2) || (it = _unsupportedIterableToArray(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
            if (it)
              o2 = it;
            var i = 0;
            var F = function() {
            };
            return {
              s: F,
              n: function() {
                if (i >= o2.length)
                  return {
                    done: true
                  };
                return {
                  done: false,
                  value: o2[i++]
                };
              },
              e: function(e3) {
                throw e3;
              },
              f: F
            };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
          s: function() {
            it = it.call(o2);
          },
          n: function() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function(e3) {
            didErr = true;
            err = e3;
          },
          f: function() {
            try {
              if (!normalCompletion && it.return != null)
                it.return();
            } finally {
              if (didErr)
                throw err;
            }
          }
        };
      }
      var entries = Object.entries, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var freeze = Object.freeze, seal = Object.seal, create = Object.create;
      var _ref = typeof Reflect !== "undefined" && Reflect, apply = _ref.apply, construct = _ref.construct;
      if (!apply) {
        apply = function apply2(fun, thisValue, args) {
          return fun.apply(thisValue, args);
        };
      }
      if (!freeze) {
        freeze = function freeze2(x) {
          return x;
        };
      }
      if (!seal) {
        seal = function seal2(x) {
          return x;
        };
      }
      if (!construct) {
        construct = function construct2(Func, args) {
          return _construct(Func, _toConsumableArray(args));
        };
      }
      var arrayForEach = unapply(Array.prototype.forEach);
      var arrayPop = unapply(Array.prototype.pop);
      var arrayPush = unapply(Array.prototype.push);
      var stringToLowerCase = unapply(String.prototype.toLowerCase);
      var stringToString = unapply(String.prototype.toString);
      var stringMatch = unapply(String.prototype.match);
      var stringReplace = unapply(String.prototype.replace);
      var stringIndexOf = unapply(String.prototype.indexOf);
      var stringTrim = unapply(String.prototype.trim);
      var regExpTest = unapply(RegExp.prototype.test);
      var typeErrorCreate = unconstruct(TypeError);
      function unapply(func) {
        return function(thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return apply(func, thisArg, args);
        };
      }
      function unconstruct(func) {
        return function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return construct(func, args);
        };
      }
      function addToSet(set, array2, transformCaseFunc) {
        transformCaseFunc = transformCaseFunc ? transformCaseFunc : stringToLowerCase;
        if (setPrototypeOf) {
          setPrototypeOf(set, null);
        }
        var l = array2.length;
        while (l--) {
          var element = array2[l];
          if (typeof element === "string") {
            var lcElement = transformCaseFunc(element);
            if (lcElement !== element) {
              if (!isFrozen(array2)) {
                array2[l] = lcElement;
              }
              element = lcElement;
            }
          }
          set[element] = true;
        }
        return set;
      }
      function clone(object) {
        var newObject = create(null);
        var _iterator = _createForOfIteratorHelper(entries(object)), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), property = _step$value[0], value = _step$value[1];
            newObject[property] = value;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return newObject;
      }
      function lookupGetter(object, prop) {
        while (object !== null) {
          var desc = getOwnPropertyDescriptor(object, prop);
          if (desc) {
            if (desc.get) {
              return unapply(desc.get);
            }
            if (typeof desc.value === "function") {
              return unapply(desc.value);
            }
          }
          object = getPrototypeOf(object);
        }
        function fallbackValue(element) {
          console.warn("fallback value for", element);
          return null;
        }
        return fallbackValue;
      }
      var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
      var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
      var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
      var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
      var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]);
      var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
      var text2 = freeze(["#text"]);
      var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
      var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
      var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
      var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
      var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
      var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
      var TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
      var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
      var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
      var IS_ALLOWED_URI = seal(
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
        // eslint-disable-line no-useless-escape
      );
      var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
      var ATTR_WHITESPACE = seal(
        /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
        // eslint-disable-line no-control-regex
      );
      var DOCTYPE_NAME = seal(/^html$/i);
      var getGlobal = function getGlobal2() {
        return typeof window === "undefined" ? null : window;
      };
      var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, document2) {
        if (_typeof(trustedTypes) !== "object" || typeof trustedTypes.createPolicy !== "function") {
          return null;
        }
        var suffix = null;
        var ATTR_NAME = "data-tt-policy-suffix";
        if (document2.currentScript && document2.currentScript.hasAttribute(ATTR_NAME)) {
          suffix = document2.currentScript.getAttribute(ATTR_NAME);
        }
        var policyName = "dompurify" + (suffix ? "#" + suffix : "");
        try {
          return trustedTypes.createPolicy(policyName, {
            createHTML: function createHTML(html2) {
              return html2;
            },
            createScriptURL: function createScriptURL(scriptUrl) {
              return scriptUrl;
            }
          });
        } catch (_) {
          console.warn("TrustedTypes policy " + policyName + " could not be created.");
          return null;
        }
      };
      function createDOMPurify() {
        var window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
        var DOMPurify = function DOMPurify2(root) {
          return createDOMPurify(root);
        };
        DOMPurify.version = "3.0.1";
        DOMPurify.removed = [];
        if (!window2 || !window2.document || window2.document.nodeType !== 9) {
          DOMPurify.isSupported = false;
          return DOMPurify;
        }
        var originalDocument = window2.document;
        var document2 = window2.document;
        var DocumentFragment = window2.DocumentFragment, HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap, HTMLFormElement = window2.HTMLFormElement, DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
        var ElementPrototype = Element.prototype;
        var cloneNode = lookupGetter(ElementPrototype, "cloneNode");
        var getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
        var getChildNodes = lookupGetter(ElementPrototype, "childNodes");
        var getParentNode = lookupGetter(ElementPrototype, "parentNode");
        if (typeof HTMLTemplateElement === "function") {
          var template = document2.createElement("template");
          if (template.content && template.content.ownerDocument) {
            document2 = template.content.ownerDocument;
          }
        }
        var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
        var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML("") : "";
        var _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
        var importNode = originalDocument.importNode;
        var hooks = {};
        DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && typeof implementation.createHTMLDocument !== "undefined";
        var MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
        var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
        var ALLOWED_TAGS = null;
        var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text2)));
        var ALLOWED_ATTR = null;
        var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
        var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
          tagNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          allowCustomizedBuiltInElements: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: false
          }
        }));
        var FORBID_TAGS = null;
        var FORBID_ATTR = null;
        var ALLOW_ARIA_ATTR = true;
        var ALLOW_DATA_ATTR = true;
        var ALLOW_UNKNOWN_PROTOCOLS = false;
        var ALLOW_SELF_CLOSE_IN_ATTR = true;
        var SAFE_FOR_TEMPLATES = false;
        var WHOLE_DOCUMENT = false;
        var SET_CONFIG = false;
        var FORCE_BODY = false;
        var RETURN_DOM = false;
        var RETURN_DOM_FRAGMENT = false;
        var RETURN_TRUSTED_TYPE = false;
        var SANITIZE_DOM = true;
        var SANITIZE_NAMED_PROPS = false;
        var SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
        var KEEP_CONTENT = true;
        var IN_PLACE = false;
        var USE_PROFILES = {};
        var FORBID_CONTENTS = null;
        var DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
        var DATA_URI_TAGS = null;
        var DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
        var URI_SAFE_ATTRIBUTES = null;
        var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
        var MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        var NAMESPACE = HTML_NAMESPACE;
        var IS_EMPTY_INPUT = false;
        var ALLOWED_NAMESPACES = null;
        var DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
        var PARSER_MEDIA_TYPE;
        var SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
        var DEFAULT_PARSER_MEDIA_TYPE = "text/html";
        var transformCaseFunc;
        var CONFIG = null;
        var formElement = document2.createElement("form");
        var isRegexOrFunction = function isRegexOrFunction2(testValue) {
          return testValue instanceof RegExp || testValue instanceof Function;
        };
        var _parseConfig = function _parseConfig2(cfg) {
          if (CONFIG && CONFIG === cfg) {
            return;
          }
          if (!cfg || _typeof(cfg) !== "object") {
            cfg = {};
          }
          cfg = clone(cfg);
          PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
          SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
          transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
          ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
          ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
          ALLOWED_NAMESPACES = "ALLOWED_NAMESPACES" in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
          URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(
            clone(DEFAULT_URI_SAFE_ATTRIBUTES),
            // eslint-disable-line indent
            cfg.ADD_URI_SAFE_ATTR,
            // eslint-disable-line indent
            transformCaseFunc
            // eslint-disable-line indent
          ) : DEFAULT_URI_SAFE_ATTRIBUTES;
          DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(
            clone(DEFAULT_DATA_URI_TAGS),
            // eslint-disable-line indent
            cfg.ADD_DATA_URI_TAGS,
            // eslint-disable-line indent
            transformCaseFunc
            // eslint-disable-line indent
          ) : DEFAULT_DATA_URI_TAGS;
          FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
          FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
          FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
          USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
          ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
          ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
          ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
          ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
          SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
          WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
          RETURN_DOM = cfg.RETURN_DOM || false;
          RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
          RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
          FORCE_BODY = cfg.FORCE_BODY || false;
          SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
          SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
          KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
          IN_PLACE = cfg.IN_PLACE || false;
          IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
          NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
          CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
            CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
          }
          if (SAFE_FOR_TEMPLATES) {
            ALLOW_DATA_ATTR = false;
          }
          if (RETURN_DOM_FRAGMENT) {
            RETURN_DOM = true;
          }
          if (USE_PROFILES) {
            ALLOWED_TAGS = addToSet({}, _toConsumableArray(text2));
            ALLOWED_ATTR = [];
            if (USE_PROFILES.html === true) {
              addToSet(ALLOWED_TAGS, html$1);
              addToSet(ALLOWED_ATTR, html);
            }
            if (USE_PROFILES.svg === true) {
              addToSet(ALLOWED_TAGS, svg$1);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.svgFilters === true) {
              addToSet(ALLOWED_TAGS, svgFilters);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.mathMl === true) {
              addToSet(ALLOWED_TAGS, mathMl$1);
              addToSet(ALLOWED_ATTR, mathMl);
              addToSet(ALLOWED_ATTR, xml);
            }
          }
          if (cfg.ADD_TAGS) {
            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
              ALLOWED_TAGS = clone(ALLOWED_TAGS);
            }
            addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
          }
          if (cfg.ADD_ATTR) {
            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
              ALLOWED_ATTR = clone(ALLOWED_ATTR);
            }
            addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
          }
          if (cfg.ADD_URI_SAFE_ATTR) {
            addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
          }
          if (cfg.FORBID_CONTENTS) {
            if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
              FORBID_CONTENTS = clone(FORBID_CONTENTS);
            }
            addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
          }
          if (KEEP_CONTENT) {
            ALLOWED_TAGS["#text"] = true;
          }
          if (WHOLE_DOCUMENT) {
            addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
          }
          if (ALLOWED_TAGS.table) {
            addToSet(ALLOWED_TAGS, ["tbody"]);
            delete FORBID_TAGS.tbody;
          }
          if (freeze) {
            freeze(cfg);
          }
          CONFIG = cfg;
        };
        var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
        var HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
        var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
        var ALL_SVG_TAGS = addToSet({}, svg$1);
        addToSet(ALL_SVG_TAGS, svgFilters);
        addToSet(ALL_SVG_TAGS, svgDisallowed);
        var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
        addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
        var _checkValidNamespace = function _checkValidNamespace2(element) {
          var parent = getParentNode(element);
          if (!parent || !parent.tagName) {
            parent = {
              namespaceURI: NAMESPACE,
              tagName: "template"
            };
          }
          var tagName = stringToLowerCase(element.tagName);
          var parentTagName = stringToLowerCase(parent.tagName);
          if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
            return false;
          }
          if (element.namespaceURI === SVG_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "svg";
            }
            if (parent.namespaceURI === MATHML_NAMESPACE) {
              return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
            }
            return Boolean(ALL_SVG_TAGS[tagName]);
          }
          if (element.namespaceURI === MATHML_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "math";
            }
            if (parent.namespaceURI === SVG_NAMESPACE) {
              return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
            }
            return Boolean(ALL_MATHML_TAGS[tagName]);
          }
          if (element.namespaceURI === HTML_NAMESPACE) {
            if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
            return true;
          }
          return false;
        };
        var _forceRemove = function _forceRemove2(node) {
          arrayPush(DOMPurify.removed, {
            element: node
          });
          try {
            node.parentNode.removeChild(node);
          } catch (_) {
            node.remove();
          }
        };
        var _removeAttribute = function _removeAttribute2(name, node) {
          try {
            arrayPush(DOMPurify.removed, {
              attribute: node.getAttributeNode(name),
              from: node
            });
          } catch (_) {
            arrayPush(DOMPurify.removed, {
              attribute: null,
              from: node
            });
          }
          node.removeAttribute(name);
          if (name === "is" && !ALLOWED_ATTR[name]) {
            if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
              try {
                _forceRemove(node);
              } catch (_) {
              }
            } else {
              try {
                node.setAttribute(name, "");
              } catch (_) {
              }
            }
          }
        };
        var _initDocument = function _initDocument2(dirty) {
          var doc;
          var leadingWhitespace;
          if (FORCE_BODY) {
            dirty = "<remove></remove>" + dirty;
          } else {
            var matches = stringMatch(dirty, /^[\r\n\t ]+/);
            leadingWhitespace = matches && matches[0];
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
          }
          var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
          if (NAMESPACE === HTML_NAMESPACE) {
            try {
              doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_) {
            }
          }
          if (!doc || !doc.documentElement) {
            doc = implementation.createDocument(NAMESPACE, "template", null);
            try {
              doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
            } catch (_) {
            }
          }
          var body = doc.body || doc.documentElement;
          if (dirty && leadingWhitespace) {
            body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
          }
          if (NAMESPACE === HTML_NAMESPACE) {
            return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
          }
          return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        var _createIterator = function _createIterator2(root) {
          return createNodeIterator.call(
            root.ownerDocument || root,
            root,
            // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT,
            null,
            false
          );
        };
        var _isClobbered = function _isClobbered2(elm) {
          return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
        };
        var _isNode = function _isNode2(object) {
          return _typeof(Node) === "object" ? object instanceof Node : object && _typeof(object) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
        };
        var _executeHook = function _executeHook2(entryPoint, currentNode, data) {
          if (!hooks[entryPoint]) {
            return;
          }
          arrayForEach(hooks[entryPoint], function(hook) {
            hook.call(DOMPurify, currentNode, data, CONFIG);
          });
        };
        var _sanitizeElements = function _sanitizeElements2(currentNode) {
          var content;
          _executeHook("beforeSanitizeElements", currentNode, null);
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          var tagName = transformCaseFunc(currentNode.nodeName);
          _executeHook("uponSanitizeElement", currentNode, {
            tagName,
            allowedTags: ALLOWED_TAGS
          });
          if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
            _forceRemove(currentNode);
            return true;
          }
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName))
                return false;
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName))
                return false;
            }
            if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
              var parentNode = getParentNode(currentNode) || currentNode.parentNode;
              var childNodes = getChildNodes(currentNode) || currentNode.childNodes;
              if (childNodes && parentNode) {
                var childCount = childNodes.length;
                for (var i = childCount - 1; i >= 0; --i) {
                  parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
                }
              }
            }
            _forceRemove(currentNode);
            return true;
          }
          if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if ((tagName === "noscript" || tagName === "noembed") && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
            content = currentNode.textContent;
            content = stringReplace(content, MUSTACHE_EXPR$1, " ");
            content = stringReplace(content, ERB_EXPR$1, " ");
            content = stringReplace(content, TMPLIT_EXPR$1, " ");
            if (currentNode.textContent !== content) {
              arrayPush(DOMPurify.removed, {
                element: currentNode.cloneNode()
              });
              currentNode.textContent = content;
            }
          }
          _executeHook("afterSanitizeElements", currentNode, null);
          return false;
        };
        var _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
          if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
            return false;
          }
          if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName))
            ;
          else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName))
            ;
          else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
            )
              ;
            else {
              return false;
            }
          } else if (URI_SAFE_ATTRIBUTES[lcName])
            ;
          else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
            ;
          else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
            ;
          else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
            ;
          else if (!value)
            ;
          else {
            return false;
          }
          return true;
        };
        var _basicCustomElementTest = function _basicCustomElementTest2(tagName) {
          return tagName.indexOf("-") > 0;
        };
        var _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
          var attr;
          var value;
          var lcName;
          var l;
          _executeHook("beforeSanitizeAttributes", currentNode, null);
          var attributes = currentNode.attributes;
          if (!attributes) {
            return;
          }
          var hookEvent = {
            attrName: "",
            attrValue: "",
            keepAttr: true,
            allowedAttributes: ALLOWED_ATTR
          };
          l = attributes.length;
          while (l--) {
            attr = attributes[l];
            var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
            value = name === "value" ? attr.value : stringTrim(attr.value);
            lcName = transformCaseFunc(name);
            hookEvent.attrName = lcName;
            hookEvent.attrValue = value;
            hookEvent.keepAttr = true;
            hookEvent.forceKeepAttr = void 0;
            _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
            value = hookEvent.attrValue;
            if (hookEvent.forceKeepAttr) {
              continue;
            }
            _removeAttribute(name, currentNode);
            if (!hookEvent.keepAttr) {
              continue;
            }
            if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (SAFE_FOR_TEMPLATES) {
              value = stringReplace(value, MUSTACHE_EXPR$1, " ");
              value = stringReplace(value, ERB_EXPR$1, " ");
              value = stringReplace(value, TMPLIT_EXPR$1, " ");
            }
            var lcTag = transformCaseFunc(currentNode.nodeName);
            if (!_isValidAttribute(lcTag, lcName, value)) {
              continue;
            }
            if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
              _removeAttribute(name, currentNode);
              value = SANITIZE_NAMED_PROPS_PREFIX + value;
            }
            if (trustedTypesPolicy && _typeof(trustedTypes) === "object" && typeof trustedTypes.getAttributeType === "function") {
              if (namespaceURI)
                ;
              else {
                switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                  case "TrustedHTML":
                    value = trustedTypesPolicy.createHTML(value);
                    break;
                  case "TrustedScriptURL":
                    value = trustedTypesPolicy.createScriptURL(value);
                    break;
                }
              }
            }
            try {
              if (namespaceURI) {
                currentNode.setAttributeNS(namespaceURI, name, value);
              } else {
                currentNode.setAttribute(name, value);
              }
              arrayPop(DOMPurify.removed);
            } catch (_) {
            }
          }
          _executeHook("afterSanitizeAttributes", currentNode, null);
        };
        var _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
          var shadowNode;
          var shadowIterator = _createIterator(fragment);
          _executeHook("beforeSanitizeShadowDOM", fragment, null);
          while (shadowNode = shadowIterator.nextNode()) {
            _executeHook("uponSanitizeShadowNode", shadowNode, null);
            if (_sanitizeElements(shadowNode)) {
              continue;
            }
            if (shadowNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM2(shadowNode.content);
            }
            _sanitizeAttributes(shadowNode);
          }
          _executeHook("afterSanitizeShadowDOM", fragment, null);
        };
        DOMPurify.sanitize = function(dirty) {
          var cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var body;
          var importedNode;
          var currentNode;
          var returnNode;
          IS_EMPTY_INPUT = !dirty;
          if (IS_EMPTY_INPUT) {
            dirty = "<!-->";
          }
          if (typeof dirty !== "string" && !_isNode(dirty)) {
            if (typeof dirty.toString !== "function") {
              throw typeErrorCreate("toString is not a function");
            } else {
              dirty = dirty.toString();
              if (typeof dirty !== "string") {
                throw typeErrorCreate("dirty is not a string, aborting");
              }
            }
          }
          if (!DOMPurify.isSupported) {
            return dirty;
          }
          if (!SET_CONFIG) {
            _parseConfig(cfg);
          }
          DOMPurify.removed = [];
          if (typeof dirty === "string") {
            IN_PLACE = false;
          }
          if (IN_PLACE) {
            if (dirty.nodeName) {
              var tagName = transformCaseFunc(dirty.nodeName);
              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
              }
            }
          } else if (dirty instanceof Node) {
            body = _initDocument("<!---->");
            importedNode = body.ownerDocument.importNode(dirty, true);
            if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
              body = importedNode;
            } else if (importedNode.nodeName === "HTML") {
              body = importedNode;
            } else {
              body.appendChild(importedNode);
            }
          } else {
            if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
            dirty.indexOf("<") === -1) {
              return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
            }
            body = _initDocument(dirty);
            if (!body) {
              return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
            }
          }
          if (body && FORCE_BODY) {
            _forceRemove(body.firstChild);
          }
          var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
          while (currentNode = nodeIterator.nextNode()) {
            if (_sanitizeElements(currentNode)) {
              continue;
            }
            if (currentNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM(currentNode.content);
            }
            _sanitizeAttributes(currentNode);
          }
          if (IN_PLACE) {
            return dirty;
          }
          if (RETURN_DOM) {
            if (RETURN_DOM_FRAGMENT) {
              returnNode = createDocumentFragment.call(body.ownerDocument);
              while (body.firstChild) {
                returnNode.appendChild(body.firstChild);
              }
            } else {
              returnNode = body;
            }
            if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmod) {
              returnNode = importNode.call(originalDocument, returnNode, true);
            }
            return returnNode;
          }
          var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
          if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
            serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
          }
          if (SAFE_FOR_TEMPLATES) {
            serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, " ");
            serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, " ");
            serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR$1, " ");
          }
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function(cfg) {
          _parseConfig(cfg);
          SET_CONFIG = true;
        };
        DOMPurify.clearConfig = function() {
          CONFIG = null;
          SET_CONFIG = false;
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
          if (!CONFIG) {
            _parseConfig({});
          }
          var lcTag = transformCaseFunc(tag);
          var lcName = transformCaseFunc(attr);
          return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
          if (typeof hookFunction !== "function") {
            return;
          }
          hooks[entryPoint] = hooks[entryPoint] || [];
          arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint) {
          if (hooks[entryPoint]) {
            return arrayPop(hooks[entryPoint]);
          }
        };
        DOMPurify.removeHooks = function(entryPoint) {
          if (hooks[entryPoint]) {
            hooks[entryPoint] = [];
          }
        };
        DOMPurify.removeAllHooks = function() {
          hooks = {};
        };
        return DOMPurify;
      }
      var purify = createDOMPurify();
      return purify;
    });
  }
});

// node_modules/isomorphic-dompurify/browser.js
var require_browser = __commonJS({
  "node_modules/isomorphic-dompurify/browser.js"(exports, module) {
    module.exports = window.DOMPurify || (window.DOMPurify = require_purify().default || require_purify());
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var import_isomorphic_dompurify, ButtonLink, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_index3();
    init_anime_es();
    init_marked_esm();
    import_isomorphic_dompurify = __toESM(require_browser(), 1);
    ButtonLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { clickEvent = void 0 } = $$props;
      if ($$props.clickEvent === void 0 && $$bindings.clickEvent && clickEvent !== void 0)
        $$bindings.clickEvent(clickEvent);
      return `<button class="text-new-white p-2 bg-dph-orange rounded-md font-bold text-md md:text-lg lg:text-xl font-brand hover:scale-110 transition-all active:brightness-75">${slots.default ? slots.default({}) : ``}</button>`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let rand = Math.floor(Math.random() * 1e7);
      let formattedRand = Intl.NumberFormat("en", { notation: "compact" }).format(rand);
      return `${$$result.head += `<!-- HEAD_svelte-1o42pse_START -->${$$result.title = `<title>Datapack Hub</title>`, ""}<meta name="description" content="DatapackHub is a website designed for publishing datapacks"><!-- HEAD_svelte-1o42pse_END -->`, ""}



<main class="dark:bg-stone-900 bg-new-white transition-all"><div class="flex md:flex-row flex-col justify-start items-center w-screen overflow-visible px-0 sm:px-8 md:px-16 lg:px-24 h-[66.666vh]"><div class="md:w-3/5 lg:w-2/5 w-2/3 mt-16 md:mt-0"><div class="${"relative w-full h-[4.5rem] mb-4 md:mb-0 lg:h-28 xl:h-36 " + escape("invisible", true)}"><h1 id="indexText1" class="split-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"><span class="letters text-dph-orange inline-block">Explore</span></h1>
        <h1 id="indexText2" class="split-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"><span class="letters text-dph-orange inline-block">Create</span></h1>
        <h1 id="indexText3" class="split-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"><span class="letters text-dph-orange inline-block">Play</span></h1></div>
      <h2 class="dark:text-new-white text-black text-xl sm:text-xl md:text-2xl xl:text-3xl md:text-left text-center w-full md:w-auto">Over <span${add_attribute("title", rand.toString(), 0)} class="font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br">${escape(formattedRand)}</span>
        of the latest and best datapacks from creators across the globe
      </h2>
      <div class="flex justify-evenly md:justify-start w-full items-center mt-8 md:mt-16">${validate_component(ButtonLink, "ButtonPrimary").$$render($$result, {}, {}, {
        default: () => {
          return `Play Now`;
        }
      })}
        ${``}
        ${validate_component(ButtonLink, "ButtonPrimary").$$render($$result, {}, {}, {
        default: () => {
          return `Discover`;
        }
      })}</div></div>
    ${``}
    <div class="w-4/5 my-8 sm:my-16 md:mt-0 md:w-2/5 dark:bg-stone-800 bg-dark-white h-full md:h-2/3 rounded-xl"><h2>Content here</h2></div></div>
  <div class="dark:bg-stone-800 bg-dark-white h-[33.333vh] w-screen"><h2>Content here</h2></div></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  file: () => file3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component3, file3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    file3 = "_app/immutable/entry/_page.svelte.da9e69a3.js";
    imports3 = ["_app/immutable/entry/_page.svelte.da9e69a3.js", "_app/immutable/chunks/index.1bfeb56d.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/moderation/console/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/moderation/console/_page.svelte.js"() {
    init_index3();
    init_globals();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $userData, $$unsubscribe_userData;
      let $isAuthenticated, $$unsubscribe_isAuthenticated;
      $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
      $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
      let cmdInput;
      let cmd = "";
      $$unsubscribe_userData();
      $$unsubscribe_isAuthenticated();
      return `${$$result.head += `<!-- HEAD_svelte-a63k1c_START -->${$$result.title = `<title>Datapack Hub Console</title>`, ""}<!-- HEAD_svelte-a63k1c_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-4">${$userData.role != "default" && $isAuthenticated == true ? `${`<div class="flex-col md:items-start w-full h-screen md:pt-20 pt-10 text-lime-400 font-console"><div id="big" class="overflow-y-scroll" style="height: 92%;"><span class="font-bold text-lg">Datapack Hub Console</span><br>
          <span class="font-normal text-lg">Welcome!</span>
          <ul class="list-none" id="cons"></ul></div>
        <div class="bottom-0 right-0 absolute bg-black p-3 w-full flex justify-around"><p class="float-left">/</p>
          <form action="get" class="w-full outline-none border-0 ml-1 bg-black"><input id="inpt" class="w-full bg-black border-none"${add_attribute("value", cmd, 0)}${add_attribute("this", cmdInput, 0)}></form></div></div>`}` : ``}</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  file: () => file4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component4, file4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    file4 = "_app/immutable/entry/moderation-console-page.svelte.9ad22ae1.js";
    imports4 = ["_app/immutable/entry/moderation-console-page.svelte.9ad22ae1.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/globals.39000825.js", "_app/immutable/chunks/index.1f9e5d30.js", "_app/immutable/chunks/navigation.77c8ff8f.js", "_app/immutable/chunks/singletons.a51fab03.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/project/_slug_/_page.ts.js
var page_ts_exports = {};
__export(page_ts_exports, {
  load: () => load
});
var load;
var init_page_ts = __esm({
  ".svelte-kit/output/server/entries/pages/project/_slug_/_page.ts.js"() {
    init_globals();
    load = async ({ params }) => {
      const projectReq = await fetch(apiURL + "/projects/get/" + params.slug);
      if (projectReq.ok) {
        return {
          project: await projectReq.json()
        };
      }
      return {};
    };
  }
});

// .svelte-kit/output/server/entries/pages/project/_slug_/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/project/_slug_/_page.svelte.js"() {
    init_index3();
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let visible = false;
      let author = "Loading...";
      (async () => {
        visible = true;
      })();
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-1p1nz4t_START -->${$$result.title = `<title>${escape(data.project?.title)} | Datapack Hub</title>`, ""}<!-- HEAD_svelte-1p1nz4t_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-0 sm:px-8 md:px-16 lg:px-24 h-screen"><div class="pt-16"></div>
  <div class="flex w-full dark:bg-new-white bg-dark-white dark:bg-opacity-10 p-4 rounded-xl mt-12"><img${add_attribute("src", data.project?.icon, 0)} alt="${"Icon for " + escape(data.project?.title, true)}" class="rounded-lg mr-6 w-24 h-24">
    <div><h1 class="dark:text-white text-5xl font-brand font-black">${escape(data.project?.title)}</h1>
      ${visible ? `<h2 class="dark:text-white text-xl mt-4 transition-all font-brand font-bold">${escape(author)}</h2>` : ``}
      <h2 class="dark:text-white text-md transition-all font-brand">${escape(data.project?.description)}</h2></div></div>
  <div class="dark:bg-new-white bg-dark-white dark:bg-opacity-10 p-4 rounded-xl mt-8"><p class="dark:text-white text-lg font-brand font-light">${escape(data.project?.body)}</p></div></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  file: () => file5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5,
  universal: () => page_ts_exports,
  universal_id: () => universal_id
});
var index5, component5, file5, universal_id, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_page_ts();
    index5 = 4;
    component5 = async () => (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    file5 = "_app/immutable/entry/project-_slug_-page.svelte.7744f3d4.js";
    universal_id = "src/routes/project/[slug]/+page.ts";
    imports5 = ["_app/immutable/entry/project-_slug_-page.svelte.7744f3d4.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/globals.39000825.js", "_app/immutable/chunks/index.1f9e5d30.js", "_app/immutable/chunks/index.b9de2425.js", "_app/immutable/entry/project-_slug_-page.ts.a90e42b0.js", "_app/immutable/chunks/globals.39000825.js", "_app/immutable/chunks/index.1f9e5d30.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/_page.20a9fa3e.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/projects/_page.ts.js
var page_ts_exports2 = {};
__export(page_ts_exports2, {
  load: () => load2
});
var load2;
var init_page_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/projects/_page.ts.js"() {
    load2 = async ({ fetch: fetch2, url }) => {
      const proj = await fetch2(`https://api.datapackhub.net/projects/`);
      if (proj.ok) {
        const data = (await proj.json()).result;
        return {
          projects: data,
          sortMode: url.searchParams.has("sort") ? url.searchParams.get("sort") : "trending"
        };
      }
      return {};
    };
  }
});

// .svelte-kit/output/server/chunks/ProjectComponent.js
var ProjectComponent;
var init_ProjectComponent = __esm({
  ".svelte-kit/output/server/chunks/ProjectComponent.js"() {
    init_index3();
    ProjectComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { project } = $$props;
      let author = "Loading...";
      let visible = false;
      (async () => {
        visible = true;
      })();
      if ($$props.project === void 0 && $$bindings.project && project !== void 0)
        $$bindings.project(project);
      return `<div class="dark:bg-stone-800 bg-dark-white dark:text-white flex items-center rounded-xl my-1 w-full p-2"><a href="${"/project/" + escape(project.url, true)}" class=""><img${add_attribute("src", project.icon, 0)} alt="${escape(project.title, true) + " icon"}" class="aspect-square bg-cover rounded-lg w-24"></a>
    <div class="w-2/3 ml-4"><a href="${"/project/" + escape(project.url, true)}" class="font-brand text-lg md:text-xl lg:text-2xl hover:underline">${escape(project.title)}</a>
      ${visible ? `<a href="${"/user/" + escape(author.toLowerCase(), true)}" class="text-xs md:text-sm text-white text-opacity-40 hover:underline">By ${escape(author)}</a>` : ``}
      <p class="mt-2 text-sm md:text-base font-medium two-lines text-opacity-70 text-white">${escape(project.description)}</p></div></div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/projects/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/projects/_page.svelte.js"() {
    init_index3();
    init_ProjectComponent();
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<main class="dark:bg-stone-900 bg-new-white transition-all px-8 md:px-16 lg:px-24"><div class="items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-16 overflow-auto"><h1 class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2">Browse Datapacks
      </h1>
      <br>
      <div class="flex items-center md-5"><p class="dark:text-white font-bold">Sort:</p>
        <a href="?sort=updated" class="${"btn-sm-start " + escape(
        data.sortMode == "updated" ? "bg-orange-500" : "bg-opacity-0 text-orange-500 bg-orange-500 hover:bg-opacity-20 transition-all",
        true
      )}">Updated</a>
        <a href="?sort=trending" class="${"btn-sm-start " + escape(
        data.sortMode == "trending" ? "bg-orange-500" : "bg-opacity-0 text-orange-500 bg-orange-500 hover:bg-opacity-20 transition-all",
        true
      )}">Trending</a></div>
      <div class="border-b-[1px] border-stone-700 mt-4"></div>
      <div class="flex flex-col items-center w-full mt-4">${data.projects ? `${each(data.projects, (project) => {
        return `${validate_component(ProjectComponent, "ProjectComponent").$$render($$result, { project }, {}, {})}`;
      })}` : ``}</div></div></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  file: () => file6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6,
  universal: () => page_ts_exports2,
  universal_id: () => universal_id2
});
var index6, component6, file6, universal_id2, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_page_ts2();
    index6 = 5;
    component6 = async () => (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    file6 = "_app/immutable/entry/projects-page.svelte.73deb575.js";
    universal_id2 = "src/routes/projects/+page.ts";
    imports6 = ["_app/immutable/entry/projects-page.svelte.73deb575.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/ProjectComponent.32957997.js", "_app/immutable/chunks/globals.39000825.js", "_app/immutable/chunks/index.1f9e5d30.js", "_app/immutable/chunks/index.b9de2425.js", "_app/immutable/entry/projects-page.ts.5726fbcb.js", "_app/immutable/chunks/_page.70ecbea5.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/user/_slug_/_page.ts.js
var page_ts_exports3 = {};
__export(page_ts_exports3, {
  load: () => load3
});
var load3;
var init_page_ts3 = __esm({
  ".svelte-kit/output/server/entries/pages/user/_slug_/_page.ts.js"() {
    init_chunks();
    load3 = async ({ params, fetch: fetch2 }) => {
      const [user, projects] = await Promise.all([
        fetch2(`https://api.datapackhub.net/user/${params.slug}`),
        fetch2(`https://api.datapackhub.net/user/${params.slug}/projects`)
      ]);
      if (user.status == 404) {
        throw error(404, {
          message: "User not found",
          description: "You may have hallucinated their existence"
        });
      }
      if (user.ok && projects.ok) {
        const profileJson = await user.json();
        const projectJson = (await projects.json()).result;
        return {
          profile: profileJson,
          projects: projectJson
        };
      }
      return {};
    };
  }
});

// .svelte-kit/output/server/entries/pages/user/_slug_/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
function titleCase(str) {
  if (str == void 0)
    return "null";
  return str.toLowerCase().split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}
var css2, ProfileCard, Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/user/_slug_/_page.svelte.js"() {
    init_index3();
    init_globals();
    init_ProjectComponent();
    css2 = {
      code: ".admin-outline.svelte-1yjb8pi{outline-color:#ef4444\n}.admin-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.moderator-outline.svelte-1yjb8pi{outline-color:#f97316\n}.moderator-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}.developer-outline.svelte-1yjb8pi{outline-color:#84cc16\n}.developer-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(132 204 22 / var(--tw-text-opacity))\n}.helper-outline.svelte-1yjb8pi{outline-color:#3b82f6\n}.helper-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.nerd-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}.nerd-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}",
      map: null
    };
    ProfileCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $isAuthenticated, $$unsubscribe_isAuthenticated;
      let $userData, $$unsubscribe_userData;
      $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
      $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
      let { profileData } = $$props;
      if ($$props.profileData === void 0 && $$bindings.profileData && profileData !== void 0)
        $$bindings.profileData(profileData);
      $$result.css.add(css2);
      $$unsubscribe_isAuthenticated();
      $$unsubscribe_userData();
      return `<div class="flex flex-col items-center md:items-start"><div class="self-center"><img${add_attribute("src", profileData?.profile_icon, 0)} alt="${escape(profileData?.username, true) + "'s profile picture"}" height="128" width="128" class="${"md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full outline outline-2 " + escape(profileData?.role, true) + "-outline outline-offset-4 svelte-1yjb8pi"}"></div>

  <p class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-4">${escape(profileData?.username)}</p>

  <p class="dark:text-white sm:text-base md:text-lg font-brand font-semibold mt-4">${profileData?.role != "default" ? `<span class="${escape(profileData?.role, true) + "-text svelte-1yjb8pi"}">${profileData?.role != "nerd" ? `\u2B24` : `\u{1F913}`}
        ${escape(titleCase(profileData?.role))}</span>` : ``}</p>
  <p class="whitespace-pre-line dark:bg-stone-700 dark:bg-opacity-40 bg-opacity-40 bg-white mb-2 rounded-xl p-2 dark:text-white text-lg mt-4 font-brand font-light">${escape(profileData?.bio.replaceAll("\\n", "\n"))}</p>
  ${$isAuthenticated && $userData.id === profileData?.id ? `<a href="edit" class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2"><img src="/icons/settings.svg" alt="settings" width="24" height="24" class="float-left invert mr-2 max-w-sm stroke-red-400">
      Profile Settings
    </a>` : ``}
</div>`;
    });
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-1u8gvp1_START -->${$$result.title = `<title>${escape(data.profile?.username)} | Datapack Hub</title>`, ""}<!-- HEAD_svelte-1u8gvp1_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-8 md:px-16 lg:px-24"><div class="flex flex-col items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-32">${validate_component(ProfileCard, "ProfileCard").$$render($$result, { profileData: data.profile }, {}, {})}
    <div class="w-full mx-24 h-full overflow-y-auto mt-16 md:mt-0 styled-scrollbar">${data.projects?.length == 0 ? `<p class="dark:text-white text-opacity-40 text-3xl text-center mt-48">No projects!
        </p>` : `${each(data.projects ?? [], (project) => {
        return `${validate_component(ProjectComponent, "ProjectComponent").$$render($$result, { project }, {}, {})}`;
      })}`}</div></div></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  file: () => file7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7,
  universal: () => page_ts_exports3,
  universal_id: () => universal_id3
});
var index7, component7, file7, universal_id3, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_page_ts3();
    index7 = 6;
    component7 = async () => (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default;
    file7 = "_app/immutable/entry/user-_slug_-page.svelte.512043b0.js";
    universal_id3 = "src/routes/user/[slug]/+page.ts";
    imports7 = ["_app/immutable/entry/user-_slug_-page.svelte.512043b0.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/globals.39000825.js", "_app/immutable/chunks/index.1f9e5d30.js", "_app/immutable/chunks/ProjectComponent.32957997.js", "_app/immutable/chunks/index.b9de2425.js", "_app/immutable/entry/user-_slug_-page.ts.d12dd503.js", "_app/immutable/chunks/_page.a41d5380.js", "_app/immutable/chunks/control.e7f5239e.js"];
    stylesheets7 = ["_app/immutable/assets/_page.d1a6c4ed.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/user/edit/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var css3, Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/user/edit/_page.svelte.js"() {
    init_index3();
    init_globals();
    css3 = {
      code: ".admin-outline.svelte-1ie1bbt{outline-color:#ef4444\n}.admin-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.moderator-outline.svelte-1ie1bbt{outline-color:#f97316\n}.moderator-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}.developer-outline.svelte-1ie1bbt{outline-color:#84cc16\n}.developer-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(132 204 22 / var(--tw-text-opacity))\n}.helper-outline.svelte-1ie1bbt{outline-color:#3b82f6\n}.helper-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.default-outline.svelte-1ie1bbt{outline-color:#eab308\n}.default-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}",
      map: null
    };
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $userData, $$unsubscribe_userData;
      $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
      $$result.css.add(css3);
      $$unsubscribe_userData();
      return `${$$result.head += `<!-- HEAD_svelte-10ozo3h_START -->${$$result.title = `<title>Profile Settings | Datapack Hub</title>`, ""}<!-- HEAD_svelte-10ozo3h_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64"><div class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"><h1 class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-10">Profile Settings for <span class="${escape($userData.role, true) + "-text svelte-1ie1bbt"}">${escape($userData.username)}</span></h1>
    <div class="align-middle text-center md:text-start"><p class="align-middle dark:text-new-white font-brand">Username</p>
      <input class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-10 text-lg p-2 font-brand"${add_attribute("value", $userData.username, 0)}>
      <br><br>
      <p class="align-middle dark:text-new-white font-brand">Bio</p>
      <textarea class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-40 w-80 text-lg p-2 font-brand resize-none">${escape($userData.bio.replaceAll("\\n", "\n"), false)}</textarea>
      <br><br>
      <a href="${escape($userData.username, true) + "/edit/"}" class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 md:py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2">Save Changes
      </a></div></div>
</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  file: () => file8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component8, file8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default;
    file8 = "_app/immutable/entry/user-edit-page.svelte.5369b76f.js";
    imports8 = ["_app/immutable/entry/user-edit-page.svelte.5369b76f.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/globals.39000825.js", "_app/immutable/chunks/index.1f9e5d30.js"];
    stylesheets8 = ["_app/immutable/assets/_page.fa30a377.css"];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_index3();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `


${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="utf-8" />\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap" rel="stylesheet">\n  <link href="https://fonts.googleapis.com/css2?family=Lexend+Exa&family=Lexend:wght@300;400;500;600;700&family=Roboto+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n  <link rel="manifest" href="/site.webmanifest">\n  <meta name="viewport" content="width=device-width" />\n  ' + head + '\n</head>\n\n<body data-sveltekit-preload-data="hover">\n  <div style="display: contents">' + body + "</div>\n</body>\n\n</html>\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "5g95n7"
};
function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_chunks();

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\u0000",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function stringify_string(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code <= 31) {
      result += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a2, b) => b[1] - a2[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index10 = p++;
    indexes.set(thing, index10);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index10] = `["${key2}",${flatten(value2)}]`;
        return index10;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index10] = str;
    return index10;
  }
  const index9 = flatten(value);
  if (index9 < 0)
    return `${index9}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_index2();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a2, b) => {
    if (a2.q !== b.q) {
      return b.q - a2.q;
    }
    if (a2.subtype === "*" !== (b.subtype === "*")) {
      return a2.subtype === "*" ? 1 : -1;
    }
    if (a2.type === "*" !== (b.type === "*")) {
      return a2.type === "*" ? 1 : -1;
    }
    return a2.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {Redirect | HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = [];
  for (const method in ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    if (method in mod)
      allowed.push(method);
  }
  if (mod.GET || mod.HEAD)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options22, status, message) {
  let page2 = options22.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options22, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options22, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options22, status, body.message);
}
async function handle_error_and_jsonify(event, options22, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options22.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push(`"parent":1`);
  if (node.uses?.route)
    uses.push(`"route":1`);
  if (node.uses?.url)
    uses.push(`"url":1`);
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method];
  if (!handler && method === "HEAD") {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await handler(
      /** @type {import('types').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return new Response(void 0, {
        status: e3.status,
        headers: { location: e3.location }
      });
    }
    throw e3;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE" || method === "OPTIONS") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options22, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options22, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return action_json({
        type: "redirect",
        status: err.status,
        location: err.location
      });
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options22, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error(`Cannot "throw fail()". Use "return fail()"`) : error2;
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      `When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e3) {
    const error2 = (
      /** @type {any} */
      e3
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      uses.dependencies.add(url2.href);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: init2?.headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let vary = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    if (key2 === "age")
      age = value;
    if (key2 === "vary")
      vary = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !vary) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a2;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a2 = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a2 >>> 7 ^ a2 >>> 18 ^ a2 >>> 3 ^ a2 << 25 ^ a2 << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a2 = bytes[i + 0];
    const b = bytes[i + 1];
    const c2 = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c2;
    bytes[i + 2] = b;
    bytes[i + 3] = a2;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${sha256(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.#nonce}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${sha256(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.#nonce}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r2) => {
    fulfil = f;
    reject = r2;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  let deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options22,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options22.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options22.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = /* @__PURE__ */ new Set([...client.start.imports, ...client.app.imports]);
  const stylesheets9 = new Set(client.app.stylesheets);
  const fonts9 = new Set(client.app.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/");
    if (segments.length === 1 && base !== "") {
      base$1 = `./${base.split("/").at(-1)}`;
      base_expression = `new URL(${s(base$1)}, location).pathname`;
    } else {
      base$1 = segments.slice(2).map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    }
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options22.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets9.add(url);
      for (const url of node.fonts)
        fonts9.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options22.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets9) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts9) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options22.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options22,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options22.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      `env: ${s(public_env)}`,
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `element: document.currentScript.parentElement`
    ].filter(Boolean);
    if (chunks) {
      blocks.push(`const deferred = new Map();`);
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = [`app`, `${global}.element`];
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options22.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start.file))}),
						import(${s(prefixed(client.app.file))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options22.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options22.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options22, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options22, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e3) {
            error2 = await handle_error_and_jsonify(
              event,
              options22,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {any} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options22,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options22,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options22, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return redirect_response(e3.status, e3.location);
    }
    return static_error_page(
      options22,
      e3 instanceof HttpError ? e3.status : 500,
      (await handle_error_and_jsonify(event, options22, e3)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var encoder2 = new TextEncoder();
async function render_data(event, route, options22, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n2, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n2 == void 0 ? n2 : await manifest2._.nodes[n2]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e3) {
          aborted = true;
          throw e3;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options22, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options22, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e3) {
    const error2 = normalize_error(e3);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options22, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options22, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e3) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options22,
              /** @type {any} */
              e3
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e3) {
              const error2 = await handle_error_and_jsonify(
                event,
                options22,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options22, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options22, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n2) => n2 == void 0 ? n2 : manifest2._.nodes[n2]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options22,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e3) {
          const err = normalize_error(e3);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options22, err);
          while (i--) {
            if (page2.errors[i]) {
              const index9 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index9]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options22,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options22, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options22,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options22,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e3) {
    return await respond_with_error({
      event,
      options: options22,
      manifest: manifest2,
      state,
      status: 500,
      error: e3,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    const value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      result[param.name] = values.slice(i - buffered, i + 1).filter((s22) => s22).join("/");
      buffered = 0;
      continue;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults2 = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('types').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c2 = new_cookies[name];
      if (c2 && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
        return c2.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c2 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          cookies2[c2.name] = c2.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      let path = opts.path ?? default_path;
      new_cookies[name] = {
        name,
        value,
        options: {
          ...defaults2,
          ...opts,
          path
        }
      };
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...defaults2,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  return { cookies, new_cookies, get_cookie_header };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options22 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options22));
  }
}
function create_fetch({ event, options: options22, manifest: manifest2, state, get_cookie_header }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    const request_body = init2?.body;
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options22.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        let response;
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file9 = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file9), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (request_body && typeof request_body !== "string" && !ArrayBuffer.isView(request_body)) {
          throw new Error("Request body must be a string or TypedArray");
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        response = await respond(request, options22, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            event.cookies.set(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  const set = new Set(expected);
  function validate(module, file9) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || set.has(key2))
        continue;
      const hint = hint_for_supported_files(key2, file9?.slice(file9.lastIndexOf("."))) ?? `valid exports are ${expected.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file9 ? ` in ${file9}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  let supported_files = [];
  if (valid_common_exports.includes(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_page_server_exports.includes(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.includes(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.join(` or `)}`;
  }
}
var valid_common_exports = ["load", "prerender", "csr", "ssr", "trailingSlash", "config"];
var valid_page_server_exports = [
  "load",
  "prerender",
  "csr",
  "ssr",
  "actions",
  "trailingSlash",
  "config"
];
var valid_server_exports = [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "prerender",
  "trailingSlash",
  "config"
];
var validate_common_exports = validator(valid_common_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
async function respond(request, options22, manifest2, state) {
  let url = new URL(request.url);
  if (options22.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("_").map(Boolean);
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route && !is_data_request) {
      if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n2) => n2 == void 0 ? n2 : manifest2._.nodes[n2]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
      if (normalized !== url.pathname && !state.prerendering?.fallback) {
        return new Response(void 0, {
          status: 308,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (
              // ensure paths starting with '//' are not treated as protocol-relative
              (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
            )
          }
        });
      }
    }
    const { cookies, new_cookies, get_cookie_header } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({ event, options: options22, manifest: manifest2, state, get_cookie_header });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options22.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e3) : redirect_response(e3.status, e3.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options22, e3);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options22,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options22,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(event2, route.page, options22, manifest2, state, resolve_opts);
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options22,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e3) {
      return await handle_fatal_error(event2, options22, e3);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('types').SSRManifest} */
  #manifest;
  /** @param {import('types').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    const entries = Object.entries(env);
    const prefix = this.#options.env_public_prefix;
    Object.fromEntries(entries.filter(([k]) => !k.startsWith(prefix)));
    const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith(prefix)));
    set_public_env(pub);
    if (!this.#options.hooks) {
      const module = await get_hooks();
      this.#options.hooks = {
        handle: module.handle || (({ event, resolve }) => resolve(event)),
        // @ts-expect-error
        handleError: module.handleError || (({ error: error2 }) => console.error(error2?.stack)),
        handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
      };
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options22) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, this.#options, this.#manifest, {
      ...options22,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/cloudflare-tmp/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["android-chrome-192x192.png", "android-chrome-512x512.png", "apple-touch-icon.png", "favicon-16x16.png", "favicon-32x32.png", "favicon.ico", "icons/bell.svg", "icons/moderation.svg", "icons/settings.svg", "logos/dph.png", "logos/dph.svg", "site.webmanifest"]),
  mimeTypes: { ".png": "image/png", ".ico": "image/vnd.microsoft.icon", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json" },
  _: {
    client: { "start": { "file": "_app/immutable/entry/start.cfafc502.js", "imports": ["_app/immutable/entry/start.cfafc502.js", "_app/immutable/chunks/index.1bfeb56d.js", "_app/immutable/chunks/singletons.a51fab03.js", "_app/immutable/chunks/index.1f9e5d30.js", "_app/immutable/chunks/control.e7f5239e.js"], "stylesheets": [], "fonts": [] }, "app": { "file": "_app/immutable/entry/app.b6866a93.js", "imports": ["_app/immutable/entry/app.b6866a93.js", "_app/immutable/chunks/index.1bfeb56d.js"], "stylesheets": [], "fonts": [] } },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8))
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      },
      {
        id: "/moderation/console",
        pattern: /^\/moderation\/console\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "/projects",
        pattern: /^\/projects\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 5 },
        endpoint: null
      },
      {
        id: "/project/[slug]",
        pattern: /^\/project\/([^/]+?)\/?$/,
        params: [{ "name": "slug", "optional": false, "rest": false, "chained": false }],
        page: { layouts: [0], errors: [1], leaf: 4 },
        endpoint: null
      },
      {
        id: "/user/edit",
        pattern: /^\/user\/edit\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 7 },
        endpoint: null
      },
      {
        id: "/user/[slug]",
        pattern: /^\/user\/([^/]+?)\/?$/,
        params: [{ "name": "slug", "optional": false, "rest": false, "chained": false }],
        page: { layouts: [0], errors: [1], leaf: 6 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
var prerendered = /* @__PURE__ */ new Set([]);

// .svelte-kit/cloudflare-tmp/_worker.js
async function e(e3, t2) {
  let n2 = "string" != typeof t2 && "HEAD" === t2.method;
  n2 && (t2 = new Request(t2, { method: "GET" }));
  let a2 = await e3.match(t2);
  return n2 && a2 && (a2 = new Response(null, a2)), a2;
}
function t(e3, t2, n2, o2) {
  return ("string" == typeof t2 || "GET" === t2.method) && a(n2) && (n2.headers.has("Set-Cookie") && (n2 = new Response(n2.body, n2)).headers.append("Cache-Control", "private=Set-Cookie"), o2.waitUntil(e3.put(t2, n2.clone()))), n2;
}
var n = /* @__PURE__ */ new Set([200, 203, 204, 300, 301, 404, 405, 410, 414, 501]);
function a(e3) {
  if (!n.has(e3.status) || ~(e3.headers.get("Vary") || "").indexOf("*"))
    return false;
  let t2 = e3.headers.get("Cache-Control") || "";
  return !/(private|no-cache|no-store)/i.test(t2);
}
function o(n2) {
  return async function(a2, o2) {
    let r2 = await e(n2, a2);
    if (r2)
      return r2;
    o2.defer((e3) => {
      t(n2, a2, e3, o2);
    });
  };
}
var s2 = caches.default;
var e2 = t.bind(0, s2);
var c = e.bind(0, s2);
var r = o.bind(0, s2);
var server = new Server(manifest);
var worker = {
  async fetch(req, env, context) {
    await server.init({ env });
    let pragma = req.headers.get("cache-control") || "";
    let res = !pragma.includes("no-cache") && await c(req);
    if (res)
      return res;
    let { pathname } = new URL(req.url);
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.substring(1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html");
    }
    const location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname)) {
      res = await env.ASSETS.fetch(req);
    } else if (location && prerendered.has(location)) {
      res = new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    } else {
      res = await server.respond(req, {
        platform: { env, context, caches },
        getClientAddress() {
          return req.headers.get("cf-connecting-ip");
        }
      });
    }
    pragma = res.headers.get("cache-control");
    return pragma && res.ok ? e2(req, res, context) : res;
  }
};
var worker_default = worker;
export {
  worker_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

dompurify/dist/purify.js:
  (*! @license DOMPurify 3.0.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.1/LICENSE *)
*/
//# sourceMappingURL=_worker.js.map
