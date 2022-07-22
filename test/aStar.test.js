import { buildGrid, insertIntoGrid } from "../src/utils";
import { aStar } from "../src/aStar";

describe("aStar algorithm", () => {
  test("should get no path", () => {
    const grid = buildGrid(3, 3, 0);
    insertIntoGrid(grid, 1, 0, -1);
    insertIntoGrid(grid, 1, 1, -1);
    insertIntoGrid(grid, 1, 2, -1);
    const path = aStar(grid, 0, 0, 2, 2);
    expect(path.length).toBe(0);
  });

  test("should get easy path", () => {
    const grid = buildGrid(3, 3, 0);
    insertIntoGrid(grid, 1, 0, -1);
    insertIntoGrid(grid, 1, 1, -1);
    const path = aStar(grid, 0, 0, 2, 2);
    expect(path.length).toBe(5);
  });

  test("should get path with wall in middle", () => {
    const grid = buildGrid(4, 4, 0);
    insertIntoGrid(grid, 2, 0, -1);
    insertIntoGrid(grid, 2, 1, -1);
    insertIntoGrid(grid, 2, 2, -1);
    const path = aStar(grid, 0, 0, 3, 0);
    expect(path.length).toBe(10);
  });

  test("should get path with wall in middle and two ways available", () => {
    const grid = buildGrid(4, 4, 0);
    insertIntoGrid(grid, 2, 1, -1);
    insertIntoGrid(grid, 2, 2, -1);
    const path = aStar(grid, 0, 0, 3, 2);
    expect(path.length).toBe(6);
  });
});
