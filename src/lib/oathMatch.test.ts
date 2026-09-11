import { describe, expect, test } from "vitest";
import { matchesClosingPhrase, matchesOath } from "./oathMatch";

describe("matchesOath", () => {
  test("accepts the exact canonical phrase", () => {
    expect(matchesOath("I solemnly swear that I am up to no good")).toBe(true);
  });

  test("accepts different casing and punctuation", () => {
    expect(matchesOath("i solemnly swear, that i am up to no good!")).toBe(true);
  });

  test("accepts the common contraction 'I'm' in place of 'I am'", () => {
    expect(matchesOath("I solemnly swear that I'm up to no good")).toBe(true);
  });

  test("accepts a minor mishearing (missing a single small word)", () => {
    expect(matchesOath("I solemnly swear I am up to no good")).toBe(true);
  });

  test("rejects an unrelated phrase", () => {
    expect(matchesOath("what time is the train to platform nine")).toBe(false);
  });

  test("rejects an empty string", () => {
    expect(matchesOath("")).toBe(false);
  });
});

describe("matchesClosingPhrase", () => {
  test("accepts the exact canonical phrase", () => {
    expect(matchesClosingPhrase("Mischief managed")).toBe(true);
  });

  test("accepts different casing and punctuation", () => {
    expect(matchesClosingPhrase("mischief managed!")).toBe(true);
  });

  test("rejects an unrelated phrase", () => {
    expect(matchesClosingPhrase("I solemnly swear that I am up to no good")).toBe(
      false
    );
  });

  test("rejects an empty string", () => {
    expect(matchesClosingPhrase("")).toBe(false);
  });
});
