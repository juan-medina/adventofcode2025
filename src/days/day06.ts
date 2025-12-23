// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export enum Operation {
	ADD = "+",
	MULT = "*",
}

export interface Column {
	start: number;
	end: number;
}

class Problem {
	operands: number[] = [];
	operation: Operation = Operation.ADD;

	add(item: string) {
		const num = parseInt(item, 10);
		if (!isNaN(num)) {
			this.operands.push(num);
			return;
		}
		this.operation = item as Operation;
	}

	parse(rows: string[], part: number) {
		if (part == 1) {
			for (const row of rows) {
				this.add(row.trim());
			}
		} else {
			for (let i = rows[0].length - 1; i >= 0; i--) {
				let num = "";
				for (let r = 0; r < rows.length - 1; r++) {
					num += rows[r][i];
				}
				this.add(num.trim());
			}
			this.add(rows[rows.length - 1].trim());
		}
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

	static columns(lines: string[]): Column[] {
		const items: Column[] = [];
		const line = lines[lines.length - 1];

		for (let i = 0; i < line.length; i++) {
			const ch = line[i];
			if (ch === "+" || ch === "*") {
				items.push({start: i, end: i});
			}
		}

		items[items.length - 1].end = lines.reduce((a, b) => (a.length >= b.length ? a : b), "").length - 1;
		for (let i = 0; i < items.length - 1; i++) {
			items[i].end = items[i + 1].start - 2;
		}
		return items;
	}

	static data(lines: string[], column: Column): string[] {
		const items: string[] = [];
		for (let row = 0; row < lines.length; row++) {
			let item = lines[row].substring(column.start, column.end + 1);
			const padded = item + " ".repeat(Math.max(0, column.end - column.start + 1 - item.length));
			items.push(padded);
		}
		return items;
	}

	static from(input: string, part: number): Problem[] {
		const lines = input.split("\n");
		const columns = this.columns(lines);
		const problems: Problem[] = Array.from({length: columns.length}, () => new Problem());
		for (let col = 0; col < columns.length; col++) {
			problems[col].parse(this.data(lines, columns[col]), part);
		}
		return problems;
	}
}

export default Problem

export class Day06 extends Day {

	solve(input: string, part: number): number {
		return Problem.from(input, part).reduce((acc, curr) => acc + curr.result(), 0);
	}

	part1(input: string): string {
		return this.solve(input, 1).toString();
	}

	part2(input: string): string {
		return this.solve(input, 2).toString();
	}
}

export const day06 = new Day06();
