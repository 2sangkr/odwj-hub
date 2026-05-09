const KEY = "mara_records";

export function getRecords() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRecord(state, comboName) {
  const records = getRecords();
  const record = {
    id: Date.now(),
    comboName,
    savedAt: new Date().toLocaleDateString("ko-KR"),
    noodle: state.noodle,
    toppings: state.toppings,
    protein: state.protein,
    spiceLevel: state.spiceLevel,
    peanutSauce: state.peanutSauce,
    mayu: state.mayu,
  };
  localStorage.setItem(KEY, JSON.stringify([record, ...records]));
  return record;
}

export function deleteRecord(id) {
  const records = getRecords().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(records));
}
