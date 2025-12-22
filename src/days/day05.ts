// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";


export class Range {
	start: number;
	end: number;

	constructor(start: number, end: number) {
		this.start = start;
		this.end = end;
	}

	contains(value: number): boolean {
		return value >= this.start && value <= this.end;
	}

	size(): number {
		return this.end - this.start + 1;
	}

	static fromString(rangeStr: string): Range {
		const [star, end] = rangeStr.split("-");
		return new Range(parseInt(star, 10), parseInt(end, 10));
	}

	static merge(ranges: Range[]): Range[] {
		ranges.sort((a, b) => a.start - b.start);
		const merged: Range[] = [];
		let current = ranges[0];

		for (let i = 1; i < ranges.length; i++) {
			const range = ranges[i];
			if (current.end >= range.start - 1) {
				current.end = Math.max(current.end, range.end);
			} else {
				merged.push(current);
				current = range;
			}
		}
		merged.push(current);
		return merged;
	}
}

export class Database {
	fresh: Range[] = [];
	ingredients: number[] = [];

	compact() {
		this.fresh = Range.merge(this.fresh);
	}

	static fromString(input: string): Database {
		const db = new Database();
		for (const line of input.split("\n")) {
			if (line.includes("-")) {
				db.fresh.push(Range.fromString(line));
			} else if (line.trim() !== "") {
				db.ingredients.push(parseInt(line, 10));
			}
		}
		db.compact();
		return db;
	}

	freshIngredients(part: number): number {
		if (part === 1) return this.ingredients.reduce(
			(count, ingredient) => this.fresh.some(range => range.contains(ingredient)) ? count + 1 : count,0);

		return this.fresh.reduce((sum, range) => sum + range.size(), 0);
	};
}

export class Day05 extends Day {
	part1(input: string): string {
		return Database.fromString(input).freshIngredients(1).toString();
	}

	part2(input: string): string {
		return Database.fromString(input).freshIngredients(2).toString();
	}
}

export const day05 = new Day05();
