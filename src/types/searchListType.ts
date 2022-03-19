export type searchResultType = {
  id: number;
  text: string;
};

export interface SearchListProps {
  $container: HTMLElement;
  initialState: searchResultType[];
}
