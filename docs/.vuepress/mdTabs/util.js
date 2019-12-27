// Map to keep track of used ids
const tabIds = new Map();

const randomString = function (randomLen, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (randomLen) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

const dedupeId = function dedupeId(id) {
  const normalizedId = String(id).toLowerCase().replace(' ', '-')
  let currentValue = !tabIds.has(normalizedId) ? 1 : (tabIds.get(normalizedId) + 1);
  tabIds.set(normalizedId, currentValue);
  return `${normalizedId}-${currentValue}${randomString(true, 5, 6)}`;
}

const tabAttributes = function (val, options = {}) {
  let attributes = val
    // sanitize input
    .trim()
    .slice("tab".length)
    .trim()
    // parse into array
    .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g)
    // normalize name attribute
    .map(attr => {
      if (!attr.includes("=")) {
        if (!attr.startsWith('"')) {
          attr = `"${attr}`;
        }

        if (!attr.endsWith('"')) {
          attr = `${attr}"`;
        }

        return `name=${attr}`;
      }

      return attr;
    });

  if (options.dedupeIds) {
    const idIndex = attributes.findIndex(attr => attr.startsWith('id='));
    const nameIndex = attributes.findIndex(attr => attr.startsWith('name='));


    if (idIndex !== -1) {
      const id = attributes[idIndex];
      const [, idValue] = id.split('=');
      attributes[idIndex] = `id="${dedupeId(idValue.substring(1, idValue.length - 1))}"`;
    } else {
      const name = attributes[nameIndex];
      const [, nameValue] = name.split('=');
      attributes.unshift(`id="${dedupeId(nameValue.substring(1, nameValue.length - 1))}"`);
    }
  }

  return attributes.join(" ");
}

const tabsAttributes = function (val) {
  return (
    val
      // sanitize input
      .trim()
      .slice("tabs".length)
      .trim()
  );
}

module.exports = {
  tabAttributes,
  tabsAttributes
}
