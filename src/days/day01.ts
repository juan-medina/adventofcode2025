// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export enum Direction {
	Left = -1,
	Right = 1,
}

export interface Sequence {
	direction: Direction;
	steps: number;
}

export class Day01 extends Day {

	private static readonly end: number = 100;
	public position: number | undefined;

	private mod = (n: number): number => ((n % Day01.end) + Day01.end) % Day01.end;

	private solve(input: string, part: number): string {
		this.position = Day01.end / 2; // reset position for each part
		let zeros = 0;
		const sequences = this.parse(input);

		for (const seq of sequences) {
			const reposition = this.mod(this.position + seq.direction * seq.steps);

			if (part === 1) {
				// only check final position once per sequence
				if (reposition === 0) zeros++;
			} else {
				// check all positions in the sequence
				const remainder = this.mod(-seq.direction * this.position);
				const first = remainder === 0 ? Day01.end : remainder;
				if (seq.steps >= first) {
					zeros += 1 + Math.floor((seq.steps - first) / Day01.end);
				}
			}

			this.position = reposition;
		}

		return zeros.toString();
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
				const direction = (letter === 'L') ? Direction.Left : Direction.Right;
				const steps = Number(m[2]);
				return {direction, steps};
			});
	}

}

export const day01 = new Day01();
