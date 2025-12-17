// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { Solvers } from "./days";

function parseArgs(args: string[]): { day: number; inputPath: string } {
	if (args.length < 1) {
		throw new Error(chalk.red("Usage: node start <day>"));
	}
	const day = Number(args[0]);
	if (isNaN(day) || day < 1 || day > 12) {
		throw new Error(chalk.red("Day must be a number between 1 and 12."));
	}
	const inputPath = args[1] || path.join("data", args[0].padStart(2, "0") + ".txt");
	return { day, inputPath };
}

function getSolver(day: number) {
	const solver = Solvers[day];
	if (!solver) {
		throw new Error(chalk.red("Not implemented yet."));
	}
	return solver;
}

function readInput(inputPath: string, day: number): string {
	if (!fs.existsSync(inputPath)) {
		throw new Error(chalk.red(`No data file for day ${day} at path: ${inputPath}`));
	}
	return fs.readFileSync(inputPath, "utf-8");
}


function measureTime<T>(fn: () => T): { result: T; ms: number } {
	const start = process.hrtime.bigint();
	const result = fn();
	const end = process.hrtime.bigint();
	const ms = Number(end - start) / 1_000_000;
	return { result, ms };
}


function runPart(label: string, fn: () => unknown) {
	const { result, ms } = measureTime(fn);
	const color = label === 'Part 1' ? chalk.cyan : chalk.magenta;
	console.log(color(`- ${label}:`), chalk.green(result), chalk.gray(`(in ${ms.toFixed(2)} ms)`));
}

function runDay(day: number, inputPath: string) {
	console.log(chalk.bold.blueBright(`\nDay ${day}:`));
	const solver = getSolver(day);
	const input = readInput(inputPath, day);
	runPart('Part 1', () => solver.part1(input));
	runPart('Part 2', () => solver.part2(input));
}

function main(args: string[]) {
	console.log(chalk.bold.bgYellow.white("\nAdvent of Code 2025\n"));
	try {
		const { day, inputPath } = parseArgs(args);
		runDay(day, inputPath);
	} catch (err: any) {
		console.error(chalk.red(err.message));
		process.exit(1);
	}
}

// Export functions for unit testing
export { parseArgs, getSolver, readInput, measureTime, runPart, runDay, main };

// Ensure the script runs only when executed directly
declare const require: any;
if (typeof require !== "undefined" && require.main === module) {
	main(process.argv.slice(2));
}
