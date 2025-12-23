// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import Problem, {day06, Operation} from '../../src/days/day06';

describe('Day 6', () => {
	it(`operation execution works`, () => {
		const problem1 = new Problem();
		problem1.operands.push(3)
		problem1.operands.push(5);
		problem1.operation = Operation.ADD;
		expect(problem1.result()).toBe(8);

		const problem2 = new Problem();
		problem2.operands.push(5)
		problem2.operands.push(9);
		problem2.operation = Operation.MULT;
		expect(problem2.result()).toBe(45);
	});

	it(`problem add works`, () => {
		const problem = new Problem();

		problem.add("3");
		problem.add("5");
		problem.add("+");

		expect(problem.operands).toEqual([3, 5]);
		expect(problem.operation).toBe(Operation.ADD);
	});

	it(`columns works`, () => {
		const lastLeft = dedent`
			321  5 1
			75  19 23
			+   *  +
			`;
		const columns1 = Problem.columns(lastLeft.split("\n"));
		expect(columns1.length).toBe(3);
		expect(columns1[0]).toEqual({start: 0, end: 2});
		expect(columns1[1]).toEqual({start: 4, end: 5});
		expect(columns1[2]).toEqual({start: 7, end: 8});

		const lastRight = dedent`
			321 5  1
			75  9 23
			+   * +
			`;
		const columns2 = Problem.columns(lastRight.split("\n"));
		expect(columns2.length).toBe(3);
		expect(columns2[0]).toEqual({start: 0, end: 2});
		expect(columns2[1]).toEqual({start: 4, end: 4});
		expect(columns2[2]).toEqual({start: 6, end: 7});
	});

	it(`data works`, () => {
		const lastLeft = dedent`
			321  5 1
			75  19 23
			+   *  +
			`;

		const columns = Problem.columns(lastLeft.split("\n"));
		expect(Problem.data(lastLeft.split("\n"), columns[0])).toEqual(["321", "75 ", "+  "]);
		expect(Problem.data(lastLeft.split("\n"), columns[1])).toEqual([" 5", "19", "* "]);
		expect(Problem.data(lastLeft.split("\n"), columns[2])).toEqual(["1 ", "23", "+ "]);

		const lastRight = dedent`
			321 5  1
			75  9 23
			+   * +
			`;

		const columns2 = Problem.columns(lastRight.split("\n"));
		expect(Problem.data(lastRight.split("\n"), columns2[0])).toEqual(["321", "75 ", "+  "]);
		expect(Problem.data(lastRight.split("\n"), columns2[1])).toEqual(["5", "9", "*"]);
		expect(Problem.data(lastRight.split("\n"), columns2[2])).toEqual([" 1", "23", "+ "]);
	});

	it(`problem from lines works`, () => {
		const data = dedent`
			321  5
			75  19
			+   *
			`;
		const problems1 = Problem.from(data, 1);
		expect(problems1.length).toBe(2);

		expect(problems1[0].operands).toEqual([321, 75]);
		expect(problems1[0].operation).toBe(Operation.ADD);
		expect(problems1[1].operands).toEqual([5, 19]);
		expect(problems1[1].operation).toBe(Operation.MULT);

		const problems2 = Problem.from(data, 2);
		expect(problems2.length).toBe(2);

		expect(problems2[0].operands).toEqual([1, 25, 37]);
		expect(problems2[0].operation).toBe(Operation.ADD);
		expect(problems2[1].operands).toEqual([59, 1]);
		expect(problems2[1].operation).toBe(Operation.MULT);
	});

	const input = dedent`
		123 328  51 64
		 45 64  387 23
		  6 98  215 314
		*   +   *   +
    `;

	it('solves part 1 example', () => {
		expect(day06.part1(input)).toBe("4277556");
	});

	it('solves part 2 example', () => {
		expect(day06.part2(input)).toBe("3263827");
	});
});
