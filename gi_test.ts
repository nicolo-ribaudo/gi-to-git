import { assertEquals } from "https://deno.land/std@0.194.0/testing/asserts.ts";
import { cleanLeadingT, isHelp } from "./gi.ts";

Deno.test("cleanLeadingT with empty args", () => {
  assertEquals(cleanLeadingT([]), []);
});

Deno.test("cleanLeadingT with leading t", () => {
  assertEquals(cleanLeadingT(["tstatus"]), ["status"]);
  assertEquals(cleanLeadingT(["tstatus", "--all"]), ["status", "--all"]);
  assertEquals(cleanLeadingT(["t", "status"]), ["status"]);
  assertEquals(cleanLeadingT(["t", "status", "--all"]), ["status", "--all"]);
});

Deno.test("cleanLeadingT without leading t", () => {
  assertEquals(cleanLeadingT(["status"]), ["status"]);
  assertEquals(cleanLeadingT(["status", "--all"]), ["status", "--all"]);
});

Deno.test("isHelp", () => {
  assertEquals(isHelp([]), true);
  assertEquals(isHelp(["help"]), true);
  assertEquals(isHelp(["--help"]), true);
  assertEquals(isHelp(["-h"]), true);
  assertEquals(isHelp(["status", "help"]), false);
  assertEquals(isHelp(["status"]), false);
});
