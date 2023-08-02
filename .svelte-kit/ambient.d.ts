
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const MONGO_DATA_API_KEY: string;
	export const MONGO_DATA_API_URL: string;
	export const FONTAWESOME_NPM_AUTH_TOKEN: string;
	export const SPOTIFY_CLIENT_ID: string;
	export const SPOTIFY_CLIENT_SECRET: string;
	export const FIG_PID: string;
	export const LC_FIG_SET_PARENT: string;
	export const CAML_LD_LIBRARY_PATH: string;
	export const MANPATH: string;
	export const npm_package_devDependencies_prettier: string;
	export const TERM_PROGRAM: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const npm_package_dependencies_flowbite: string;
	export const NODE: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_typescript: string;
	export const INIT_CWD: string;
	export const SHELL: string;
	export const TERM: string;
	export const npm_package_devDependencies_vite: string;
	export const TMPDIR: string;
	export const HOMEBREW_REPOSITORY: string;
	export const npm_package_scripts_lint: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const OPAM_SWITCH_PREFIX: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_config_registry: string;
	export const FIG_SET_PARENT_CHECK: string;
	export const OCAML_TOPLEVEL_PATH: string;
	export const USER: string;
	export const npm_package_scripts_check_watch: string;
	export const COMMAND_MODE: string;
	export const npm_package_dependencies_flowbite_svelte: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const SSH_AUTH_SOCK: string;
	export const WARP_IS_LOCAL_SHELL_SESSION: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_execpath: string;
	export const WARP_USE_SSH_WRAPPER: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const PATH: string;
	export const npm_config_engine_strict: string;
	export const __CFBundleIdentifier: string;
	export const PWD: string;
	export const TTY: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_command: string;
	export const npm_package_scripts_preview: string;
	export const npm_lifecycle_event: string;
	export const LANG: string;
	export const npm_package_name: string;
	export const npm_config_resolution_mode: string;
	export const NODE_PATH: string;
	export const npm_package_scripts_build: string;
	export const npm_package_dependencies__liveblocks_client: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_package_dependencies_dexie: string;
	export const npm_config_node_gyp: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const HOME: string;
	export const SHLVL: string;
	export const npm_package_type: string;
	export const npm_package_dependencies_extract_colors: string;
	export const HOMEBREW_PREFIX: string;
	export const FIG_SET_PARENT: string;
	export const LOGNAME: string;
	export const npm_package_scripts_format: string;
	export const npm_lifecycle_script: string;
	export const npm_package_devDependencies_prettier_plugin_tailwindcss: string;
	export const SSH_SOCKET_DIR: string;
	export const npm_config_user_agent: string;
	export const HOMEBREW_CELLAR: string;
	export const INFOPATH: string;
	export const npm_package_devDependencies__types_node: string;
	export const CONDA_CHANGEPS1: string;
	export const npm_package_scripts_check: string;
	export const COLORTERM: string;
	export const npm_package_dependencies_short_unique_id: string;
	export const npm_node_execpath: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		MONGO_DATA_API_KEY: string;
		MONGO_DATA_API_URL: string;
		FONTAWESOME_NPM_AUTH_TOKEN: string;
		SPOTIFY_CLIENT_ID: string;
		SPOTIFY_CLIENT_SECRET: string;
		FIG_PID: string;
		LC_FIG_SET_PARENT: string;
		CAML_LD_LIBRARY_PATH: string;
		MANPATH: string;
		npm_package_devDependencies_prettier: string;
		TERM_PROGRAM: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		npm_package_dependencies_flowbite: string;
		NODE: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_typescript: string;
		INIT_CWD: string;
		SHELL: string;
		TERM: string;
		npm_package_devDependencies_vite: string;
		TMPDIR: string;
		HOMEBREW_REPOSITORY: string;
		npm_package_scripts_lint: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		OPAM_SWITCH_PREFIX: string;
		npm_package_private: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_config_registry: string;
		FIG_SET_PARENT_CHECK: string;
		OCAML_TOPLEVEL_PATH: string;
		USER: string;
		npm_package_scripts_check_watch: string;
		COMMAND_MODE: string;
		npm_package_dependencies_flowbite_svelte: string;
		PNPM_SCRIPT_SRC_DIR: string;
		SSH_AUTH_SOCK: string;
		WARP_IS_LOCAL_SHELL_SESSION: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_package_devDependencies_tslib: string;
		npm_execpath: string;
		WARP_USE_SSH_WRAPPER: string;
		npm_package_devDependencies_svelte: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		PATH: string;
		npm_config_engine_strict: string;
		__CFBundleIdentifier: string;
		PWD: string;
		TTY: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_command: string;
		npm_package_scripts_preview: string;
		npm_lifecycle_event: string;
		LANG: string;
		npm_package_name: string;
		npm_config_resolution_mode: string;
		NODE_PATH: string;
		npm_package_scripts_build: string;
		npm_package_dependencies__liveblocks_client: string;
		XPC_FLAGS: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_package_dependencies_dexie: string;
		npm_config_node_gyp: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_svelte_check: string;
		HOME: string;
		SHLVL: string;
		npm_package_type: string;
		npm_package_dependencies_extract_colors: string;
		HOMEBREW_PREFIX: string;
		FIG_SET_PARENT: string;
		LOGNAME: string;
		npm_package_scripts_format: string;
		npm_lifecycle_script: string;
		npm_package_devDependencies_prettier_plugin_tailwindcss: string;
		SSH_SOCKET_DIR: string;
		npm_config_user_agent: string;
		HOMEBREW_CELLAR: string;
		INFOPATH: string;
		npm_package_devDependencies__types_node: string;
		CONDA_CHANGEPS1: string;
		npm_package_scripts_check: string;
		COLORTERM: string;
		npm_package_dependencies_short_unique_id: string;
		npm_node_execpath: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
