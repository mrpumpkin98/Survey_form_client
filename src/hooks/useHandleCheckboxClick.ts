export const useHandleCheckboxClick = (
  checkboxStates: any,
  setCheckboxStates: any
) => {
  const handleCheckboxClick = (index: any) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[index] = !checkboxStates[index];
    setCheckboxStates(updatedCheckboxStates);
  };

  return { handleCheckboxClick };
};
