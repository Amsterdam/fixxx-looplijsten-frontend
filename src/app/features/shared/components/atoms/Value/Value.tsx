import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

import formatBoolean from "app/features/shared/utils/formatBoolean"

export type Props = {
  sensitive?: Boolean
  valid?: Boolean
  value?: any
}

const Text = styled.span`
  word-break: break-word;
`

const InvalidValue = styled.span`
  color: ${ themeColor("support", "invalid") };
`

/**
 * Displays a value or child components if the value is valid, a dash if it is undefined, or a red dash if it is invalid.
 * @param sensitive Whether the value is personal and should be anonymisable.
 * @param valid A condition expressing the validity of the value. If omitted, the value is checked for undefined.
 * @param value The value to display.
 * @param children Child components are displayed if no value is provided and validity evaluates to true.
 * @constructor
 * @todo Incorporate <InlineSkeleton/>
 */
const Value: FunctionComponent<Props> = ({ sensitive, valid, value, children }) => {
  if (valid === false) {
    return <InvalidValue>–</InvalidValue>
  }

  if (value === undefined && !children) {
    return <span>–</span>
  }

  if (typeof value === "boolean" || [ "True", "False", "UNKNOWN" ].includes(value)) {
    value = formatBoolean(value)
  }

  if (typeof value === "number") {
    value = String(value)
  }

  return <Text className={ sensitive ? "anonymous" : undefined }>{ value ?? children }</Text>
}

export default Value
