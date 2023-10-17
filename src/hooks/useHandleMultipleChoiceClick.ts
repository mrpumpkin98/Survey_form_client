export const useHandleMultipleChoiceClick = (
  checkboxStates: any,
  setCheckboxStates: any
) => {
  const handleMultipleChoiceClick = (checkboxId: any) => {
    const updatedCheckboxStates = { ...checkboxStates };
    updatedCheckboxStates[checkboxId] = !updatedCheckboxStates[checkboxId];
    for (const key in updatedCheckboxStates) {
      if (key !== checkboxId) {
        updatedCheckboxStates[key] = false;
      }
    }
    setCheckboxStates(updatedCheckboxStates);
  };

  return { handleMultipleChoiceClick };
};
