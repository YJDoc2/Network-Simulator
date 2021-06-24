const {
  PACKET_DURATION,
  BUFFER,
  NODE_RADIUS,
  PACKET_RADIUS,
  OFFSET_COEFF_1,
  OFFSET_COEFF_2,
} = require('../constants');

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

// This one was really tricky to figure out, so if anyone is
// trying to change this, be ready to spend some time on it ;)
// it looks small, don't be fooled.
// Also remember that in SVG draw and in CG, x axis is normal cartesian x axis,
// but y is inverted, it grows downwards, if you think some calculation is going wrong,
// verify that it is correct with inverted y axis

// The basic logic is simple, get from and to as params,
// we calculate teh vector to - from, here its components are dx and dy
// then we calculate the norm (length) of it, and thus calculate the unit vector in
// direction of to-from. Reason to normalize this is that so it will be unaffected by
// actual distance between the nodes, and we can get the direction of to-from
// Now we need perpendicular vector to this, which must obey
// 1) a*udx+b*udy = 0 --- dot product zero
// 2) a**2 + b**2 = 1 --- normalized
// after solving we get a = udy, and b = -udx
// with that we have one vector in direction of edge, with components udx,udy
// and other perpendicular to it, with components udy, -udx
// now we have to mix them up in right proportions so we get nice position for the packet
// Then we subtract radius of packet /2 so that we can use them in .move() method
// as move measures from top left of bounding box
// ! NOTE that still, y coordinate will be either added or subtracted from both
// ! start and end, unlike x , which will be added to one and subtracted from other.

// For example :
// let from = s.nodes.get('C');
// let to = s.nodes.get('B');
// let [x, y] = getOffset(from, to);

// draw
//   .circle(PACKET_RADIUS)
//   .fill('#FF0000')
// subtract y from both
// add x to one and subtract from another
//   .move(from.x + x, from.y - y);
// draw
//   .circle(PACKET_RADIUS)
//   .fill('#FF0000')
//   .move(to.x - x, to.y - y);

exports.getOffset = (from, to) => {
  let dx = to.x - from.x - NODE_RADIUS;
  let dy = to.y - from.y - NODE_RADIUS;
  let norm = Math.sqrt(dx * dx + dy * dy);
  let udx = dx / norm;
  let udy = dy / norm;
  // perpendicular vector is udy,-udx
  return [
    OFFSET_COEFF_1 * udx + OFFSET_COEFF_2 * udy + PACKET_RADIUS / 2,
    OFFSET_COEFF_1 * udy - OFFSET_COEFF_2 * udx + PACKET_RADIUS / 2,
  ];
};
