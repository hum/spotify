export function parseOpts<T>(opts: T): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(opts)) {
    if (v == undefined) {
      continue;
    }
    let value = "";
    if (Array.isArray(v)) {
      value = v.join(",");
    } else {
      value = String(v);
    }
    result[toSnakeCase(k)] = value;
  }
  return result;
}

export const format = (query: string, params: Record<string, string>) => {
  if (params == {}) {
    return query;
  }
  let result = "?";
  for (const [k, v] of Object.entries(params)) {
    result += `${k}=${v}&`;
  }
  return query.concat(result.substr(0, result.length - 1));
};

export const toSnakeCase = (str: string) => {
  let result = "";
  let char = "";

  for (let i = 0; i < str.length; i++) {
    char = str[i];
    if (char == char.toUpperCase()) {
      char = char.toLowerCase();
      result += "_";
    }
    result += `${char}`;
  }
  return result;
};
