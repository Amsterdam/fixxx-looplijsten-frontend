import React from "react"
import { Close, Search } from "@amsterdam/asc-assets"
import { combineValidators, isMatchingRegex, isRequired, ScaffoldAvailableFields } from "@amsterdam/amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "@amsterdam/scaffold-form/package"
import isRequiredWhenEmpty from "./validators/isRequiredWhenEmpty"

export const createDefinition = (onResetButtonClick: () => void) => {
  const definition: FormPositionerFields<ScaffoldAvailableFields> = {
    streetName: {
      type: "TextField",
      props: {
        label: "Straatnaam",
        name: "streetName",
        validate: isRequiredWhenEmpty("postalCode", "Vul een straatnaam óf postcode in"),
        autoFocus: true,
        tabIndex: 1
      }
    },
    postalCode: {
      type: "NumberField",
      props: {
        label: "Postcode",
        name: "postalCode",
        validate: combineValidators(
          isRequiredWhenEmpty("streetName", "Vul een postcode óf straatnaam in"),
          isMatchingRegex(/\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*/, "Geldige postcodes zijn: 1234AA of 1234 aa")
        ),
        tabIndex: 2
      }
    },
    streetNumber: {
      type: "NumberField",
      props: {
        label: "Huisnummer",
        name: "streetNumber",
        min: "1",
        step: "1",
        pattern: "\\d+",
        title: "Alleen cijfers zijn geldig",
        hideNumberSpinner: true,
        validate: isRequired(),
        tabIndex: 3
      }
    },
    suffix: {
      type: "NumberField",
      props: {
        label: "Toevoeging",
        name: "suffix",
        tabIndex: 4
      }
    },
    reset: {
      type: "ResetButton",
      props: {
        alignedHorizontally: { tabletM: true },
        icon: <Close />,
        onClick: onResetButtonClick
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        alignedHorizontally: { tabletM: true },
        icon: <Search />,
        tabIndex: 5,
        align: "right"
      }
    }
  }

  // Align these fields in a grid using FormPositioner:
  return new FormPositioner(definition)
    // From mobile and bigger we align using a custom grid:
    .setGrid("mobileS", "1fr 1fr 1fr", [
      // Grid:
      [ "streetName", "streetName", "streetName" ],
      [ "postalCode", "streetNumber", "suffix" ],
      [ "reset", "submit", "submit" ]
    ])
    // From tablet and bigger we align horizontally:
    .setHorizontal("tabletM", "2fr 1fr 1fr 1fr auto auto")
    .getScaffoldProps()
}
