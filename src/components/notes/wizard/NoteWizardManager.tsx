import React, { useEffect } from "react"
import { useFormState } from "react-final-form"
import { useNoteWizard } from "./hooks/useNoteWizard"
import useIsMounted from "../../../hooks/useIsMounted"

type Props = {
  caseID: CaseId
}

const NoteWizardManager: React.FC<Props> = ({ caseID }) => {
  const { values } = useFormState()
  const { setValues } = useNoteWizard(caseID)
  const isMounted = useIsMounted()

  // onUnmount, setValues to state
  useEffect(() => () => { if (!isMounted.current) { setValues(values) } }, [ setValues, values, isMounted ])

  return null
}

export default NoteWizardManager
