import { getOptionState } from "./getOptionState";

describe("getOptionState", () => {
  it('returns "inactive" when isOpened is falsy', () => {
    expect(getOptionState(false, false, true)).toBe("inactive");
    expect(getOptionState(true, false, false)).toBe("inactive");
    expect(getOptionState(undefined, undefined, false)).toBe("inactive");
    expect(getOptionState(true, undefined, true)).toBe("inactive");
  });

  it('returns "selected" when isOpened is true and isAnswered is falsy', () => {
    expect(getOptionState(false, true, false)).toBe("selected");
    expect(getOptionState(false, true, true)).toBe("selected");
    expect(getOptionState(undefined, true, false)).toBe("selected");
    expect(getOptionState(undefined, true, true)).toBe("selected");
  });

  it('returns "correct" when isOpened and isAnswered are true and isCorrect is true', () => {
    expect(getOptionState(true, true, true)).toBe("correct");
  });

  it('returns "wrong" when isOpened and isAnswered are true and isCorrect is false', () => {
    expect(getOptionState(true, true, false)).toBe("wrong");
  });
});
