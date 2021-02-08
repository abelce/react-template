import { sum } from "..";

describe("utils目录测试", () => {
  it("sum", () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
