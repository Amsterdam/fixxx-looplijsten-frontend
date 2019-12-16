import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  address: string
  postalCode: PostalCode
}

const H1 = styled.h1`
  font-size: 20px
  line-height: 28px
  color: black
`
const PostalCode = styled.p`
  font-weight: bold
  color: black
`

const SearchResultAddress: FC<Props> = ({ address, postalCode }) => (
  <>
    <H1>{ address }</H1>
    <PostalCode>{ postalCode }</PostalCode>
  </>
)
export default SearchResultAddress
