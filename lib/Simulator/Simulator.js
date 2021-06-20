const { Node } = require('./Node');
const { Logger } = require('../logger');
const { Packets } = require('../packets');

const { FLOOD, REPLY, ENQUEUED } = require('../constants');

// This assumes color of all packets is to be same, for separate color of each packet
// Some additions will be required for that, if that is to be done

class Simulator {
  nodes = new Map();
  ctr = 1;
  // structure of the nodes is :
  // [ {id:String,label:String},... ] ; ideally id and label must be same.
  // Irrespective always id is considered.
  // Structure of edges is :
  // [ {from :String , to:String},... ] ; from and to refers to ids of nodes connected by edges
  // as the network graph is undirected, exchanging them will not have any effect
  // These structures are as per Vis.js Network structures, as we use Vis Js later
  constructor(nodes, edges) {
    if (!nodes || !edges) {
      throw 'Nodes and edges both are required';
    }
    nodes.forEach((node) => {
      this.nodes.set(node.id, new Node(node.id));
    });
    edges.forEach((edge) => {
      this.nodes.get(edge.from).neighbors.add(edge.to);
      this.nodes.get(edge.to).neighbors.add(edge.from);
    });
  }

  setMem(node, memObj) {
    this.nodes.get(node).mem = memObj;
  }

  setFn(node, fn) {
    this.nodes.get(node).fn = fn;
  }

  getNode(node) {
    return this.nodes.get(node);
  }
  // To handle the enqueue packets from the enqueue textarea
  enqueuePacket(node, payload) {
    this.nodes
      .get(node)
      ?.queue.push(this.createPacket(ENQUEUED, node, payload));
  }

  // get packet from params
  createPacket(from, to, payload) {
    let p = {
      id: this.ctr,
      from: from,
      to: to,
      packet: payload,
    };
    this.ctr += 1;
    Packets.add(p);
    return p;
  }
  // This looks complicated, but does a simple thing
  // for each node, get its queue
  // then for each packet in its node, call node's function, with node's memory and packet as args
  // get the list of packets to be sent from that function, and store accordingly in a list
  // after all nodes are done, clear their queues, return the list
  step() {
    // this will store packets to be sent to next node, until
    // iteration on all nodes is done. We cannot directly enqueue packets into nodes,
    // as then the packets sent by first node will count in this iteration for later nodes,
    // which should be counted in next iteration
    let global_queue = [];
    // go through each node
    this.nodes.forEach((node) => {
      // go through each packet in current queue
      node.queue.forEach((packet) => {
        let forwards = [];
        try {
          // forwards will be ideally :
          // [ {to:String,packet:Obj},... ]
          forwards = node.fn(node.mem, packet.payload);
        } catch (e) {
          Logger.log(
            `Error in processing Packet #${packet.id} at node ${node.name} : ${e}, dropping packet.`
          );
          // skip this packet
          return;
        }
        if (!Array.isArray(forwards)) {
          Logger.log(
            `Error in processing Packet #${packet.id} at node ${node.name} : Expected array as return from node function, received ${forwards}, dropping packet.`
          );
          // skip this packet
          return;
        }
        // for each generated package
        // As one packet may trigger sending multiple packets,
        // eg in case of group broadcasts
        forwards.forEach((p) => {
          if (!p.to || !p.packet) {
            Logger.log(
              `Error in processing Packet #${packet.id} at node ${node.name} : Expected Objects of the format {to:String,packet:Object} in Array returned from node function, got ${p}, dropping packet.`
            );
            // skip this packet
            return;
          }
          if (p.to === FLOOD) {
            // flood to all neighbors  except the one it came from
            node.neighbors.forEach((n) => {
              if (n !== packet.from) {
                global_queue.push(this.createPacket(node.name, n.name, p));
              }
            });
          } else if (p.to === REPLY) {
            if (packet.from === ENQUEUED) {
              // silently ignore, as enqueued packets come from outside the network under the simulation
              // in the sense they are manually put in network by user, so if tried to reply to them,
              // they go out of the network, thus not considered
            } else {
              // Reply to the sender of the packet
              global_queue.push(this.createPacket(node.name, packet.from, p));
            }
          } else if (node.neighbors.has(p.to)) {
            // make sure that node has the destination connected to it
            global_queue.push(this.createPacket(node.name, p.to, p));
          } else {
            Logger.log(
              `Error in processing Packet #${packet.id} at node ${node.name} : Expected 'flood','reply' or node name, received ${p.to}, dropping packet.`
            );
            // skip the packet
            return;
          }
        });
      });
    });

    // clear the queue
    this.nodes.forEach((node) => {
      node.queue = [];
    });
    // This might get changes later, but essentially this will be used
    // to decide and play the packets animation
    return global_queue;
  }

  // This enqueues packets for next iteration,
  // currently separated as animation might split taking next step and enqueuing packets
  // might get merged in step later
  nextEnqueue(global_queue) {
    // enqueue the packets
    global_queue.forEach((p) => {
      this.nodes.get(p.to).queue.push(p);
    });
  }
}

exports.Simulator = Simulator;
