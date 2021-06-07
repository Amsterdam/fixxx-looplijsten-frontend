import {
  combineValidators,
  isMatchingRegex,
  isRequired,
  ScaffoldAvailableFields
} from "@amsterdam/amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "@amsterdam/scaffold-form/package"
import { ApiName } from "app/features/types"
import isRequiredWhenEmpty from "./validators/isRequiredWhenEmpty"

export const createDefinition = (onResetButtonClick: () => void, apiName: ApiName, teamSettingsId: string) => {
  const apiKnown = apiName || teamSettingsId

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
      type: "TextField",
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
      type: "TextField",
      props: {
        label: "Toevoeging",
        name: "suffix",
        tabIndex: 4
      }
    },
    apiName: {
      type: "RadioFields",
      props: {
        horizontal: true,
        label: "Zoek in",
        name: "apiName",
        options: {
          BWV: "BWV",
          AZA: "AZA"
        }
      }
    },
    reset: {
      type: "ResetButton",
      props: {
        alignedHorizontally: { tabletM: true },
        label: "Wis",
        onClick: onResetButtonClick,
        style: { minWidth: "initial" } // Override ASC
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        align: "right",
        alignedHorizontally: { tabletM: true },
        label: "Zoek",
        style: { minWidth: "initial" }, // Override ASC
        tabIndex: 5
      }
    }
  }

  if (apiKnown) {
    delete definition.apiName
  }

  return new FormPositioner(definition)
    .setGrid("mobileS", "1fr 1fr 1fr", [
      [ "streetName", "streetName", "streetName" ],
      [ "postalCode", "streetNumber", "suffix" ],
      apiKnown ? [] : [ "apiName", "apiName", "apiName" ],
      [ "reset", "submit", "submit" ]
    ])
    .getScaffoldProps()
}
