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

	public rollAt(point: Point): boolean {
		return this.rolls.some(roll => roll.x === point.x && roll.y === point.y);
	}

	public rollsAround(point: Point): number {
		const rolls: Point[] = [];
		for (const dir of directions) {
			const checkPoint: Point = {x: point.x + dir.x, y: point.y + dir.y};
			if (this.rollAt(checkPoint)) {
				rolls.push(checkPoint);
			}
		}
		return rolls.length;
	}

	public solve(): number {
		return this.rolls.reduce(
			(count, roll) => count + (this.rollsAround(roll) < 4 ? 1 : 0),
			0
		);
	}
}

export class Day04 extends Day {
	part1(input: string): string {
		return this.parse(input).solve().toString();
	}

	part2(input: string): string {
		return "";
	}

	private static RollChar = '@';

	parse(input: string): Department {
		const lines = input.split("\n");
		const department = new Department();
		for (let y = 0; y < lines.length; y++) {
			const line = lines[y];
			for (let x = 0; x < line.length; x++) {
				const char = line[x];
				if (char === Day04.RollChar) {
					department.rolls.push({x, y});
				}
			}
		}
		return department;
	}
}

export const day04 = new Day04();
