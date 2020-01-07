export function getFullAddress(address = {}) {
  return [
    [address.line1, address.line2, address.line3].join(' '),
    [address.city, address.state, address.zipcode].join(' ')
  ].join(', ');
}

export function getFullAddressFromArray(addresses = []) {
  return addresses.map(a => getFullAddress(a)).join('\n');
}
