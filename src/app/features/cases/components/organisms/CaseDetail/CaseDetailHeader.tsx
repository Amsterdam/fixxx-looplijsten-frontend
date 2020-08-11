import React, { FC } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import InvalidDataSpan from "app/features/cases/components/atoms/InvalidDataSpan/InvalidDataSpan"
import Label from "app/features/cases/components/atoms/Label/Label"
import Footer from "app/features/cases/components/atoms/Footer/Footer"
import { FraudPrediction } from "app/features/types"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import ScrollToAnchor from "app/features/shared/components/molecules/ScrollToAnchor/ScrollToAnchor"

import FraudPredictionDetailsModal from "../FraudPrediction/FraudPredictionDetailsModal"
import { useFraudPredictionModal } from "../FraudPrediction/hooks/useFraudPredictionModal"

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
const Span = styled.span`
  vertical-align: top;
`

const CaseDetailHeader: FC<Props> = ({ address, postalCode, personCount, caseNumber, caseCount, openCaseCount, caseOpening, signal, fraudPrediction, footer }) => {
  const { getUrl: getToFraudPredictionModalUrl } = useFraudPredictionModal()

  const showFooter = footer !== undefined
  const personText =
    personCount === 0 ? "Geen inschrijvingen" :
    personCount === 1 ? "1 persoon" :
    `${ personCount } personen`

  return (
    <Header>
      <h1>{ address }</h1>
      <PostalCode>{ postalCode }</PostalCode>
      { signal && <StyledStadiumBadge stadium={ signal! } />}
      <div>
        <Label>Ingeschreven</Label><Span>{ personCount > 0 ? <ScrollToAnchor anchor="personen" text={ personText } /> : personText }</Span>
      </div>
      <div>
        <Label>Zaaknummer</Label>
        { caseNumber !== undefined && caseCount !== undefined ?
          <Span><strong>{ caseNumber }</strong> van { caseCount }</Span> :
          <InvalidDataSpan />
        }
      </div>
      <div>
        <Label>Open zaken</Label>
        { openCaseCount !== undefined ?
          <Span>{ openCaseCount }</Span> :
          <InvalidDataSpan />
        }
      </div>
      <div>
        <Label>Openingsreden</Label>
        { caseOpening !== undefined ?
          <Span>{ caseOpening }</Span> :
          <InvalidDataSpan />
        }
      </div>
      { fraudPrediction &&
        <div>
          <Link to={getToFraudPredictionModalUrl()}>
            <Label>Voorspelling (bèta)</Label>
            <FraudProbability fraudProbability={fraudPrediction?.fraud_probability} />
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