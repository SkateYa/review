class RequestLimit {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.queue = [];
  }
  
  async add(fn) {
    if (this.count < this.limit) {
      this.count++;
      return fn().finally(() => {
        this.count--;
        this.next();
      });
    } else {
      return new Promise(resolve => {
        this.queue.push(() => {
          this.count++;
          resolve(fn().finally(() => {
            this.count--;
            this.next();
          }));
        });
      });
    }
  }
  
  next() {
    if (this.count < this.limit && this.queue.length > 0) {
      const fn = this.queue.shift();
      fn();
    }
  }
}

const limit = new RequestLimit(5);

for (let i = 0; i < 20; i++) {
  limit.add(() => fetch(`https://jsonplaceholder.typicode.com/todos/${i}`).then(res => res.json())).then(console.log);
}