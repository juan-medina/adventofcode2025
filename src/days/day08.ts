// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

interface Edge {
	i: number;
	j: number;
	d: number;
}

export class Point {
	x: number
	y: number
	z: number

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	distance(other: Point): number {
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		const dz = this.z - other.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}

	static from(data: string): Point {
		const [x, y, z] = data.split(',').map(Number);
		return new Point(x, y, z);
	}

	static parse(lines: string): Point[] {
		return lines.split('\n').map(line => Point.from(line));
	}

	static edges(points: Point[]): Edge[] {
		const edges: Edge[] = [];
		for (let i = 0; i < points.length; i++) {
			for (let j = i + 1; j < points.length; j++) {
				const d = points[i].distance(points[j]);
				edges.push({i, j, d});
			}
		}
		edges.sort((a, b) => a.d - b.d);
		return edges;
	}
}

class DisjointSet {
	parent: number[];
	size: number[];

	constructor(n: number) {
		this.parent = new Array(n);
		this.size = new Array(n).fill(1);
		for (let i = 0; i < n; i++) this.parent[i] = i;
	}

	find(a: number): number {
		while (this.parent[a] !== a) {
			this.parent[a] = this.parent[this.parent[a]];
			a = this.parent[a];
		}
		return a;
	}

	union(a: number, b: number): boolean {
		let ra = this.find(a);
		let rb = this.find(b);
		if (ra === rb) return false;
		if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
		this.parent[rb] = ra;
		this.size[ra] += this.size[rb];
		return true;
	}

	sizes(): number[] {
		const map = new Map<number, number>();
		for (let i = 0; i < this.parent.length; i++) {
			const r = this.find(i);
			map.set(r, (map.get(r) ?? 0) + 1);
		}
		return Array.from(map.values());
	}
}

export class Day08 extends Day {
	connections: number = 1000;

	solve(input: string, part: number): number {
		const points: Point[] = Point.parse(input);
		const edges = Point.edges(points);
		const set = new DisjointSet(points.length);
		const limit = part === 1 ? this.connections : edges.length;
		let components = points.length;
		for (let connection = 0; connection < limit; connection++) {
			const edge = edges[connection];
			if (set.union(edge.i, edge.j) && part == 2) {
				components--;
				if (components === 1) {
					return points[edge.i].x * points[edge.j].x;
				}
			}
		}

		return set.sizes().sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b);
	}

	part1(input: string): string {
		return this.solve(input, 1).toString();
	}


	part2(input: string): string {
		return this.solve(input, 2).toString();
	}
}

export const day08 = new Day08();
