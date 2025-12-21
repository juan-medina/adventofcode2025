// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";


export interface Point {
	x: number;
	y: number;
}

const directions: Point[] = [
	{x: -1, y: -1},
	{x: 0, y: -1},
	{x: 1, y: -1},

	{x: -1, y: 0},
	{x: 1, y: 0},

	{x: -1, y: 1},
	{x: 0, y: 1},
	{x: 1, y: 1},
];

export class Department {
	rolls: Point[] = [];

	public has(point: Point): boolean {
		return this.rolls.some(roll => roll.x === point.x && roll.y === point.y);
	}

	public can(point: Point): boolean {
		let total = 0;
		for (const dir of directions) {
			if (this.has({x: point.x + dir.x, y: point.y + dir.y})) total++;
			if(total>3) return false;
		}
		return true;
	}

	public solve(part: number): number {
		let total = 0;
		let more = true;
		while (more) {
			let round = 0;
			const remaining: Point[] = [];
			for (const roll of this.rolls) {
				if (this.can(roll)) {
					round++;
				} else {
					remaining.push(roll);
				}
			}
			total += round;
			this.rolls = remaining;
			if (part === 1 || round === 0) {
				more = false;
			}
		}

		return total;
	}
}

export class Day04 extends Day {
	part1(input: string): string {
		return this.parse(input).solve(1).toString();
	}

	part2(input: string): string {
		return this.parse(input).solve(2).toString();
	}

	parse(input: string): Department {
		const lines = input.split("\n");
		const department = new Department();
		for (let y = 0; y < lines.length; y++) {
			const line = lines[y];
			for (let x = 0; x < line.length; x++) {
				const char = line[x];
				if (char === '@') {
					department.rolls.push({x, y});
				}
			}
		}
		return department;
	}
}

export const day04 = new Day04();
