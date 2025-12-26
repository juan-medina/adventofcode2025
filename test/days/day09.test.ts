// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {day09} from '../../src/days/day09';

describe('Day 9', () => {

	const input = dedent`
    `;

	it('solves part 1 example', () => {
		expect(day09.part1(input)).toBe("");
	});

	it('solves part 2 example', () => {
		expect(() => day09.part2(input)).toThrowError("Method not implemented.");
	});

});
