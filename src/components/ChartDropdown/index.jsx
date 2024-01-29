import { useState } from "react";
import { styled } from "@mui/material";
import Select from "react-select";

const defaultOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

const StyledSelect = styled(Select)(
  ({ theme }) =>
    `
    margin-left: 10px;
  .select__control {
    padding: 6px 12px;
    border-radius: 24px;
    border: 1px solid #E1DFDF;
    box-shadow: none;
    background-color: transparent;
    &:hover {
        border-color: #E1DFDF;
        box-shadow: none;
    }
  }
  .select__menu {
    background-color: ${theme.palette.background.paper};
  }
  .select__option:hover {
    background-color: ${theme.palette.background.default}
  }
  .select__input-container {
    height: 16px;
  }
  .select__input {
    caret-color: transparent;
  }
  .select__single-value, .select__menu {
    color: ${theme.palette.text_.grey_black};
    font-style: normal;
    font-family: 'Plus Jakarta Sans', 'sans-serif';
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
  .select__indicator-separator {
    display: none;
  }
  .select__value-container {
    padding: 0;
    height: 17px;
    margin-bottom: 5px;
    overflow: unset;
  }
  .select__indicator.select__dropdown-indicator {
    padding: 0;
    > svg {
        margin-left: 10px;
    }
  }
  `
);

export function ChartDropdown({
  onChange,
  options = defaultOptions,
  defaultValue,
}) {
  const [value, setValue] = useState(defaultValue || options[0]);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <StyledSelect
      className="dropDown"
      classNamePrefix={"select"}
      onChange={onChange ? onChange : handleChange}
      value={value}
      options={options}
    />
  );
}
