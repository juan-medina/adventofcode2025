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

	private mod(n: number, m: number = 100): number {
		return ((n % m) + m) % m;
	}

	private solve(input: string, part: number): string {
		this.position = 50; // reset position for each part
		let totalZeros = 0;
		const sequences = this.parse(input);

		for (const seq of sequences) {
			const d = seq.direction === Direction.Left ? -1 : 1;

			// compute new position arithmetically
			const reposition = this.mod(this.position + d * seq.steps, 100);

			if (part === 1) {
				// only check final position once per sequence
				if (reposition === 0) totalZeros++;
			} else {
				// count how many steps k in 1..steps satisfy (position + d*k) % 100 == 0
				// solve k ≡ -d * position (mod 100)
				const k = d === 1 ? this.mod(100 - this.position) : this.mod(this.position);
				const first = k === 0 ? 100 : k;
				if (seq.steps >= first) {
					totalZeros += 1 + Math.floor((seq.steps - first) / 100);
				}
			}

			this.position = reposition;
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
