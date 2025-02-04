import Select from "react-select";


const options = [
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
];

const LanguageMenu = () => {

  const screenWidth = window.innerWidth;

  return (
    <Select
      defaultValue={options[0]}
      options={options}
      isSearchable={false}
      styles={{
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "black" : "white",
          color: state.isSelected ? "white" : "black",
          "&:hover": {
            backgroundColor: state.isSelected ? "black" : "white",
            color: state.isSelected ? "white" : "black",
          },
        }),
        control: (provided) => ({
          ...provided,
          height: screenWidth >= 1024 ? "24px" : "auto",
          width: "89px",
          marginLeft: "0px",
          border: "none",
          background: "black",
          outline: "none",
          boxShadow: "none",
          cursor: "pointer",
          paddingTop: screenWidth >= 768 ? "10px" : "0px",
          color: "Text",
          fontFamily: "Poppins",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "21px",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "white",
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: "white",
          padding: "0px",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        menu: (provided) => ({
          ...provided,
          background: "black",
          marginTop: "6px",
          marginLeft: "0px",
          width: "89px",
          fontFamily: "Poppins",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "21px",
          position: "absolute",
          zIndex: "1",
        }),
      }}
    />
  );
};

export default LanguageMenu;
