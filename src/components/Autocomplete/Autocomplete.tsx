import { useCombobox } from "downshift";
import React, { useState, useEffect, memo } from "react";
import { fetchStations } from "src/lib/api";

type Field = {
  label: string;
  name: string;
  type: string;
  // id: string;
};

interface Props {
  field: Field;
}

interface ItemProps {
  isHighlighted: boolean;
  getItemProps: () => void;
  item: string;
  index: number;
}

const Item = memo(function Item({
  isHighlighted,
  getItemProps,
  item,
  index,
}: ItemProps) {
  return (
    <li
      style={isHighlighted ? { backgroundColor: "#bde4ff" } : {}}
      key={`${item}${index}`}
      {...getItemProps({ item, index })}
      className="p-1"
    >
      {item}
    </li>
  );
});

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
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    onInputValueChange: ({ inputValue }) => {
      getSuggestions(inputValue!);
    },
  });

  return (
    <div className="flex flex-col text-white md:w-60 w-full md:mr-5">
      <label {...getLabelProps()} htmlFor={field.name}>
        {field.label}
      </label>
      <div className="md:w-60 w-full md:mr-5">
        <input
          type={field.type}
          {...getInputProps()}
          required
          className="rounded-lg h-10 text-black w-full"
          // id="downshift-48-menu"
        />
        <ul
          {...getMenuProps()}
          className="max-h-60 w-60 border-y-0 p-0 absolute z-50 overflow-y-auto m-0 bg-white rounded-xl text-black"
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
