# retext-use-contractions

A [retext](https://github.com/retextjs/retext) plugin to encourage the usage of common contractions.

## Install

```sh
npm install retext-use-contractions
```

## Use

```js
import { retext } from "retext";
import retextUseContractions from "retext-use-contractions";

retext()
  .use(retextUseContractions)
  .process("I can not see you.")
  .then((report) => {
    console.error(report);
  });
```

<!--
Yields:

```
  3:14-3:16  warning  Expected `1` space between sentences, not `2`  space  retext-sentence-spacing

⚠ 1 warning
``` -->
