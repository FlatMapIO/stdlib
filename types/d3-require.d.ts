// Type definitions for d3-require 1.2
// Project: https://github.com/d3/d3-require
// Definitions by: Kindy Lin <https://github.com/kindy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

// Last module version validated against: 1.2.4

declare module "d3-require" {
  export interface Require {
    (name: string, ...names: string[]): Promise<any>;

    /**
     * Returns a `require` with the specified *aliases*.
     * `require.alias({"react": React, "react-dom": ReactDOM})`
     */
    alias(aliases: {[k: string]: any}): Require;

    /**
     * The resolver passed to `requireFrom`
     */
    resolve: Resolver;
  }

  /**
   * Returns a promise to the URL to load the module with the specified *name*.
   */
  export type Resolver = (name: string, base?: string) => Promise<string>;
  export type requireFrom = (resolver: Resolver) => Require;

  export class RequireError extends Error {
    public readonly name: string;
  }
  type Main = "unpkg" | "jsdelivr" | "browser" | "main";
  export function resolveFrom(
    origin?: "https://cdn.jsdelivr.net/npm/" | string,
    mains?: Main[],
  ): (name: string, nase: string) => Promise<any>;
  /**
   * Loads modules from jsDelivr.
   * Like `require('d3@5')`
   *
   * @param name Any package name optionally followed by the 'at sign' and a semver range
   * @returns A promise to the loaded module
   */
  export const require: Require;

  /**
   * Returns a new `require` which loads modules from the specified `resolver`.
   * Like `requireFrom(name => ('https://unpkg.com/'+name))`
   */
  export function requireFrom(resolver): Require;
}
