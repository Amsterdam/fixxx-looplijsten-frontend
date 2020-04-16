import React, { FC, FormEvent } from "react"
import { Input, Button, breakpoint, color } from "@datapunt/asc-ui"
import Spinner from "../global/Spinner"
import SmallSpinner from "../global/SmallSpinner"
import Hr from "../styled/Hr"
import useGlobalState from "../../hooks/useGlobalState"
import useInputState, { useInputStatePlural } from "../../hooks/useInputState"
import styled from "styled-components"
import StadiaSelect from "./StadiaSelect"
import Checkboxes from "./Checkboxes"
import ErrorMessage from "../global/ErrorMessage"
import JSONDisplay from "./JSONDisplay"

const Div = styled.div`
  margin-bottom: 36px
`
const DateInputWrap = styled.div`
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    max-width: 33%;
  }
`
const ColumnWrap = styled(Div)`
  column-count: 3;
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    column-count: 6;
  }
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin-bottom: 18px
  button {
    margin-left: 12px
  }
`
const H4 = styled.h4`
  margin: 18px 0 4px
`
const StyledCheckboxes = styled(Checkboxes)`
  border: 1px solid ${ color("tint", "level5") }
`

const Settings: FC = () => {
  const {
    planningSettings: {
      isFetching,
      isUpdating,
      data: {
        projects: allProjects = [],
        stadia,
        settings = undefined,
        settings: {
          opening_date = undefined,
          projects = undefined,
          lists: settingsLists = undefined
        } = {}
      } = {},
      errorMessage
    },
    planningSettingsActions: {
      saveSettings
    }
  } = useGlobalState()

  const showSpinner = isFetching
  const hasSettings = settings !== undefined
  const showForm = hasSettings
  const showJSON = hasSettings
  const showUpdatingSpinner = isUpdating
  const showErrorMessage = errorMessage !== undefined

  // opening date
  const [date, onChangeDate] = useInputState(opening_date)

  // projects
  const [checkedProjects, projectsOnChangeHOF] = useInputStatePlural(projects)

  // stadia
  const getSettingsListByName = (name: string) => settingsLists?.find(({ name: n }) => n === name)
  const lists = [
    {
      name: "Maandag",
      primaryStadium: useInputState(getSettingsListByName("Maandag")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Maandag")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Maandag")?.exclude_stadia)
    },
    {
      name: "Maandag Avond",
      primaryStadium: useInputState(getSettingsListByName("Maandag Avond")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Maandag Avond")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Maandag Avond")?.exclude_stadia)
    },
    {
      name: "Dinsdag",
      primaryStadium: useInputState(getSettingsListByName("Dinsdag")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Dinsdag")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Dinsdag")?.exclude_stadia)
    },
    {
      name: "Dinsdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Dinsdag Avond")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Dinsdag Avond")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Dinsdag Avond")?.exclude_stadia)
    },
    {
      name: "Woensdag",
      primaryStadium: useInputState(getSettingsListByName("Woensdag")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Woensdag")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Woensdag")?.exclude_stadia)
    },
    {
      name: "Woensdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Woensdag Avond")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Woensdag Avond")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Woensdag Avond")?.exclude_stadia)
    },
    {
      name: "Donderdag",
      primaryStadium: useInputState(getSettingsListByName("Donderdag")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Donderdag")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Donderdag")?.exclude_stadia)
    },
    {
      name: "Donderdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Donderdag Avond")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Donderdag Avond")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Donderdag Avond")?.exclude_stadia)
    },
    {
      name: "Vrijdag",
      primaryStadium: useInputState(getSettingsListByName("Vrijdag")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Vrijdag")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Vrijdag")?.exclude_stadia)
    },
    {
      name: "Vrijdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Vrijdag Avond")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Vrijdag Avond")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Vrijdag Avond")?.exclude_stadia)
    },
    {
      name: "Zaterdag Weekend",
      primaryStadium: useInputState(getSettingsListByName("Zaterdag Weekend")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Zaterdag Weekend")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Zaterdag Weekend")?.exclude_stadia)
    },
    {
      name: "Zondag Weekend",
      primaryStadium: useInputState(getSettingsListByName("Zondag Weekend")?.primary_stadium),
      secondaryStadia: useInputStatePlural(getSettingsListByName("Zondag Weekend")?.secondary_stadia),
      excludeStadia: useInputStatePlural(getSettingsListByName("Zondag Weekend")?.exclude_stadia)
    }
  ]

  const isValidFormState = date !== undefined && checkedProjects !== undefined && settingsLists !== undefined
  const disabled = isUpdating || !isValidFormState

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isValidFormState) return
    const newLists = lists.map(({ name, primaryStadium, secondaryStadia, excludeStadia }) => ({
      name: name,
      primary_stadium: primaryStadium[0] || undefined,
      secondary_stadia: secondaryStadia[0],
      exclude_stadia: excludeStadia[0],
      // @TODO: Remove these two props when removed from API
      number_of_lists: 0,
      length_of_lists: 0
    }))
    saveSettings(date, checkedProjects, newLists)
  }

  return (
    <div>
      { showSpinner &&
        <Spinner />
      }
      { showForm &&
        <form onSubmit={ onSubmit }>

          <h1>Peildatum</h1>
          <Div>
            <DateInputWrap>
              <Input type="date" value={ date } onChange={ onChangeDate } />
            </DateInputWrap>
          </Div>

          <Hr />

          <h1>Openingsredenen</h1>
          <ColumnWrap>
            <Checkboxes options={ allProjects } state={ checkedProjects! } onChangeHOF={ projectsOnChangeHOF } />
          </ColumnWrap>

          <Hr />

          <h1>Stadia</h1>
          <ColumnWrap>
            { lists.map(list => {
                const {
                  name,
                  primaryStadium,
                  secondaryStadia,
                  excludeStadia
                } = list
                return (
                  <Div key={ name }>
                    <h3>{ name }</h3>
                    <H4>1. Zoveel mogelijk</H4>
                    <StadiaSelect selected={ primaryStadium[0] } onChange={ primaryStadium[1] } />
                    <H4>2. Aanvullen met</H4>
                    <StyledCheckboxes name={ `${ name }-secondary` } options={ stadia! } state={ secondaryStadia[0] } onChangeHOF={ secondaryStadia[1] } />
                    <H4>3. Uitsluiten</H4>
                    <StyledCheckboxes name={ `${ name }-exclude` } options={ stadia! } state={ excludeStadia[0] } onChangeHOF={ excludeStadia[1] } />
                  </Div>
                )
              })
            }
          </ColumnWrap>

          <Hr />

          <ButtonWrap>
            { showErrorMessage &&
              <ErrorMessage text={ errorMessage! } />
            }
            { showUpdatingSpinner &&
              <SmallSpinner />
            }
            <Button variant="secondary" disabled={ disabled }>Bewaren</Button>
          </ButtonWrap>
        </form>
      }

      { showJSON &&
        <>
          <Hr />
          <JSONDisplay json={ settings } />
        </>
      }
    </div>
  )
}

export default Settings
