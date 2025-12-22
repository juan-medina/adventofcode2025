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

	array(): number[] {
		const result: number[] = [];
		for (let i = this.start; i <= this.end; i++) {
			result.push(i);
		}
		return result;
	}

	static fromString(rangeStr: string): Range {
		const [startStr, endStr] = rangeStr.split("-");
		const start = parseInt(startStr, 10);
		const end = parseInt(endStr, 10);
		return new Range(start, end);
	}
}

export class Database {
	fresh: Range[] = [];
	ingredients: number[] = [];

	static fromString(input: string): Database {
		const db = new Database();
		for (const line of input.split("\n")) {
			if (line.includes("-")) {
				db.fresh.push(Range.fromString(line));
			} else if (line.trim() !== "") {
				db.ingredients.push(parseInt(line, 10));
			}
		}
		return db;
	}

	freshIngredients(): number {
		let total = 0;
		for (const ingredient of this.ingredients) {
			for (const range of this.fresh) {
				if (range.contains(ingredient)) {
					total++;
					break;
				}
			}
		}
		return total;
	};
}

export class Day05 extends Day {
	part1(input: string): string {
		const db = Database.fromString(input);
		const freshCount = db.freshIngredients();
		return freshCount.toString();
	}

	part2(input: string): string {
		throw new Error("Method not implemented.");
	}
}

export const day05 = new Day05();
