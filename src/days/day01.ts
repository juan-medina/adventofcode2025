// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export enum Direction {
	Left = "L",
	Right = "R",
}

export interface Sequence {
	direction: Direction;
	steps: number;
}

export class Day01 extends Day {

	public position: number = 50;

	private solve(input: string, part: number): string {
		this.position = 50; // reset position for each part
		var totalZeros = 0;
		var sequences = this.parse(input);
		console.log(`The dial starts by pointing at ${this.position}`);

		for (const seq of sequences) {
			const directionFactor = seq.direction === Direction.Left ? -1 : 1;
			for (let step = 0; step < seq.steps; step++) {
				this.position += directionFactor;
				if (this.position < 0) {
					this.position = 99;
				} else if (this.position > 99) {
					this.position = 0;
				}
				if (part === 2 && this.position === 0) {
					totalZeros++;
				}
			}
			if (part === 1 && this.position === 0) {
				totalZeros++;
			}
		}
		return totalZeros.toString();
	}

	part1(input: string): string {
		return this.solve(input, 1);
	}

	part2(input: string): string {
		return this.solve(input, 2);
	}

	public parse(input: string): Sequence[] {
		return input
			.split(/\r?\n/)
			.map(line => line.trim())
			.filter(Boolean)
			.map(line => {
				const m = line.match(/^([LR])\s*(\d+)$/i);
				if (!m) throw new Error(`Invalid sequence line: ${line}`);
				const letter = m[1].toUpperCase();
				const direction = letter as Direction; // assume valid `L` or `R`
				const steps = Number(m[2]);
				return {direction, steps};
			});
	}


}

export const day01 = new Day01();