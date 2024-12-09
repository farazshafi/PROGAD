export function generateIds(data) {
  let prefix = "DEF";
  if (data === "order") {
    prefix = "ORD";
  }
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${timestamp}${random}`;
}
