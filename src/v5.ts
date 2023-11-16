import stringify from "./stringify.js";

/**
 * Name string is a fully-qualified domain name
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_DNS = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x10,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
]);

/**
 * Name string is a URL
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_URL = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x11,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
])

/**
 * Name string is an X.500 DN (in DER or a text output format)
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_OID = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x12,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
])

/**
 * Name string is an ISO OID
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_X500 = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x14,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
])

/**
 * uuid V5
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export default async function v5(value: Uint8Array, namespace: Uint8Array) {
    const bytes = new Uint8Array(value.byteLength + namespace.byteLength);
    bytes.set(namespace);
    bytes.set(value, namespace.length);

    const hash = new Uint8Array(await crypto.subtle.digest("SHA-1", bytes));
    
    hash[6] = (hash[6] & 0x0f) | 0x50;
    hash[8] = (hash[8] & 0x3f) | 0x80;

    return stringify(new Uint8Array(hash));
}