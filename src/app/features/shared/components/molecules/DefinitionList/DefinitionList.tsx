import React, { useCallback, useState } from "react"
import { Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"
import ToggleCollapse from "app/features/shared/components/atoms/ToggleCollapse/ToggleCollapse"

type Value = string | number | JSX.Element | undefined | null
type Props = {
  numLoadingRows?: number
  numInitialVisibleRows?: number
  isLoading?: boolean
  title?: string | JSX.Element
  values: Record<string, Value>
  headingSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const StyledDl = styled.dl`
  margin-bottom: ${ themeSpacing(10) };
  border-top: 1px solid ${ themeColor("tint", "level3") };

  div {
    display: flex;
    gap: ${ themeSpacing(4) };
    border-bottom: 1px solid ${ themeColor("tint", "level3") };
  }

  dd, dt {
    margin: 0;
    padding: ${ themeSpacing(3) } 0;
  }

  dt {
    flex: 2;
    color: ${ themeColor("tint", "level5") };
    word-wrap: break-word;
  }

  dd {
    flex: 3;
  }
}
`

type LoadingRowsProps = {
  numRows: number
}
const LoadingRows: React.FC<LoadingRowsProps> = ({ numRows }) => <>
  { [ ...Array(numRows) ].map((_, index) => (
    <div key={ index }>
      <dt><SmallSkeleton /></dt>
      <dd><SmallSkeleton /></dd>
    </div>
  )) }
</>

const castValue = (value: Value): string | JSX.Element => {
  if (value == null) return "–"
  if (typeof value === "number") return `${ value }`
  return value
}

const DefinitionList: React.FC<Props> = ({
                                           isLoading,
                                           numLoadingRows,
                                           numInitialVisibleRows = Number.MAX_VALUE,
                                           title,
                                           values,
                                           headingSize = "h2"
                                         }) => {
  const [ isCollapsed, setIsCollapsed ] = useState(true)

  const toggleCollapsed = useCallback(() => setIsCollapsed(!isCollapsed), [ setIsCollapsed, isCollapsed ])

  const valueEntries = Object.entries(values)

  const isCollapsible = valueEntries.length > numInitialVisibleRows

  const rows = isCollapsible && isCollapsed
    ? valueEntries.slice(0, numInitialVisibleRows)
    : valueEntries

  return (
    <div>
      { title &&
      <Heading forwardedAs={ headingSize }>{ isLoading ? <SmallSkeleton height={ 10 } /> : title }</Heading> }
      <StyledDl>
        { isLoading
          ? <LoadingRows numRows={ numLoadingRows ?? 5 } />
          : <>
            { rows
              .map(([ key, value ]) => (
                <div key={ key }>
                  <dt>{ key }</dt>
                  <dd>{ castValue(value) || "–" }</dd>
                </div>
              )) }
          </>
        }
      </StyledDl>
      { isCollapsible && <ToggleCollapse onClick={ toggleCollapsed } isCollapsed={ isCollapsed } /> }
    </div>
  )
}

export default DefinitionList
