// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import * as fs from "fs";
import * as path from "path";
import {Solvers} from "./days";

function parseArgs(args: string[]): { day: number; inputPath: string } {
	if (args.length < 1) {
		throw new Error("Usage: node start <day>");
	}
	const day = Number(args[0]);
	if (isNaN(day) || day < 1 || day > 12) {
		throw new Error("Day must be a number between 1 and 12.");
	}
	const inputPath = args[1] || path.join("data", args[0].padStart(2, "0") + ".txt");
	return { day, inputPath };
}

function getSolver(day: number) {
	const solver = Solvers[day];
	if (!solver) {
		throw new Error("Not implemented yet.");
	}
	return solver;
}

function readInput(inputPath: string, day: number): string {
	if (!fs.existsSync(inputPath)) {
		throw new Error(`No data file for day ${day} at path: ${inputPath}`);
	}
	return fs.readFileSync(inputPath, "utf-8");
}

function runDay(day: number, inputPath: string) {
	console.log(`Day ${day}:`);
	const solver = getSolver(day);
	const input = readInput(inputPath, day);
	console.log("- Part 1:", solver.part1(input));
	console.log("- Part 2:", solver.part2(input));
}

function main(args: string[]) {
	console.log("Advent of Code 2025\n");
	try {
		const { day, inputPath } = parseArgs(args);
		runDay(day, inputPath);
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
}

main(process.argv.slice(2));
