// Main index file of js lib

// temporary placeholder
exports.getNodeList = () => {
  return ['A', 'B', 'C', 'D', 'E'];
};

exports.getNodeMemory = (node) => {
  return 'Node Memory JSON';
};
exports.getNodeFunction = (node) => {
  return 'Node Function String';
};

exports.getParsedInputGraph = (input) =>{
    let edges=input.split(/[\s-]+/);
    if(edges.length & 1)
    {
      return {error:true,msg:"Invalid Input"};
    }
    console.log(edges);
    let parsed_input_nodes=[];
    let parsed_input_edges=[];
    var nodes = new Map();
    let count=1;
    for(let i=0;i<edges.length;i+=2)
    { 
      let first_node=edges[i];
      let second_node=edges[i+1];
      if(!nodes.has(first_node))
      {
        nodes.set(first_node,count);
        count=count+1;
      }
      if(!nodes.has(second_node))
      {
        nodes.set(second_node,count);
        count=count+1;
      }
    }
    for(let i=0;i<edges.length;i+=2)
    {
      let first_node=edges[i];
      let second_node=edges[i+1];
      parsed_input_edges.push({from:nodes.get(first_node),to:nodes.get(second_node)});
    }
    for (let [key, value] of nodes) {
      parsed_input_nodes.push({id:value,label:key});
    }
    let obj={
      parsed_edges:parsed_input_edges,
      parsed_nodes:parsed_input_nodes,
      error:false
    }
    return obj;
}
// These two must throw a string in case of error
exports.setNodeMemory = (node, memoryString) => {};
exports.setNodeFunction = (node, functionString) => {};

exports.getNodeQueue = (node) => {
  return [
    'Packet 1',
    'Packet 2',
    'Really Big Packet Next',
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
    `{
            "name": "svelte-app",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "build": "rollup -c",
              "dev": "rollup -c -w",
              "start": "sirv public --no-clear"
            },
            "devDependencies": {
              "@rollup/plugin-commonjs": "^17.0.0",
              "@rollup/plugin-node-resolve": "^11.0.0",
              "carbon-components-svelte": "^0.32.2",
              "carbon-icons-svelte": "^10.28.0",
              "rollup": "^2.3.4",
              "rollup-plugin-css-only": "^3.1.0",
              "rollup-plugin-livereload": "^2.0.0",
              "rollup-plugin-svelte": "^7.0.0",
              "rollup-plugin-terser": "^7.0.0",
              "svelte": "^3.0.0"
            },
            "dependencies": {
              "@svgdotjs/svg.js": "^3.0.16",
              "sirv-cli": "^1.0.0"
            }
          }`,
  ];
};
