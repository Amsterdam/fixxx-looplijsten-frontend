import { combineValidators, isNotIntersectingWith, isRequired } from "@amsterdam/amsterdam-react-final-form"
import { FormPositioner, FormPositionerFields } from "@amsterdam/scaffold-form/package"

import { Field } from "app/features/shared/components/form/ScaffoldField"
import postalCodeSiblingValidator from "../SettingsForm/validators/postalCodeSiblingValidator"

import { arrayToObject } from "app/features/shared/utils/arrayToObject"

/**
 * Creates form definition for planningSettings
 */

export const createDefinition = (postalCodeRangeOptions: any, daySegmentsOptions: any, weekSegmentsOptions: any) => {
  // @TODO: Move to config
  const postalCodeMin = 1000
  const postalCodeMax = 1109

  const definition: FormPositionerFields<Field> = {
    opening_date: {
      type: "TextField",
      props: {
        label: "Begindatum van het meest recente stadium",
        name: "settings.opening_date",
        type: "date",
        validate: isRequired()
      }
    },
    divider1: {
      type: "Divider",
      props: {}
    },
    geo_type: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Selecteer postcodes of stadsdelen",
        name: "postal_codes_type",
        options: {
          postcode: "Postcodes",
          stadsdeel: "Stadsdelen"
        }
      }
    },
    postal_codes: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { postal_codes_type } }) => postal_codes_type && postal_codes_type === "postcode",
        field: {
          type: "ArrayField",
          props: {
            name: "settings.postal_code_ranges",
            allowAdd: true,
            allowRemove: true,
            minItems: 1,
            columns: {
              "tabletM": "1fr 1fr 1fr",
              "laptopM": "1fr 1fr 1fr 1fr"
            },
            scaffoldFields: {
              postal_code_range_start: {
                type: "NumberField",
                props: {
                  name: "range_start",
                  label: "Van",
                  min: postalCodeMin,
                  max: postalCodeMax,
                  validate: postalCodeSiblingValidator("start")
                }
              },
              postal_code_range_end: {
                type: "NumberField",
                props: {
                  name: "range_end",
                  label: "Tot en met",
                  min: postalCodeMin,
                  max: postalCodeMax,
                  validate: postalCodeSiblingValidator("end")
                }
              }
            }
          }
        }
      }
    },
    postalCodeRanges: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { postal_codes_type } }) => postal_codes_type === "stadsdeel",
        field: {
          type: "CheckboxFields",
          props: {
            name: "settings.postal_code_ranges_presets",
            options: postalCodeRangeOptions,
            columnCount: { mobileM: 2, tabletM: 4 },
            validate: isRequired()
          }
        }
      }
    },
    divider2: {
        type: "Divider",
        props: {}
    },
    useDaySegments: {
        type: "RadioFields",
        props: {
          isRequired: true,
          label: "Wil je dat er op een specifiek dag deel gelopen wordt?",
          name: "useDaySegments",
          options: {
            noDaySegements: "Geen dag instellingen",
            stadsdeel: "Kies dag instellingen"
          }
        }
    },
    daySegments: {
        type: "ShowHide",
        props: {
          shouldShow: ({ values: { postal_codes_type } }) => true,
          field: {
            type: "CheckboxFields",
            props: {
              name: "day_segments",
              options: daySegmentsOptions,
              columnCount: { mobileM: 2, tabletM: 4 },
              validate: isRequired()
            }
          }
        }
    }
  }

  // Align properties:
  return new FormPositioner(definition)
    .setVertical("mobileS")
    .setGrid("tabletM", "1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "divider1", "divider1", "divider1" ],
      [ "geo_type", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider2", "divider2", "divider2" ],
      [ "daySegments", "daySegments", "daySegments" ]
    ])
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr", [
      [ "opening_date" ],
      [ "divider1", "divider1", "divider1", "divider1", "divider1" ],
      [ "geo_type", "postal_codes", "postal_codes", "postal_codes", "postal_codes" ],
      [ "geo_type", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges", "postalCodeRanges" ],
      [ "divider2", "divider2", "divider2", "divider2", "divider2" ],
      [ "daySegments", "daySegments", "daySegments", "daySegments", "daySegments" ]
    ])
    .getScaffoldProps()
}
