// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {day07, Tachyon, Space} from '../../src/days/day07';

describe('Day 7', () => {

	it('can parse tachyon map', () => {
		const data = dedent`
			..S..
			..^..
			.^...
		`;

		const tachyon = Tachyon.from(data);
		expect(tachyon.size).toEqual({width: 5, height: 3});

		expect(tachyon.map.length).toBe(3);
		expect(tachyon.map[0]).toBe("..S..");
		expect(tachyon.map[1]).toBe("..^..");
		expect(tachyon.map[2]).toBe(".^...");

		expect(tachyon.start).toEqual({x: 2, y: 0});

		expect(tachyon.at(2, 0)).toBe(Space.Start);
		expect(tachyon.at(1, 1)).toBe(Space.Empty);
		expect(tachyon.at(2, 1)).toBe(Space.Splitter);
	});

	it(`can set tachyon map`, () => {
		let tachyon = new Tachyon(5, 3);
		expect(tachyon.map[0]).toBe(".....");
		expect(tachyon.map[1]).toBe(".....");
		expect(tachyon.map[1]).toBe(".....");

		tachyon.set(2, 0, Space.Start);
		tachyon.set(2, 1, Space.Splitter);
		tachyon.set(4, 2, Space.Beam);

		expect(tachyon.at(2, 0)).toBe(Space.Start);
		expect(tachyon.at(2, 1)).toBe(Space.Splitter);
		expect(tachyon.at(4, 2)).toBe(Space.Beam);

		expect(tachyon.map[0]).toBe("..S..");
		expect(tachyon.map[1]).toBe("..^..");
		expect(tachyon.map[2]).toBe("....|");
	})

	it(`expect tachyon string to match map`, () => {
		const data = dedent`
			..S..
			..^..
			.^...
		`;

		const tachyon = Tachyon.from(data);
		expect(tachyon.string()).toBe(data);
	});

	it(`shoot tachyon beam`, () => {
		const data = dedent`
			..S..
			..^..
			.^...
		`;

		const tachyon = Tachyon.from(data);
		const splits = tachyon.shoot();
		expect(splits).toBe(2);

		expect(tachyon.string()).toBe(dedent`
			..S..
			.|^|.
			|^||.
		`);
	});

	const input = dedent`
		.......S.......
		...............
		.......^.......
		...............
		......^.^......
		...............
		.....^.^.^.....
		...............
		....^.^...^....
		...............
		...^.^...^.^...
		...............
		..^...^.....^..
		...............
		.^.^.^.^.^...^.
		...............
    `;

	it('solves part 1 example', () => {
		expect(day07.part1(input)).toBe("21");
	});

});
