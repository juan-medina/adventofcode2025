// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export class Day01 extends Day {
	part1(input: string): string {
		return input.split(/\r?\n/).filter(Boolean).map(Number).reduce((a, b) => a + b, 0).toString();
	}

	part2(input: string): string {
		return input.split(/\r?\n/).filter(Boolean).length.toString();
	}
}

export const day01 = new Day01();