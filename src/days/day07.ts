// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export enum Space {
	Start = "S",
	Empty = ".",
	Splitter = "^",
	Beam = "|",
}

export interface Size {
	width: number;
	height: number;
}

export interface Position {
	x: number;
	y: number;
}

export class Tachyon {
	map: string[] = [];
	size: Size = {width: 0, height: 0}
	start: Position = {x: 0, y: 0};

	constructor(width = 0, height = 0) {
		this.size = {width, height};
		for (let i = 1; i < this.size.width; i++) {
			this.map.push("".padStart(this.size.width, Space.Empty));
		}
	}

	static from(input: string): Tachyon {
		const tachyon = new Tachyon();
		tachyon.map = input.split("\n");
		tachyon.size.height = tachyon.map.length;
		tachyon.size.width = tachyon.map[0].length;
		for (let y = 0; y < tachyon.size.height; y++) {
			for (let x = 0; x < tachyon.size.width; x++) {
				if (tachyon.map[y][x] === Space.Start) {
					tachyon.start = {x, y};
				}
			}
		}
		return tachyon;
	}

	at(x: number, y: number): Space {
		return this.map[y][x] as Space;
	}

	set(x: number, y: number, value: Space) {
		const row = this.map[y];
		this.map[y] = row.substring(0, x) + value + row.substring(x + 1);
	}

	string(): string {
		return this.map.join("\n");
	}

	shoot(part: number): number {
		if (part === 1) {
			return this.traverse(this.start.x, this.start.y);
		}
		this.cache.clear()
		return this.paths(this.start.x, this.start.y);
	}

	traverse(x: number, y: number): number {
		let splits = 0;
		if (y + 1 < this.size.height) { // can we go down?
			if (this.at(x, y + 1) === Space.Empty) {
				this.set(x, y + 1, Space.Beam);
				return this.traverse(x, y + 1);
			} else {
				if (this.at(x, y + 1) === Space.Splitter) {
					splits += 1;
					if (x - 1 >= 0 && this.at(x - 1, y + 1) === Space.Empty) { // left
						this.set(x - 1, y + 1, Space.Beam);
						splits += this.traverse(x - 1, y + 1);
					}
					if (x + 1 < this.size.width && this.at(x + 1, y + 1) === Space.Empty) { // right
						this.set(x + 1, y + 1, Space.Beam);
						splits += this.traverse(x + 1, y + 1);
					}
				}
			}
		}

		return splits
	}


	private cache: Map<string, number> = new Map();

	paths(x: number, y: number): number {
		const key = `${x},${y}`;
		if (this.cache.has(key)) return this.cache.get(key)!;

		let result: number;
		if (y + 1 >= this.size.height) { // bottom reached
			result = 1;
			this.cache.set(key, result);
			return result;
		}

		const below = this.at(x, y + 1);

		if (below === Space.Splitter) {
			let paths = 0; // paths from left and right
			if (x - 1 >= 0 && this.at(x - 1, y + 1) === Space.Empty) {
				paths += this.paths(x - 1, y + 1);
			}
			if (x + 1 < this.size.width && this.at(x + 1, y + 1) === Space.Empty) {
				paths += this.paths(x + 1, y + 1);
			}
			result = paths;
			this.cache.set(key, result);
			return result;
		}

		result = this.paths(x, y + 1);
		this.cache.set(key, result);
		return result;
	}

}

export class Day07 extends Day {

	part1(input: string): string {
		return Tachyon.from(input).shoot(1).toString();
	}

	part2(input: string): string {
		return Tachyon.from(input).shoot(2).toString();
	}
}

export const day07 = new Day07();
