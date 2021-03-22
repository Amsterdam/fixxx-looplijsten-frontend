import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import { useDaySettings, usePostCodeRanges, useTeamSettings } from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./daySettingsFormDefinition"
import { createDefinition as createDefinitionV2 } from "./daySettingsFormDefinitionV2"
import FixedSubmitButton from "../SettingsForm/components/FixedSubmitButton"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import { filterEmptyPostalCodes } from "app/features/settings/utils/filterEmptyPostalCodes"

const Wrap = styled.div`
  margin: 0 8px 100px 8px;

  // Awful hack to indent values for Postcodes or Stadsdelen 
  div:nth-child(5):nth-last-child(9) {
    padding-left: 32px;
  }
`

type Props = {
  teamSettingsId: number
  daySettingsId: number
}

const DaySettingsForm: FC<RouteComponentProps<Props>> = ({ teamSettingsId, daySettingsId }) => {
  const { data: teamSettings, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const { data: daySettings, execPut, isBusy: isBusyDaySettings } = useDaySettings(daySettingsId!)
  const { data: postalCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
  const [ errorMessage, setErrorMessage ] = useState("")

  const definition = useMemo(
    () => createDefinition(teamSettings?.project_choices ?? [], teamSettings?.stadia_choices ?? [], (postalCodeRangesPresets?.results ?? []).reduce((t: any, c) => {
      t[String(c.id)] = c.name
      return t
    }, {}) ?? []),
    [ teamSettings, postalCodeRangesPresets ]
  )
  const definitionV2 = useMemo(
    () => createDefinitionV2((postalCodeRangesPresets?.results ?? []).reduce((t: any, c) => {
      t[String(c.id)] = c.name
      return t
    }, {}) ?? [], 
    daySettings?.team_schedules?.day_segments.reduce((t: any, c) => {
      t[String(c.id)] = c.name
      return t
    }, {}) || [], 
    daySettings?.team_schedules || daySettings?.team_schedules?.week_segments || []),
    [ daySettings, teamSettings, postalCodeRangesPresets ]
  )

  const handleSubmit = useCallback(async (data: any) => {
    const values = filterEmptyPostalCodes(data.settings)
    setErrorMessage("")
    if (data.postal_codes_type === "postcode") {
      values.postal_code_ranges_presets = []
    }
    try {
      await execPut(values, { skipCacheClear: true, useResponseAsCache: true })
      navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
    } catch (error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage, teamSettingsId ])

  if (!daySettings || isBusyDaySettings || !teamSettings || isBusySettings || !postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const default_postal_code_range = [
    { range_end: 1109, range_start: 1000 }
  ]
  console.log(definitionV2)
  return (
    <DefaultLayout>
      <Wrap>
        <Spacing pb={ 4 }>
          <Link to={ to("/team-settings/:teamSettingsId", { teamSettingsId }) }>
            Alle dagen
          </Link>
        </Spacing>
        <p>Wijzig instellingen voor:</p>
        <Heading>{ teamSettings.name }</Heading>
        <Heading forwardedAs="h2">{ daySettings.name }</Heading>
        <ScaffoldForm onSubmit={ handleSubmit } initialValues={ {
          settings: {
            ...daySettings,
            postal_code_ranges_presets: (daySettings.postal_code_ranges_presets ?? []).map((pcp: any) => String(pcp)),
            postal_code_ranges: (daySettings.postal_code_ranges_presets ?? []).length > 0 ? default_postal_code_range : daySettings.postal_code_ranges
          },
          postal_codes_type: (daySettings.postal_code_ranges_presets ?? []).length > 0 ? "stadsdeel" : "postcode",
          day_segments: ["Avond"],
          name: teamSettings.name
        } }>
          <Scaffold { ...( teamSettings?.use_zaken_backend ? definitionV2 : definition ) } />
          <FixedSubmitButton errorMessage={ errorMessage } />
        </ScaffoldForm>
      </Wrap>
    </DefaultLayout>
  )
}

export default DaySettingsForm
