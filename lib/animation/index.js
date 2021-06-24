const { PACKET_DURATION, BUFFER, NODE_RADIUS } = require('../constants');

exports.sortPackets = (q) => {
  let m = new Map();

  q.forEach((p) => {
    let edge = p.from + p.to;
    if (!m.has(edge)) {
      m.set(edge, new Set());
    }
    m.get(edge).add(p);
  });

  let temp = Array.from(m.values());
  temp = temp.map((s) => {
    return s.size;
  });

  let duration = Math.max(temp) * PACKET_DURATION + BUFFER;
  return { duration: duration, sorted: m };
};

exports.getOffset = (from, to) => {
  let dx = to.x - from.x - NODE_RADIUS;
  let dy = to.y - from.y - NODE_RADIUS;
  let norm = Math.sqrt(dx * dx + dy * dy);
  let udx = dx / norm;
  let udy = dy / norm;
  // perpendicular vector is udy,-udx
  return [50 * udx + 25 * udy, 50 * udy - 25 * udx];
};
