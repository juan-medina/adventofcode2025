// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export enum Operation {
	ADD = "+",
	MULT = "*",
}

export class Problem {
	operands: number[] = [];
	operation: Operation = Operation.ADD;

	parse(item: string) {
		const num = parseInt(item, 10);
		if (!isNaN(num)) {
			this.operands.push(num);
			return;
		}
		this.operation = item as Operation;
	}

	map: Record<Operation, (a: number, b: number) => number>;

	constructor() {
		this.map = {
			[Operation.ADD]: (n1: number, n2: number): number => n1 + n2,
			[Operation.MULT]: (n1: number, n2: number): number => n1 * n2,
		};
	}

	result(): number {
		return this.operands.reduce((acc, curr) => {
			return this.map[this.operation](acc, curr);
		}, this.operation === Operation.ADD ? 0 : 1);
	}

	static from(input: string): Problem[] {
		const lines = input.split("\n");
		const numCols = lines[0].split(/\s+/).length;
		const problems: Problem[] = Array.from({ length: numCols }, () => new Problem());
		for (let row = 0; row < lines.length; row++) {
			const items = lines[row].trim().split(/\s+/);
			for (let col = 0; col < numCols; col++) {
				problems[col].parse(items[col]);
			}
		}
		return problems;
	}
}

export class Day06 extends Day {

	solve(input: string): number {
		const problems = Problem.from(input);
		return problems.reduce((acc, curr) => acc + curr.result(), 0);
	}

	part1(input: string): string {
		return this.solve(input).toString();
	}

	part2(input: string): string {
		throw new Error("Method not implemented.");
	}
}

export const day06 = new Day06();

export class Database {
}