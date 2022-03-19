import { searchResultType } from './searchListType';

export type initialStateType = {
  inputValue: string;
  isValueInInput: boolean;
  searchResult: searchResultType[];
};
