import React from "react";

export const ModifyOpContext = React.createContext();

export const ModifyOpProvider = (props) => {
  const [modifyOk, setModifyOk] = React.useState({ id: "", message: "" });
  const [modifyConcept, setModifyConcept] = React.useState("");
  const [modifyAmount, setModifyAmount] = React.useState("");
  const [modifyDate, setModifyDate] = React.useState("");
  const [type, setType] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [responseModified, setResponseModified] = React.useState("");
  const [modifyCategory, setModifyCategory] = React.useState("");

  return (
    <ModifyOpContext.Provider
      value={{
        modalKey: [modal, setModal],
        modifyOkKey: [modifyOk, setModifyOk],
        modifyConceptKey: [modifyConcept, setModifyConcept],
        modifyAmountKey: [modifyAmount, setModifyAmount],
        modifyDateKey: [modifyDate, setModifyDate],
        typeKey: [type, setType],
        responseModifiedKey: [responseModified, setResponseModified],
        modifyCategoryKey: [modifyCategory, setModifyCategory],
      }}
    >
      {props.children}
    </ModifyOpContext.Provider>
  );
};
