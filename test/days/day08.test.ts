// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {day08, Point} from '../../src/days/day08';

describe('Day 8', () => {

	it('point from string', () => {
		const point = Point.from("-1,2,-3");
		expect(point).toStrictEqual(new Point(-1, 2, -3));
		expect(point.x).toBe(-1);
		expect(point.y).toBe(2);
		expect(point.z).toBe(-3);
	});

	it('points lines parsing', () => {
		const input = dedent`
			-1,2,-3
			4,0,5
			6,-7,8
		`;
		const points = Point.parse(input);
		expect(points).toHaveLength(3);
		expect(points[0]).toStrictEqual(new Point(-1, 2, -3));
		expect(points[1]).toStrictEqual(new Point(4, 0, 5));
		expect(points[2]).toStrictEqual(new Point(6, -7, 8));
	});

	it('point distance', () => {
		const a = new Point(0, 0, 0);
		const b = new Point(1, 1, 1);
		const expected = Math.sqrt(3); // dx=1, dy=1, dz=1 -> 1+1+1=3
		expect(a.distance(b)).toBe(expected);
		expect(b.distance(a)).toBe(expected);

		const p1 = new Point(-1, 2, -3);
		const p2 = new Point(4, 0, 5);
		const expected2 = Math.sqrt(93); // dx=-5, dy=2, dz=-8 -> 25+4+64=93
		expect(p1.distance(p2)).toBe(expected2);
		expect(p2.distance(p1)).toBe(expected2);

		const p3 = new Point(6, -7, 8);
		const p4 = new Point(-2, 3, -4);
		const expected3 = Math.sqrt((6 - -2) ** 2 + (-7 - 3) ** 2 + (8 - -4) ** 2);
		expect(p3.distance(p4)).toBe(expected3);
		expect(p4.distance(p3)).toBe(expected3);
	});

	const input = dedent`
		162,817,812
		57,618,57
		906,360,560
		592,479,940
		352,342,300
		466,668,158
		542,29,236
		431,825,988
		739,650,466
		52,470,668
		216,146,977
		819,987,18
		117,168,530
		805,96,715
		346,949,466
		970,615,88
		941,993,340
		862,61,35
		984,92,344
		425,690,689
    `;

	it('solves part 1 example', () => {
		day08.connections = 10; // Set connections to 10 for this test
		expect(day08.part1(input)).toBe("40");
	});

	it('solves part 2 example', () => {
		expect(day08.part2(input)).toBe("25272");
	});

});
