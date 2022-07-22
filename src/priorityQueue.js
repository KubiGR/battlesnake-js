export class PriorityQueue {
  array = [];

  print() {
    console.log(this.array);
  }

  enqueue(newMem) {
    if (this.isEmpty()) {
      this.array.push(newMem);
    } else {
      let added = false;
      for (let i = 0; i < this.array.length; i++) {
        if (newMem[1] < this.array[i][1]) {
          this.array.splice(i, 0, newMem);
          added = true;
          break;
        }
      }
      if (!added) {
        this.array.push(newMem);
      }
    }
  }

  dequeue() {
    return this.array.shift();
  }

  front() {
    return this.array[0];
  }

  size() {
    return this.array.length;
  }

  isEmpty() {
    return this.array.length === 0;
  }

  includes(value) {
    return this.array.findIndex((m) => m[0] === value) > -1;
  }
}
