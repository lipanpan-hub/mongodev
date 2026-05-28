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
* [`mgd hello PERSON`](#mgd-hello-person)
* [`mgd hello world`](#mgd-hello-world)
* [`mgd help [COMMAND]`](#mgd-help-command)
* [`mgd plugins`](#mgd-plugins)
* [`mgd plugins add PLUGIN`](#mgd-plugins-add-plugin)
* [`mgd plugins:inspect PLUGIN...`](#mgd-pluginsinspect-plugin)
* [`mgd plugins install PLUGIN`](#mgd-plugins-install-plugin)
* [`mgd plugins link PATH`](#mgd-plugins-link-path)
* [`mgd plugins remove [PLUGIN]`](#mgd-plugins-remove-plugin)
* [`mgd plugins reset`](#mgd-plugins-reset)
* [`mgd plugins uninstall [PLUGIN]`](#mgd-plugins-uninstall-plugin)
* [`mgd plugins unlink [PLUGIN]`](#mgd-plugins-unlink-plugin)
* [`mgd plugins update`](#mgd-plugins-update)

## `mgd hello PERSON`

Say hello

```
USAGE
  $ mgd hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ mgd hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/lipanpan-hub/mongodev/blob/v0.0.0/src/commands/hello/index.ts)_

## `mgd hello world`

Say hello world

```
USAGE
  $ mgd hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ mgd hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/lipanpan-hub/mongodev/blob/v0.0.0/src/commands/hello/world.ts)_

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

## `mgd plugins`

List installed plugins.

```
USAGE
  $ mgd plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ mgd plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.69/src/commands/plugins/index.ts)_

## `mgd plugins add PLUGIN`

Installs a plugin into mgd.

```
USAGE
  $ mgd plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into mgd.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MGD_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MGD_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ mgd plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ mgd plugins add myplugin

  Install a plugin from a github url.

    $ mgd plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ mgd plugins add someuser/someplugin
```

## `mgd plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ mgd plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ mgd plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.69/src/commands/plugins/inspect.ts)_

## `mgd plugins install PLUGIN`

Installs a plugin into mgd.

```
USAGE
  $ mgd plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into mgd.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MGD_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MGD_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ mgd plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ mgd plugins install myplugin

  Install a plugin from a github url.

    $ mgd plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ mgd plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.69/src/commands/plugins/install.ts)_

## `mgd plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ mgd plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ mgd plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.69/src/commands/plugins/link.ts)_

## `mgd plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ mgd plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ mgd plugins unlink
  $ mgd plugins remove

EXAMPLES
  $ mgd plugins remove myplugin
```

## `mgd plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ mgd plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.69/src/commands/plugins/reset.ts)_

## `mgd plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ mgd plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ mgd plugins unlink
  $ mgd plugins remove

EXAMPLES
  $ mgd plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.69/src/commands/plugins/uninstall.ts)_

## `mgd plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ mgd plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ mgd plugins unlink
  $ mgd plugins remove

EXAMPLES
  $ mgd plugins unlink myplugin
```

## `mgd plugins update`

Update installed plugins.

```
USAGE
  $ mgd plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.69/src/commands/plugins/update.ts)_
<!-- commandsstop -->
