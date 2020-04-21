import React, { FC } from "react"
import styled from "styled-components"
import StadiumBadge from "../global/StadiumBadge"
import InvalidDataSpan from "../global/InvalidDataSpan"
import ScrollToAnchor from "../global/ScrollToAnchor"
import Label from "./Label"
import FraudProbability from "../global/FraudProbability"

import Footer from "./Footer"
import {Link} from "@reach/router"
import FraudPredictionDetailsModal, {toFraudPredictionModal} from "./FraudPrediction/FraudPredictionDetailsModal"

type Props = {
  address: string
  postalCode: string
  personCount: number
  caseNumber?: number
  caseCount?: number
  openCaseCount?: number
  caseOpening?: string
  signal?: string
  fraudPrediction?: FraudPrediction
  footer?: {
    title: string
    link: string
  }
}

const Header = styled.section`
  border: 1px solid #B4B4B4;
  margin-bottom: 15px;
  padding: 15px;
`
const PostalCode = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`
const StyledStadiumBadge = styled(StadiumBadge)`
  margin-bottom: 8px;
`

const CaseDetailHeader: FC<Props> = ({ address, postalCode, personCount, caseNumber, caseCount, openCaseCount, caseOpening, signal, fraudPrediction, footer }) => {
  const showFooter = footer !== undefined
  const personText =
    personCount === 0 ? "Geen inschrijvingen" :
    personCount === 1 ? "1 persoon" :
    `${ personCount } personen`

  const showStadiumBadge = signal !== undefined
  const showFraudProbability = fraudPrediction !== undefined

  return (
    <Header>
      <h1>{ address }</h1>
      <PostalCode>{ postalCode }</PostalCode>
      { showStadiumBadge &&
        <StyledStadiumBadge text={ signal! } />
      }
      <div>
        <Label>Ingeschreven</Label><span>{ personCount > 0 ? <ScrollToAnchor anchor="personen" text={ personText } /> : personText }</span>
      </div>
      <div>
        <Label>Zaaknummer</Label>
        { caseNumber !== undefined && caseCount !== undefined ?
          <span><strong>{ caseNumber }</strong> van { caseCount }</span> :
          <InvalidDataSpan />
        }
      </div>
      <div>
        <Label>Open zaken</Label>
        { openCaseCount !== undefined ?
          <span>{ openCaseCount }</span> :
          <InvalidDataSpan />
        }
      </div>
      <div>
        <Label>Openingsreden</Label>
        { caseOpening !== undefined ?
          <span>{ caseOpening }</span> :
          <InvalidDataSpan />
        }
      </div>
      { showFraudProbability &&
        <div>
          <Link to={toFraudPredictionModal()}>
            <Label>Voorspelling (bèta)</Label>
            <FraudProbability fraudProbability={ fraudPrediction!.fraud_probability } />
          </Link>
          <FraudPredictionDetailsModal
            title={address}
            fraudPrediction={fraudPrediction!}
          />
        </div>
      }
      { showFooter &&
        <Footer>
          <a href={ footer!.link }>{ footer!.title }</a>
        </Footer>
      }

    </Header>
  )
}

export default CaseDetailHeader
