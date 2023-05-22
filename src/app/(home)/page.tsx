// @ts-nocheck
// Temporal fix to the "react-vis-network-graph" declaration file
"use client";
import QueryBox from "@/components/QueryBox";
import { IEdge, INetwork, INode, INodeEvent } from "@/interfaces/interfaces";
import get_user from "@/utils/get_user";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";

function Home() {
  const Graph = dynamic(() => import("react-vis-network-graph"));

  const [networks, setNetworks] = useState<INetwork[]>([]);
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<IEdge[]>([]);

  const searchUser = async (user: string) => {
    if (user) {
      const network = await get_user(user);

      setNetworks([...networks, network]);
    }
  };

  useEffect(() => {
    const nodes: INode[] = [];
    const edges: IEdge[] = [];

    for (let network of networks) {
      if (!nodes.find((n) => n.id === network.user.id)) {
        nodes.push({
          id: network.user.id,
          label: network.user.name,
          title: network.user.name,
          color: "yellow",
        });
      }

      for (let node of network.following) {
        if (!nodes.find((n) => n.id === node.id)) {
          nodes.push({
            id: node.id,
            label: node.login,
            title: node.login,
            color: "red",
          });
        }

        edges.push({
          from: network.user.id,
          to: node.id,
          color: "red",
          title: `${network.user.login} follow ${node.login}`,
        });
      }

      for (let node of network.followers) {
        if (!nodes.find((n) => n.id === node.id)) {
          nodes.push({
            id: node.id,
            label: node.login,
            title: node.login,
            color: "green",
          });
        }

        edges.push({
          from: node.id,
          to: network.user.id,
          color: "green",
          title: `${node.login} follows ${network.user.login}`,
        });
      }
    }

    console.log(edges.length);

    setNodes(nodes);
    setEdges(edges);
  }, [networks]);

  const graph = {
    nodes,
    edges,
  };

  const options = {
    height: "1080px",
    configure: {
      enabled: false,
    },
    edges: {
      color: { inherit: "from" },
      smooth: {
        enabled: true,
        type: "dynamic",
      },
    },
    interaction: {
      dragNodes: true,
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false,
    },
    physics: {
      enabled: true,
      repulsion: {
        centralGravity: 0.2,
        damping: 0.09,
        nodeDistance: 100,
        springConstant: 0.05,
        springLength: 200,
      },
      solver: "repulsion",
      stabilization: {
        enabled: true,
        fit: true,
        iterations: 1000,
        onlyDynamicEdges: false,
        updateInterval: 50,
      },
    },
  };

  const events = {
    select: async function (event: INodeEvent) {
      const node = nodes.find((x) => x.id === event.nodes![0]);

      if (node?.color !== "yellow") {
        searchUser(node!.label);
      }
    },
  };
  return (
    <Fragment>
      <QueryBox onSearch={searchUser} />
      <Graph graph={graph} options={options} events={events} />
    </Fragment>
  );
}

export default Home;
