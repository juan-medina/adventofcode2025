// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export class Bank {
	batteries: number[];

	constructor(batteries: number[]) {
		this.batteries = batteries;
	}

	static fromLine(line: string): Bank {
		return new Bank(line.split("").map(ch => parseInt(ch, 10)));
	}

	public joltage(batteries: number): number { // remove k-digits like algorithm
		const stack: number[] = [];
		let removing = this.batteries.length - batteries; // how many we drop

		for (let i = 0; i < this.batteries.length; i++) {
			const digit = this.batteries[i];
			while (stack.length > 0 && removing > 0 && stack[stack.length - 1] < digit) {
				stack.pop();
				removing--;
			}
			stack.push(digit);
		}
		return parseInt(stack.slice(0, batteries).join(""), 10);
	}
}

export class Day03 extends Day {
	solve(input: string, part: number): string {
		return this.parse(input).reduce((sum, bank) => sum + bank.joltage(part === 1 ? 2 : 12), 0).toString();
	}

	part1(input: string): string {
		return this.solve(input, 1);
	}

	part2(input: string): string {
		return this.solve(input, 2);
	}

	parse(input: string): Bank[] {
		return input.split("\n").map(line => line.trim()).map(line => Bank.fromLine(line));
	}
}

export const day03 = new Day03();
