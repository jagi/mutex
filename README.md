# @jagi/mutex

Simple TypeScript mutex implementation

## Installation

```bash
npm install @jagi/mutex -S
```

or

```bash
yarn add @jagi/mutex
```

## Usage

```ts
import Mutex from "@jagi/mutex";

const mutext = new Mutex();

const asyncActionResult = await mutex.run(async () => {
  // Running asynchronous action.
  return await asyncAction();
});

mutex.run(async () => {
  // This action will wait for the first one to finish.
  await anotherAsyncAction();
});
```
