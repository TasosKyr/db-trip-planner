import { useCombobox } from "downshift";
import React, { useState, useEffect, memo } from "react";
import { fetchStations } from "src/lib/api";

type Field = {
  label: string;
  name: string;
  type: string;
  onChangeFn: () => void;
  // id: string;
};

interface Props {
  field: Field;
}

type Location = {
  id: string;
  latitude: string;
  longitude: string;
  type: string;
};

type Item = {
  name: string;
  id: Location;
};

interface ItemProps {
  isHighlighted: boolean;
  getItemProps: () => void;
  item: Item;
  index: number;
  setFn: () => void;
}

const Item = memo(function Item({
  isHighlighted,
  getItemProps,
  item,
  index,
  setFn
}: ItemProps) {
  return (
    <li
      style={isHighlighted ? { backgroundColor: "#bde4ff" } : {}}
      key={`${item.name}${index}`}
      {...getItemProps({ item, index })}
      className="p-1"
      onClick={() => setFn(item.id)}
    >
      {item.name}
    </li>
  );
});

const Autocomplete = ({ field }: Props) => {
  const [suggestions, setSuggestions] = useState([]);

  function getSuggestions(inputValue: string) {
    fetchStations(inputValue).then((results) => {
      const suggestions = results?.map((el: Item) => ({
        name: el.name,
        id: el.location.id,
      }));
      console.log(suggestions);
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
    selectItem,
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
                key={item?.name}
                isHighlighted={highlightedIndex === index}
                getItemProps={getItemProps}
                item={item}
                index={index}
                setFn={field.onChangeFn}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
