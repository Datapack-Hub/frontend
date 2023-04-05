export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","icons/bell.svg","icons/moderation.svg","icons/settings.svg","logos/dph.png","logos/dph.svg","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.faedcb68.js","imports":["_app/immutable/entry/start.faedcb68.js","_app/immutable/chunks/index.160dc208.js","_app/immutable/chunks/singletons.f169da02.js","_app/immutable/chunks/index.6890fe95.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.ac1b8116.js","imports":["_app/immutable/entry/app.ac1b8116.js","_app/immutable/chunks/index.160dc208.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js')
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
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/user/edit",
				pattern: /^\/user\/edit\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/user/[slug]",
				pattern: /^\/user\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export const prerendered = new Set([]);
