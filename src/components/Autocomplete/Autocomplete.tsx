import { useCombobox } from "downshift";
import React, { useState, memo, useId, useEffect } from "react";
import { fetchStations } from "src/lib/api";
import { Field, ListItem } from "src/types"
import useDebounce from "src/hooks/useDebounce"

interface Props {
  field: Field;
}

interface ItemProps {
  isHighlighted: boolean;
  getItemProps: ({ item, index }: {item: ListItem, index: number}) => object;
  item: ListItem;
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
      className={isHighlighted ? "bg-blue-300 p-1" : "p-1"}
      key={`${item.name}-${index}`}
      {...getItemProps({ item, index })}
      id={useId()}
    >
      {item.name}
    </li>
  );
});

const Autocomplete = ({ field }: Props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [userQuery, setUserQuery] = useState("")
  const debouncedQuery = useDebounce(userQuery)

  function getSuggestions(inputValue: string) {
    fetchStations(inputValue).then((results) => {
      const suggestions = results?.map((el: ListItem) => ({
        name: el.name,
        location: el.location,
      }));
      setSuggestions(suggestions);
    });
  }

  useEffect(() => {
    getSuggestions(debouncedQuery)
  }, [debouncedQuery])

  useEffect(() => {
    console.log(suggestions)
  }, [suggestions])

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: suggestions || [],
    itemToString(item: ListItem | null) {
      return item ? item.name : ''
    },
    onInputValueChange: ({ inputValue }) => {
      setUserQuery(inputValue!)
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => field.onChangeFn(newSelectedItem!)
  });

  return (
    <div className="flex flex-col text-white md:w-60 w-full md:mr-5">
      <label className="sm:text-sm" {...getLabelProps()} htmlFor={field.name} id={useId()}>
        {field.label}
      </label>
      <div className="md:w-60 w-full md:mr-5">
        <input
          type={field.type}
          {...getInputProps()}
          required
          className="h-10 w-full block appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          id={useId()}
          aria-controls={useId()}
          aria-labelledby={useId()}
          placeholder={field.placeholder}
        />
        <ul
          {...getMenuProps()}
          className="max-h-80 border-y-0  absolute z-50 overflow-y-auto border-gray-300 bg-white text-gray-900 sm:text-sm rounded-none rounded-b-md"
          id={useId()}
          aria-labelledby={useId()}
        >
          {isOpen &&
            suggestions?.map((item: ListItem, index: number) => (
              <Item
                key={item.name}
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
