import { describe, expect, test } from "vitest";
import { getLocationById, locations } from "./locations";

describe("locations data", () => {
  test("has exactly 8 entries", () => {
    expect(locations).toHaveLength(8);
  });

  test("every entry has a unique id", () => {
    const ids = locations.map((location) => location.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getLocationById", () => {
  test("returns the matching location for a known id", () => {
    const result = getLocationById("great-hall");
    expect(result?.name).toBe("Great Hall");
  });

  test("returns undefined for an unknown id", () => {
    expect(getLocationById("chamber-of-secrets")).toBeUndefined();
  });

  test("returns undefined for a null id", () => {
    expect(getLocationById(null)).toBeUndefined();
  });
});
