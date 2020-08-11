import React, { FC } from "react"

import { email, subject, body } from "app/features/cases/email/basisInformatie"

type Props = {
  isWoonboot: boolean
  address: string
  postalCode: string
  gebruiksdoel?: string
  gebruik?: string
  aantalBouwlagen?: number
  etage?: number
  aantalKamers?: number
  oppervlak?: number
  woonbootStatus?: string
  woonbootIndicatie?: boolean
  woonbootAanduiding?: boolean
}

const MailtoAnchor: FC<Props> = ({ address, postalCode, gebruiksdoel, gebruik, aantalBouwlagen, etage, aantalKamers, oppervlak, isWoonboot, woonbootStatus, woonbootIndicatie, woonbootAanduiding }) => {
  const href = `mailto:${ email }?subject=${ subject }&body=${ body(isWoonboot, address, postalCode, gebruiksdoel, gebruik, aantalBouwlagen, etage, aantalKamers, oppervlak, woonbootStatus, woonbootIndicatie, woonbootAanduiding) }`
  const text = "Meld BAG afwijkingen"
  return <p><a href={ href }>{ text }</a></p>
}
export default MailtoAnchor