export interface IPeopleListProps {
  names: INamesStatus[];
  setNames: React.Dispatch<React.SetStateAction<INamesStatus[]>>;
}

export interface ITableData {
  tableHead: string[];
  widthArr: number[];
}

export interface INamesStatus {
  name: string;
  status: string;
}
