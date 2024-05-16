import { ExtraTypes } from "./extra.types";

export type GroupType = {
  children?: React.ReactNode;
  id: number;
  name: string;
  description: string;
  token: string;
} & ExtraTypes;
