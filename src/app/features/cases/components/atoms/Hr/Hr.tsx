import styled from "styled-components"
import { themeColor } from "@datapunt/asc-ui"

export default styled.hr`
  border: 0;
  height: 1px;
  background: ${ themeColor("tint", "level5") };
  margin: 8px 0 16px;
`