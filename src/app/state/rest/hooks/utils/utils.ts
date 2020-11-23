import { useCallback, useContext } from "react"
import { navigate } from "@reach/router"
import { AxiosError } from "axios"
import qs from "qs"
import slashSandwich from "slash-sandwich"

import { clearToken, getToken } from "app/state/auth/tokenStore"
import to from "app/features/shared/routing/to"
import { ErrorContext } from "../../../error/ErrorProvider"

const isAxiosError = (error: any): error is AxiosError => error.isAxiosError

/**
 * Default error handler:
 */
export const useErrorHandler = () => {
  const { setError } = useContext(ErrorContext)

  return useCallback(async (error: AxiosError | Error) => {
    const errorMessage = isAxiosError(error) ? error.response?.data.message : error.message
    const errorSeverity = isAxiosError(error) ? error.response?.data.severity : undefined
    const errorTitle = isAxiosError(error) ? error.response?.data.title : undefined

    if (isAxiosError(error) && error.response?.status === 401) {
      clearToken()
      await navigate(to("/login"))
    }

    setError(errorMessage, errorSeverity, errorTitle)
  }, [ setError ])
}

/**
 * Default headers:
 */
export const getHeaders = () => {
  const token = getToken()
  return { Authorization: `Bearer ${ token }` }
}

/**
 * Utility function to create a gateway URL.
 */
export const makeGatewayUrl = (paths: Array<number | string | undefined>, queryStringParams?: Record<string, number | string | undefined>) => {
  const path = slashSandwich([ process.env.REACT_APP_GATEWAY, ...paths ])

  const queryString = queryStringParams
    ? qs.stringify(queryStringParams, { addQueryPrefix: true })
    : ""

  return `${ path }${ queryString }`
}
