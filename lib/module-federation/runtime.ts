"use client";

import { createInstance, getInstance, type ModuleFederation } from "@module-federation/runtime";
import * as React from "react";
import * as ReactDom from "react-dom";

import { getAccountManifestUrl, getCartManifestUrl } from "./config";

const SHELL_RUNTIME_NAME = "shop_shell";

let runtime: ModuleFederation | null = null;

export function getShellFederationRuntime() {
  if (runtime) {
    return runtime;
  }

  const existingRuntime = getInstance((instance) => instance.name === SHELL_RUNTIME_NAME);

  if (existingRuntime) {
    runtime = existingRuntime;
    return runtime;
  }

  runtime = createInstance({
    name: SHELL_RUNTIME_NAME,
    remotes: [
      {
        name: "cart",
        entry: getCartManifestUrl(),
      },
      {
        name: "account",
        entry: getAccountManifestUrl(),
      },
    ],
    shared: {
      react: {
        version: React.version,
        lib: () => React,
        shareConfig: {
          singleton: true,
          requiredVersion: React.version,
        },
      },
      "react-dom": {
        version: React.version,
        lib: () => ReactDom,
        shareConfig: {
          singleton: true,
          requiredVersion: React.version,
        },
      },
    },
  });

  return runtime;
}
