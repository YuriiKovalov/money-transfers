export interface ColumnModel<T> {
  label: string;
  value: T;
  type?: 'chip' | 'mask';
}
