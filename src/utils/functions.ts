export function esFechaIgualOPosterior(fecha: Date, referencia: Date): boolean {
  const f = new Date(fecha);
  const r = new Date(referencia);
  f.setHours(0, 0, 0, 0);
  r.setHours(0, 0, 0, 0);
  return f >= r;
}
