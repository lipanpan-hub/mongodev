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
@lppx/mongodev/0.0.0 win32-x64 node-v24.14.1
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
* [`mgd profiler list`](#mgd-profiler-list)
* [`mgd profiler reset`](#mgd-profiler-reset)
* [`mgd profiler show`](#mgd-profiler-show)
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

## `mgd profiler list`

列出指定数据库的 system.profile 记录，按 ts 降序排列

```
USAGE
  $ mgd profiler list [-d <value>] [-f <value>] [--full] [-l <value>] [-u <value>]

FLAGS
  -d, --db=<value>      数据库名，未指定则通过交互方式选择
  -f, --filter=<value>  MongoDB 查询过滤器（EJSON 字符串），例如 '{"op":"query"}'
  -l, --limit=<value>   [default: 50] 最多返回多少条记录
  -u, --uri=<value>     [default: mongodb://localhost:27017] MongoDB 连接 URI
      --full            输出每条记录的完整字段（默认仅显示关键字段）

DESCRIPTION
  列出指定数据库的 system.profile 记录，按 ts 降序排列

EXAMPLES
  $ mgd profiler list

  $ mgd profiler list -d mydb

  $ mgd profiler list -d mydb -l 100 --full

  $ mgd profiler list -d mydb -f '{"op":"query","millis":{"$gte":100}}'
```

_See code: [src/commands/profiler/list.ts](https://github.com/lipanpan-hub/mongodev/blob/v0.0.0/src/commands/profiler/list.ts)_

## `mgd profiler reset`

重置 MongoDB 的 Profiler，将采集粒度设置为 1（slow operations）

```
USAGE
  $ mgd profiler reset [--slowms <value>] [-u <value>]

FLAGS
  -u, --uri=<value>     [default: mongodb://localhost:27017] MongoDB 连接 URI
      --slowms=<value>  profiler 慢操作阈值（毫秒），未指定则保持 MongoDB 当前 slowms

DESCRIPTION
  重置 MongoDB 的 Profiler，将采集粒度设置为 1（slow operations）

EXAMPLES
  $ mgd profiler reset

  $ mgd profiler reset -u mongodb://localhost:27017

  $ mgd profiler reset --slowms 50
```

_See code: [src/commands/profiler/reset.ts](https://github.com/lipanpan-hub/mongodev/blob/v0.0.0/src/commands/profiler/reset.ts)_

## `mgd profiler show`

查看指定数据库的 Profiler 状态信息

```
USAGE
  $ mgd profiler show [-d <value>] [-u <value>]

FLAGS
  -d, --db=<value>   数据库名，未指定则通过交互方式选择
  -u, --uri=<value>  [default: mongodb://localhost:27017] MongoDB 连接 URI

DESCRIPTION
  查看指定数据库的 Profiler 状态信息

EXAMPLES
  $ mgd profiler show

  $ mgd profiler show -d mydb

  $ mgd profiler show -d mydb -u mongodb://localhost:27017
```

_See code: [src/commands/profiler/show.ts](https://github.com/lipanpan-hub/mongodev/blob/v0.0.0/src/commands/profiler/show.ts)_

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
