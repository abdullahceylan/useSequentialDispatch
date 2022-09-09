# useSequentialDispatch

[![NPM](https://img.shields.io/npm/v/use-sequential-dispatch.svg)](https://www.npmjs.com/package/use-sequential-dispatch)

Basically, what this hook does is that it takes a parameter with a value array of requests list and does those requests sequentially. It's useful when we want to process a collection of non-blocking calls either sequentially or in parallel when the order of execution is important and each API call must wait for the previous to return.

## Installation
`npm install --save use-sequential-dispatch`

or 

`yarn add use-sequential-dispatch`

## Parameters

* **actions** _{Array of actions array}_ - The initial prop is an `array of actions array` to be dispatched.
* **debug** _{boolean}_ - Whether the errors are going to be displayed in the console or not. `Default: false`
* **loggerFn** _{function}_ - The logger function to be used for the error/warning messages. `Default: console`



## Usage

  ```js
  import useSequentialDispatch from 'use-sequential-dispatch';

  const App = () => { 
    const doSequentialDispatch = useSequentialDispatch();

    sequentialDispatch([
      [action1(param1)],
      [action2(param1, param2)],
      [
        action3,
        action4(param1, param2),
      ],
      [action5],
    ], true, null);
  }
  ```

In the example above, we have 5 different actions to be dispatched sequentially. But also we have 2 actions to be dispatched parallelly which are `action 3` and `action 4`.

So each action will wait for the previous action to be completed. `action 3` and `action 4` will wait for `action 2` to be completed then dispatched parallelly.


# License

MIT © Abdullah Ceylan
