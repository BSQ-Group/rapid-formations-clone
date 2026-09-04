export const NAME_CHECK_RESET_EVENT = 'namecheck:reset'

export const requestNameCheckReset = () => {
  window.dispatchEvent(new Event(NAME_CHECK_RESET_EVENT))
}
