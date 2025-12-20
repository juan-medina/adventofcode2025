// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";


interface Battery {
	value: number;
	index: number;
}

export class Bank {
	batteries: Battery[];

	constructor(batteries: Battery[]) {
		this.batteries = batteries;
	}

	static fromLine(line: string): Bank {
		const values = line.split("").map(ch => parseInt(ch, 10));
		const batteries = values.map((v, i) => ({
			value: v, index: i
		}));
		return new Bank(batteries);
	}

	public joltage(): number {
		if (this.batteries.length === 0) return 0;
		if (this.batteries.length === 1) return this.batteries[0].value;

		let max = Number.NEGATIVE_INFINITY;
		for (let i = 0; i < this.batteries.length - 1; i++) {
			const a = this.batteries[i].value;
			for (let j = i + 1; j < this.batteries.length; j++) {
				const b = this.batteries[j].value;
				const both = a * 10 + b;
				if (both > max) max = both;
			}
		}

		return max;
	}
}

export class Day03 extends Day {

	part1(input: string): string {
		return this.parse(input).reduce((sum, bank) => sum + bank.joltage(), 0).toString();
	}

	part2(input: string): string {
		return this.part1(input);
	}

	parse(input: string): Bank[] {
		return input.split("\n").map(line => Bank.fromLine(line));
	}
}

export const day03 = new Day03();
