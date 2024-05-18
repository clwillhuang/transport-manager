// Priority queue implementation by by Wim Jongeneel, (Jul 5, 2020)
// https://itnext.io/priority-queue-in-typescript-6ef23116901

export interface PriorityQueueNode<T> {
    key: number
    value: T
}

export class PriorityQueue<T> {
    private heap: PriorityQueueNode<T>[] = [];

    constructor() {
        this.heap = [];
    }

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private left(index: number): number {
        return 2 * index + 1;
    }

    private right(index: number): number {
        return 2 * index + 2;
    }

    private hasLeft(index: number): boolean {
        return this.left(index) < this.heap.length;
    }

    private hasRight(index: number): boolean {
        return this.right(index) < this.heap.length;
    }

    private swap(a: number, b: number): void {
        const tmp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = tmp;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    peek(): T | null {
        return this.isEmpty() ? null : this.heap[0].value;
    }

    size(): number {
        return this.heap.length;
    }

    insert(item: T, prio: number): void {
        this.heap.push({ key: prio, value: item });

        let i = this.heap.length - 1;
        while (i > 0) {
            const p = this.parent(i);
            if (this.heap[p].key < this.heap[i].key) break;
            this.swap(i, p);
            i = p;
        }
    }


    pop(): T | null {
        if (this.isEmpty()) return null;

        this.swap(0, this.heap.length - 1);
        const item = this.heap.pop();

        let current = 0;
        while (this.hasLeft(current)) {
            let smallerChild = this.left(current);
            if (this.hasRight(current) && this.heap[this.right(current)].key < this.heap[this.left(current)].key)
                smallerChild = this.right(current);

            if (this.heap[smallerChild].key > this.heap[current].key) break;

            this.swap(current, smallerChild);
            current = smallerChild;
        }

        return item!.value;
    }
}
