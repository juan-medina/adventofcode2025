// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

export function part1(input: string): string {
  return input.split(/\r?\n/).filter(Boolean).map(Number).reduce((a, b) => a + b, 0).toString();
}

export function part2(input: string): string {
  return input.split(/\r?\n/).filter(Boolean).length.toString();
}

export default { part1, part2 };