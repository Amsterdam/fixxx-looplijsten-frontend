import React from "react"

import HelpButton from "./HelpButton"
import styled from "styled-components"

export default {
  title: "Shared / Molecules / HelpButton"
}

const CenterCenter = styled.div`
  width: 100vw;
  height: 100vh;  
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Example = () => (
  <CenterCenter>
    <HelpButton>
      <p>Aenean lacinia bibendum nulla sed consectetur. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
      <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum.</p>
    </HelpButton>
  </CenterCenter>
)