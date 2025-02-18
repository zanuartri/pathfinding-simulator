export const aStar = (grid, start, target, rows, cols) => {
  const openSet = new Set([start]); // Node yang akan diproses
  const cameFrom = {}; // Untuk menyimpan jalur
  const gScore = {}; // score dari start ke node saat ini
  const fScore = {}; // gScore + heuristik ke target

  // Inisialisasi gScore dan fScore
  for (let i = 0; i < rows * cols; i++) {
    gScore[i] = Infinity;
    fScore[i] = Infinity;
  }
  gScore[start] = 0;
  fScore[start] = heuristic(start, target, cols);

  const visitedNodesInOrder = []; // Untuk visualisasi

  while (openSet.size > 0) {
    // Ambil node dengan fScore terendah
    const current = getLowestFScoreNode(openSet, fScore);
    if (current === target) {
      // Jika mencapai target, kembalikan jalur
      return {
        visitedNodesInOrder,
        path: reconstructPath(cameFrom, current),
      };
    }

    openSet.delete(current);
    visitedNodesInOrder.push(current);

    // Cek neighbors
    const neighbors = getNeighbors(current, rows, cols);
    for (const neighbor of neighbors) {
      if (grid[neighbor]) continue; // Skip node yang terhalang

      const tentativeGScore = gScore[current] + 1; // Asumsi bobot edge = 1
      if (tentativeGScore < gScore[neighbor]) {
        // Jika menemukan jalur yang lebih baik
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, target, cols);

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }

  // Jika tidak menemukan jalur
  return { visitedNodesInOrder, path: [] };
};

// Fungsi heuristik (Manhattan distance)
const heuristic = (node, target, cols) => {
  const x1 = node % cols;
  const y1 = Math.floor(node / cols);
  const x2 = target % cols;
  const y2 = Math.floor(target / cols);
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

// Ambil node dengan fScore terendah
const getLowestFScoreNode = (openSet, fScore) => {
  let lowestNode = null;
  let lowestScore = Infinity;
  for (const node of openSet) {
    if (fScore[node] < lowestScore) {
      lowestScore = fScore[node];
      lowestNode = node;
    }
  }
  return lowestNode;
};

// Rekonstruksi jalur dari target ke start
const reconstructPath = (cameFrom, current) => {
  const path = [];
  while (cameFrom[current] !== undefined) {
    path.push(current);
    current = cameFrom[current];
  }
  return path.reverse();
};

// Ambil neighbors node
const getNeighbors = (node, rows, cols) => {
  const neighbors = [];
  const x = node % cols;
  const y = Math.floor(node / cols);

  if (x > 0) neighbors.push(node - 1); // Kiri
  if (x < cols - 1) neighbors.push(node + 1); // Kanan
  if (y > 0) neighbors.push(node - cols); // Atas
  if (y < rows - 1) neighbors.push(node + cols); // Bawah

  return neighbors;
};
