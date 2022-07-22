import { PriorityQueue } from "../src/priorityQueue";

describe("PriorityQueue", () => {
  test("should return queue in correct order", () => {
    var pq = new PriorityQueue();
    pq.enqueue(["Google", 2]);
    pq.enqueue(["Bing", 3]);
    pq.enqueue(["Microsoft", 1]);
    pq.enqueue(["Apple", 2]);
    expect(pq.array[0]).toStrictEqual(["Microsoft", 1]);
    expect(pq.array[1]).toStrictEqual(["Google", 2]);
    expect(pq.array[2]).toStrictEqual(["Apple", 2]);
    expect(pq.array[3]).toStrictEqual(["Bing", 3]);
  });

  test("should return queue in correct order", () => {
    var pq = new PriorityQueue();
    pq.enqueue(["Google", 2]);
    pq.enqueue(["Bing", 3]);
    pq.enqueue(["Microsoft", 1]);
    pq.enqueue(["Apple", 2]);
    expect(pq.includes("Google")).toBe(true);
  });
});
