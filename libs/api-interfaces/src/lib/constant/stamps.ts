export const stamp = (label: string) => (event: any) => `${event}_${label}`;
export const started = stamp('START');
export const failed = stamp('FAIL');
export const finished = stamp('FINISH');
