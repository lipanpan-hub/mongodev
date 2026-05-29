@lppx/mongodev
=================

a dev tool for mongodb


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@lppx/mongodev.svg)](https://npmjs.org/package/@lppx/mongodev)
[![Downloads/week](https://img.shields.io/npm/dw/@lppx/mongodev.svg)](https://npmjs.org/package/@lppx/mongodev)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @lppx/mongodev
$ mgd COMMAND
running command...
$ mgd (--version)
@lppx/mongodev/1.0.2 linux-x64 node-v22.22.3
$ mgd --help [COMMAND]
USAGE
  $ mgd COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mgd autocomplete [SHELL]`](#mgd-autocomplete-shell)
* [`mgd help [COMMAND]`](#mgd-help-command)
* [`mgd version`](#mgd-version)

## `mgd autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ mgd autocomplete [SHELL] [-r]

ARGUMENTS
  [SHELL]  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ mgd autocomplete

  $ mgd autocomplete bash

  $ mgd autocomplete zsh

  $ mgd autocomplete powershell

  $ mgd autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.50/src/commands/autocomplete/index.ts)_

## `mgd help [COMMAND]`

Display help for mgd.

```
USAGE
  $ mgd help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for mgd.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/6.2.49/src/commands/help.ts)_

## `mgd version`

```
USAGE
  $ mgd version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/2.2.46/src/commands/version.ts)_
<!-- commandsstop -->
