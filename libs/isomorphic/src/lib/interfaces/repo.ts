export interface IRepo {
  fullyQualifiedName?: string;
  name?: string;
  pathOnDisk?: string;
  url: string;
  refs?: string[];
}
