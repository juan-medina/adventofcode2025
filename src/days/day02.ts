// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export function invalidId(id: number): boolean {
	let str = id.toString();
	if (str.length % 2 === 0) {
		const first = str.slice(0, Math.floor(str.length / 2));
		const last = str.slice(Math.floor(str.length / 2));
		if (first === last) {
			return true
		}
	}
	return false;
}

export class Range {
	constructor(public first: number, public last: number) {
	}

	toIds(): number[] {
		const out: number[] = [];
		for (let n = this.first; n <= this.last; n++) {
			out.push(n);
		}
		return out;
	}

	invalidIds(): number[] {
		const out: number[] = [];
		for (let id = this.first; id <= this.last; id++) {
			if (invalidId(id)) {
				out.push(id);
			}
		}
		return out;
	}
}

export class Day02 extends Day {
	part1(input: string): string {
		var totalInvalid = 0;

		const ranges = this.parse(input);
		for (const range of ranges) {
			const invalidIds = range.invalidIds();
			for (const id of invalidIds) {
				totalInvalid += id;
			}
		}
		return totalInvalid.toString();
	}

	part2(input: string): string {
		return "not implemented yet";
	}

	public range(value: string): Range {
		const re = /^([0-9]+)-([0-9]+)$/;
		const m = re.exec(value);
		if (!m) {
			throw new Error(`Invalid input format: '${value}'`);
		}
		const first = parseInt(m[1], 10);
		const last = parseInt(m[2], 10);
		return new Range(first, last);
	}

	public parse(input: string): Range[] {
		const parts = input.split(",");
		return parts.map((part) => this.range(part.trim()));
	}
}

export const day02 = new Day02();
