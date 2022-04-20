class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.direction = "down";
  }

  add(data) {
    const newNode = new Node(data);

    let current;

    if (!this.head) {
      this.head = newNode;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  getNewCoords(coords, direction) {
    if (direction === "up") {
      coords.y -= 1;
    } else if (direction === "down") {
      coords.y += 1;
    } else if (direction === "left") {
      coords.x -= 1;
    } else if (direction === "right") {
      coords.x += 1;
    }
    return coords;
  }

  move(direction) {
    let current = this.head.next;
    let prev = JSON.parse(JSON.stringify(this.head));
    this.head.data = this.getNewCoords(this.head.data, direction);

    while (current) {
      current.data.x = prev.data.x;
      current.data.y = prev.data.y;
      prev = prev.next;
      current = current.next;
    }
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

const linkedList = new LinkedList();

linkedList.add({ x: 10, y: 10 });
linkedList.add({ x: 10, y: 9 });
linkedList.add({ x: 10, y: 8 });
linkedList.add({ x: 10, y: 7 });

