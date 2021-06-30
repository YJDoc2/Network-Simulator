const {
  ANIMATION_DURATION,
  BUFFER,
  PACKET_RADIUS,
  OFFSET_COEFF_1,
  OFFSET_COEFF_2,
  OFFSET_COEFF_3,
  PACKET_TIME_OFFSET,
  PACKET_COLOR,
} = require('../constants');
const { Timeline } = require('@svgdotjs/svg.js');
const PI = Math.PI;

/**
 * Takes the global queue and sorts them according to the edges
 * Also calculates the total duration of the animation and returns it
 *
 *
 * @param {string} q - global Queue containing all packets to be animated
 * @returns {object} { duration : total duration of the animation,sorted : sorted queue}
 */

exports.sortPackets = (q) => {
  let m = new Map();

  q.forEach((p) => {
    let edge = `${p.from}--${p.to}`;
    if (!m.has(edge)) {
      m.set(edge, new Set());
    }
    m.get(edge).add(p);
  });

  let temp = Array.from(m.values());
  temp = temp.map((s) => {
    return s.size;
  });

  // This is total animation duration
  // one packet will at least take ANIMATION_DURATION time,
  // and then each will take PACKET_TIME_OFFSET more, and a little buffer
  let duration =
    ANIMATION_DURATION + Math.max(...temp) * PACKET_TIME_OFFSET + BUFFER;
  return { duration: duration, sorted: m };
};

// This one was really tricky to figure out, so if anyone is
// trying to change this, be ready to spend some time on it ;)
// it looks small, don't be fooled.
// Also remember that in SVG draw and in CG, x axis is normal cartesian x axis,
// but y is inverted, it grows downwards, if you think some calculation is going wrong,
// verify that it is correct with inverted y axis
// In the end, remember maths is always right, and vectors provide a coordinate independent way
// to represent direction etc, so make sure you get the vectors right :)

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
// now we have to mix them up in right proportions so we get nice position for the packet start
// Here coeff1 is for vector in direction of to-from, and coeff2 is for the perpendicular vector
// then we add this offset to position of from node, so we get the start position,
// and then we add the to-from vector multiplied by some value <1 to this position to
// get the end position

exports.getOffset = (from, to) => {
  let dx = to.x - from.x;
  let dy = to.y - from.y;
  let norm = Math.sqrt(dx * dx + dy * dy);
  let udx = dx / norm;
  let udy = dy / norm;
  // perpendicular vector is udy,-udx

  const offsetX = OFFSET_COEFF_1 * udx + OFFSET_COEFF_2 * udy;
  const offsetY = OFFSET_COEFF_1 * udy - OFFSET_COEFF_2 * udx;

  const [startX, startY] = [from.x + offsetX, from.y + offsetY];
  const [endX, endY] = [
    startX + OFFSET_COEFF_3 * dx,
    startY + OFFSET_COEFF_3 * dy,
  ];
  return [startX, startY, endX, endY];
};

/**
 * Actually animates the packets going form one node to another
 * @param {object} draw - instance of svg
 * @param {object} sim - instance of simulator
 * @param {object} sorted - sorted packets as obtained form sortPackets
 * @returns {undefined}
 */

exports.animate = (draw, sim, sorted) => {
  sorted.forEach((packets, edge) => {
    let [fromStr, toStr] = edge.split('--');
    const from = sim.nodes.get(fromStr);
    const to = sim.nodes.get(toStr);
    const [startX, startY, endX, endY] = exports.getOffset(from, to);
    let timeOffset = 0;
    let timeline = new Timeline();
    packets.forEach((a) => {
      draw
        .circle(PACKET_RADIUS)
        .fill(a.color || PACKET_COLOR)
        .move(-100, -100)
        .timeline(timeline)
        .animate(1, timeOffset, 'absolute')
        .move(startX, startY)
        .animate(ANIMATION_DURATION, timeOffset, 'absolute')
        .ease('-')
        .move(endX, endY)
        .animate(1, timeOffset + ANIMATION_DURATION, 'absolute')
        .move(-100, -100);

      draw
        .plain(a.id)
        .move(-100, -100)
        .timeline(timeline)
        .animate(1, timeOffset, 'absolute')
        .move(startX + PACKET_RADIUS / 4, startY)
        .animate(ANIMATION_DURATION, timeOffset, 'absolute')
        .ease('-')
        .move(endX + PACKET_RADIUS / 4, endY)
        .animate(1, timeOffset + ANIMATION_DURATION, 'absolute')
        .move(-100, -100);
      timeOffset += PACKET_TIME_OFFSET;
    });
  });
};
