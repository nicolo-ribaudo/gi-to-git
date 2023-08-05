#!/usr/bin/env -S deno run --allow-run=git

export function cleanLeadingT(args: string[]): string[] {
  if (args.length > 0 && args[0].startsWith("t")) {
    const other = args.slice(1)
    if (args[0] !== "t") other.unshift(args[0].slice(1));
    return other;
  } else {
    return args;
  }
}

const HELP_COMMANDS = new Set(["help", "--help", "-h"]);

export function isHelp(args: string[]): boolean {
  return args.length === 0 || (args.length === 1 && HELP_COMMANDS.has(args[0]));
}

if (import.meta.main) {
  const args = cleanLeadingT(Deno.args);

  if (isHelp(args)) {
    console.log(`\
gi: automatically fix accidentally writing a space after
    'gi' when running 'git' commands

===========================================================${/*60*/ ""}
`);
  }

  new Deno.Command("git", { stdout: "inherit", args }).spawn();
}
