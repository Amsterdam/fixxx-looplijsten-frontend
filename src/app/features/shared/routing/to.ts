import { ComponentProps, ComponentType } from "react"
import { Routes } from "app/config/routes"
import { RouteComponentProps } from "@reach/router"

// RouteParams for given K in Routes
type RouteParams<T extends Routes, K extends keyof T> =
// ... value for K should be a Component:
  T[K] extends ComponentType
    // Omit default RouteComponentProps, we're not interested in those. (E.g location, navigate, etc)
    ? Omit<ComponentProps<T[K]>, keyof RouteComponentProps | "children">
    // Don't allow anything else than Components. As we cannot safely extract component-props on anything other than a
    // Component
    : never

// Safely convert any object to a string, even null or undefined
const toString = (obj: any): string =>
  typeof obj?.toString === "function"
    ? obj.toString()
    : ""

/**
 * Example:
 * applyRouteParams('/foo/:id/', { id: 100 });       =>      "/foo/100/"
 */

export const applyRouteParams = <T extends Routes, K extends keyof T>
(url: string, params: RouteParams<T, K>): string =>
  Object
    .entries(params)
    .reduce(
      (url, [ key, value ]) => url.replace(`:${ key }`, toString(value)),
      url
    )

/**
 * Typesafe routes.
 * Usage: `to("/foo/:id/", { id: 100 })`
 *
 * NOTE: Type-errors will occur when "/foo/:id" does not exit, or when the related Page-component does not accept an
 * `id` property
 */
const to = <T extends Routes, K extends keyof T>
(path: K, params?: RouteParams<T, K>) =>
  params !== undefined
    ? applyRouteParams(path.toString(), params)
    : path

export default to
