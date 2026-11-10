/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story utility                                          |
  | Purpose: Checks node, option, and ending references so broken story links  |
  |          can be detected by tests and project validation.                  |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

export function validateStoryGraph(nodes, endings) {
    const errors = [];
    for (const [nodeId, node] of Object.entries(nodes)) {
        if (node.next && !nodes[node.next]) {
            errors.push(
                `Node "${nodeId}" references missing next node "${node.next}".`,
            );
        }
        for (const option of node.options ?? []) {
            if (!nodes[option.next]) {
                errors.push(
                    `Choice "${option.label}" in "${nodeId}" references missing node "${option.next}".`,
                );
            }
        }
        if (node.ending && !endings[node.ending]) {
            errors.push(
                `Node "${nodeId}" references missing ending "${node.ending}".`,
            );
        }
    }
    return errors;
}
