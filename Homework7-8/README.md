# Development Environment Steps

Run the following command on Homework6 folder: `npx hardhat node`

Run the following command on `Homework7/client` folder: `yarn start`

Run the following command on `Homework7/server` folder: `yarn start`

# Homework 7 - Using Decentralized Storage

## Recap

Decentralized storage providers allow participants to store data online without fear of location-based restrictions.

Data stored in this manner is uniquely identified based on the contents to avoid clashing. This also acts as a retrieval mechanism to ensure you’re getting the promised information.

Data stored in free decentralized storage should be treated as volatile as it may not be stored for extended periods of time, especially if it’s not being accessed.

Immutable storage is available from third-party providers or by ‘pinning’ data.

### Interact with a decentralized storage provider

1. Use one of the storage providers to store data online.

   1. https://ipfs.io (https://ipfs.io)
   2. https://nft.storage/ (https://nft.storage/)
   3. https://www.storj.io/ (https://www.storj.io/) (Go library)
   4. Any other…

2. Allow others to retrieve data from location.

3. Create a front-end application to programmatically interact with storage provider.

   - Store data and receive location.
   - Retrieve data from any given location.
   - Front-end can be written in any chosen framework however code samples use
   - IPFS, NodeJS and ExpressJS.

4. How would you try to delete data from IPFS?
   https://letmegooglethat.com/?q=How+would+you+try+to+delete+data+from+IPFS%3F
   https://github.com/ipfs-inactive/faq/issues/9

### Code snippets

**Store string to IPFS**

```js
// Dependency
const IPFS = require("ipfs");
(async () => {
  // Initialise IPFS node
  const node = await IPFS.create();
  // Set some data to a variable
  const data = "Hello, <YOUR NAME HERE>";
  // Submit data to the network
  const cid = await node.add(data);
  // Log CID to console
  console.log(cid.path);
})();
```

**Retrieve string from IPFS**

```js
// Dependencies
const IPFS = require("ipfs");
const all = require("it-all");
(async () => {
  // Initialise IPFS node
  const node = await IPFS.create();
  // Store CID in a variable
  const cid = "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A";
  // Retrieve data from CID
  const data = Buffer.concat(await all(node.cat(cid)));
  // Print data to console
  console.log(data.toString());
})();
```

Gateway for verifying CID using above example:
https://ipfs.io/ipfs/QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A

## Resources

https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md
https://expressjs.com/en/starter/generator.html

## Helpful hints below…

**Store file to IPFS**

**Client-side:**

```js
const reader = new FileReader();
reader.onloadend = function () {
const buf = buffer.Buffer.from(reader.result);
const route = 'addFile';
const req = { data: buf };
...
...
}
const file = document.getElementById("file");
reader.readAsArrayBuffer(file.files[0]);
```

**For IPFS add:**

```js
let buf = Buffer.from(obj);
```

**To show retrieved data on screen**

```js
function toBase64(arr) {
  arr = new Uint8Array(arr);
  return btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}
$('#ipfs-image').attr('src', `data:image/png;base64,${toBase64(response[0]));
```

**Model answer CID**
`QmVGLCTbLkkbNtyymoGhEmYtfZpGWjjJeScAm8GcCCTEeo`
