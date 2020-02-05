import React, { FC } from "react"
import Case from "../components/cases/Case"
import Navigation from "../components/global/Navigation"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  teamId?: string
  caseId?: string
}

const CasePage: FC<Props> = ({ teamId, caseId }) => {
  return (
    <>
      <Navigation />
      <Case caseId={ caseId! } />
    </>
  )
}

export default CasePage
