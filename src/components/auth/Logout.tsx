import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Logout as LogoutIcon } from "@datapunt/asc-assets"
import { getLogoutUrl } from "../../config/api"

const Div = styled.div`
  margin-right: 8px
`

const Logout: FC = () => {

  const {
    clear
  } = useGlobalState()

  const onClick = async () => {
    clear()
    await fetch(getLogoutUrl(), { mode: "no-cors", credentials: "include" })
  }

  return (
    <Div className="Logout">
      <Button
        variant="blank"
        iconLeft={ <LogoutIcon /> }
        onClick={ onClick }
        >Uitloggen</Button>
    </Div>
  )
}

export default Logout
