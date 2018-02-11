export function search(fields, query) {
  const re = /(\w+)([ ]?:[ ]?)(\w+)/i;
  const r = re.exec(query);

  if (r && r.length === 4) {
    const q = r[3] === 'true' || r[3] === 'false' ? `{"${r[1]}": ${r[3]}}` : `{"${r[1]}": "${r[3]}"}`;
    return JSON.parse(q);
  }
  const search = fields.map(field => ({ [field]: { $regex: query, $options: 'i' } }));

  return { $or: search };
}
