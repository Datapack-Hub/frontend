export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["dph.png","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-b8ced901.js","imports":["_app/immutable/start-b8ced901.js","_app/immutable/chunks/index-7cfc8f94.js","_app/immutable/chunks/singletons-4c5cc805.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
