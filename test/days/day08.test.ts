// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {Circuit, day08, Point} from '../../src/days/day08';

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

	it('create circuit', () => {
		const points: Point[] = [
			new Point(0, 0, 0),
			new Point(1, 1, 1),
			new Point(2, 2, 2)
		];

		const circuit = new Circuit(points);
		expect(circuit.points).length(3);
		expect(circuit.points).toContainEqual(new Point(0, 0, 0));
		expect(circuit.points).toContainEqual(new Point(1, 1, 1));
		expect(circuit.points).toContainEqual(new Point(2, 2, 2));
	});

	it('circuit contains point', () => {
		const points: Point[] = [
			new Point(0, 0, 0),
			new Point(1, 1, 1),
			new Point(2, 2, 2)
		];

		const circuit = new Circuit(points);
		expect(circuit.contains(new Point(1, 1, 1))).toBe(true);
		expect(circuit.contains(new Point(3, 3, 3))).toBe(false);
	});

	it('circuit contained in circuits', () => {
		const circuit1 = new Circuit([new Point(0, 0, 0), new Point(1, 1, 1)]);
		const circuit2 = new Circuit([new Point(2, 2, 2), new Point(3, 3, 3)]);
		const circuits = [circuit1, circuit2];

		expect(Circuit.contained(circuits, new Point(1, 1, 1))).toBe(circuit1);
		expect(Circuit.contained(circuits, new Point(3, 3, 3))).toBe(circuit2);
		expect(Circuit.contained(circuits, new Point(4, 4, 4))).toBeNull();
	});

	it('circuit distance', () => {
		const p1 = new Point(0, 0, 0);
		const p2 = new Point(1, 1, 1);
		const circuit = new Circuit([p1, p2]);
		expect(circuit.distance()).toBe(p1.distance(p2));
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
		day08.part1Connections = 10;
		expect(day08.part1(input)).toBe("40");
	});

});
