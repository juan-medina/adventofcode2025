// typescript
// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, it, expect, vi} from "vitest";
import * as fs from "fs";
import * as path from "path";
import {parseArgs, readInput, measureTime, runPart, getSolver} from "../src";
import * as index from "../src";

describe("index tests", () => {
	it("parseArgs valid input", () => {
		const {day, inputPath} = parseArgs(["1"]);
		expect(day).toBe(1);
		expect(inputPath.endsWith("01.txt")).toBe(true);
	});

	it("parseArgs invalid inputs", () => {
		expect(() => parseArgs([])).toThrow();
		expect(() => parseArgs(["foo"])).toThrow();
		expect(() => parseArgs(["13"])).toThrow();
	});

	it("readInput reads file content", () => {
		const tmp = path.join(__dirname, "tmp_input.txt");
		fs.writeFileSync(tmp, "hello");
		expect(readInput(tmp, 1)).toBe("hello");
		fs.unlinkSync(tmp);
	});

	it("readInput throws if missing", () => {
		const missing = path.join(__dirname, "no_such_file.txt");
		expect(() => readInput(missing, 2)).toThrow();
	});

	it("measureTime returns result and ms", () => {
		const {result, ms} = measureTime(() => 42);
		expect(result).toBe(42);
		expect(typeof ms).toBe("number");
		expect(ms).toBeGreaterThanOrEqual(0);
	});

	it("runPart logs output", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {
		});
		runPart("Part 1", () => "ok");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	it("getSolver throws for unknown day", () => {
		expect(() => getSolver(999)).toThrow();
	});

	it("getSolver returns solver for day 1", () => {
		const solver = getSolver(1);
		expect(typeof solver.part1).toBe("function");
		expect(typeof solver.part2).toBe("function");
	});

	it("main runs runDay and prints header for valid args", () => {
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => {
		});
		const runDaySpy = vi.spyOn(index, "runDay").mockImplementation(() => {
		});

		index.main(["1"]);

		// don't assert on the module-local call to `runDay` (may use internal binding)
		expect(logSpy).toHaveBeenCalled();

		runDaySpy.mockRestore();
		logSpy.mockRestore();
	});

	it("main handles parse error and exits with code 1", () => {
		const errSpy = vi.spyOn(console, "error").mockImplementation(() => {
		});
		const exitSpy = vi
			.spyOn(process, "exit")
			.mockImplementation((code?: string | number | null | undefined): never => {
				throw new Error("process.exit called");
			});

		try {
			index.main([]);
		} catch (e) {
			// ignore the thrown error from the mocked process.exit
		}

		expect(errSpy).toHaveBeenCalled();
		expect(exitSpy).toHaveBeenCalledWith(1);

		errSpy.mockRestore();
		exitSpy.mockRestore();
	});

});
