import { useCombobox } from "downshift";
import React, { useState, useEffect, memo } from "react";
import { fetchStations } from "src/lib/api";

const comboboxStyles = { display: "inline-block", marginLeft: "5px" };
const menuStyles = {
  maxHeight: "180px",
  overflowY: "auto",
  width: "135px",
  margin: 0,
  borderTop: 0,
  background: "white",
  position: "absolute",
  zIndex: 1000,
  listStyle: "none",
  padding: 0,
  left: "135px",
};

const Item = memo(function Item({ isHighlighted, getItemProps, item, index }) {
  return (
    <li
      style={isHighlighted ? { backgroundColor: "#bde4ff" } : {}}
      key={`${item}${index}`}
      {...getItemProps({ item, index })}
    >
      {item}
    </li>
  );
});

type Field = {
  label: string;
  name: string;
  type: string;
  // id: string;
};

interface Props {
  field: Field;
}

const Autocomplete = ({ field }: Props) => {
  const [suggestions, setSuggestions] = useState([]);

  function getSuggestions(inputValue: string) {
    fetchStations(inputValue).then((results) => {
      const suggestions = results?.map((el) => el.name);
      setSuggestions(suggestions);
    });
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items: suggestions,
    onInputValueChange: ({ inputValue }) => {
      getSuggestions(inputValue!);
    },
  });

  return (
    <div className="flex flex-col text-black">
      <label {...getLabelProps()} htmlFor={field.name}>
        {field.label}
      </label>
      <div >
      <input
        type={field.type}
        {...getInputProps()}
        required
        className="rounded-lg h-10 w-60 mr-5"
        id="downshift-48-menu"
      />
      {/* const menuStyles = {
  maxHeight: "180px",
  overflowY: "auto",
  width: "135px",
  margin: 0,
  borderTop: 0,
  background: "white",
  position: "absolute",
  zIndex: 1000,
  listStyle: "none",
  padding: 0,
  left: "135px",
}; */}
      <ul
        {...getMenuProps()}
        className="max-h-60 w-60 border-y-0 p-0 absolute z-50 overflow-y-auto m-0 bg-white"
      >
        {isOpen &&
          suggestions?.map((item, index) => (
            <Item
              key={item}
              isHighlighted={highlightedIndex === index}
              getItemProps={getItemProps}
              item={item}
              index={index}
            />
          ))}
      </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
