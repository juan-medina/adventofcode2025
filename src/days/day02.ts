// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export function repeated(id: number): number {
	const str = id.toString();
	const halfLength = Math.floor(str.length / 2);
	for (let len = halfLength; len >= 1; len--) {
		if (str.length % len !== 0) {
			continue; // cant fill the whole string
		}
		const chunk = str.slice(0, len);
		const repeats = str.length / len; // how many to repeat
		if (chunk.repeat(repeats) === str) {
			return repeats;
		}
	}
	return 0;
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

	invalidIds(max: number): number[] {
		const out: number[] = [];
		for (let id = this.first; id <= this.last; id++) {
			const repeats = repeated(id);
			(repeats > 0 && repeats <= max) && out.push(id);
		}
		return out;
	}
}

export class Day02 extends Day {
	solve(input: string, part: number): string {
		var totalInvalid = 0;
		for (const range of this.parse(input)) {
			for (const id of range.invalidIds(part == 1 ? 2 : 99)) {
				totalInvalid += id;
			}
		}
		return totalInvalid.toString();
	}

	part1(input: string): string {
		return this.solve(input, 1);
	}

	part2(input: string): string {
		return this.solve(input, 2);
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
