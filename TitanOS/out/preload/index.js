"use strict";
const electron = require("electron");
const electronAPI = {
  ipcRenderer: {
    send(channel, ...args) {
      electron.ipcRenderer.send(channel, ...args);
    },
    sendTo(webContentsId, channel, ...args) {
      const electronVer = process.versions.electron;
      const electronMajorVer = electronVer ? parseInt(electronVer.split(".")[0]) : 0;
      if (electronMajorVer >= 28) {
        throw new Error('"sendTo" method has been removed since Electron 28.');
      } else {
        electron.ipcRenderer.sendTo(webContentsId, channel, ...args);
      }
    },
    sendSync(channel, ...args) {
      return electron.ipcRenderer.sendSync(channel, ...args);
    },
    sendToHost(channel, ...args) {
      electron.ipcRenderer.sendToHost(channel, ...args);
    },
    postMessage(channel, message, transfer) {
      electron.ipcRenderer.postMessage(channel, message, transfer);
    },
    invoke(channel, ...args) {
      return electron.ipcRenderer.invoke(channel, ...args);
    },
    on(channel, listener) {
      electron.ipcRenderer.on(channel, listener);
      return () => {
        electron.ipcRenderer.removeListener(channel, listener);
      };
    },
    once(channel, listener) {
      electron.ipcRenderer.once(channel, listener);
      return () => {
        electron.ipcRenderer.removeListener(channel, listener);
      };
    },
    removeListener(channel, listener) {
      electron.ipcRenderer.removeListener(channel, listener);
      return this;
    },
    removeAllListeners(channel) {
      electron.ipcRenderer.removeAllListeners(channel);
    }
  },
  webFrame: {
    insertCSS(css) {
      return electron.webFrame.insertCSS(css);
    },
    setZoomFactor(factor) {
      if (typeof factor === "number" && factor > 0) {
        electron.webFrame.setZoomFactor(factor);
      }
    },
    setZoomLevel(level) {
      if (typeof level === "number") {
        electron.webFrame.setZoomLevel(level);
      }
    }
  },
  webUtils: {
    getPathForFile(file) {
      return electron.webUtils.getPathForFile(file);
    }
  },
  process: {
    get platform() {
      return process.platform;
    },
    get versions() {
      return process.versions;
    },
    get env() {
      return { ...process.env };
    }
  }
};
const IPC = {
  window: {
    minimize: "window:minimize",
    toggleMaximize: "window:toggleMaximize",
    close: "window:close"
  },
  system: {
    getSnapshot: "system:getSnapshot",
    onUpdate: "system:onUpdate"
  },
  skills: {
    list: "skills:list",
    search: "skills:search",
    execute: "skills:execute"
  },
  notifications: {
    show: "notifications:show",
    onShow: "notifications:onShow"
  },
  settings: {
    getAll: "settings:getAll",
    set: "settings:set",
    onChange: "settings:onChange"
  },
  ui: {
    openSettings: "ui:openSettings"
  },
  memory: {
    list: "memory:list",
    search: "memory:search",
    create: "memory:create",
    update: "memory:update",
    delete: "memory:delete",
    onChange: "memory:onChange"
  },
  reasoning: {
    ask: "reasoning:ask"
  },
  core: {
    getIdentity: "core:getIdentity",
    getHealth: "core:getHealth",
    onHealthChange: "core:onHealthChange"
  },
  tasks: {
    list: "tasks:list",
    onChange: "tasks:onChange"
  },
  agency: {
    handleRequest: "agency:handleRequest",
    explain: "agency:explain"
  },
  goals: {
    list: "goals:list",
    create: "goals:create",
    getProgress: "goals:getProgress",
    onChange: "goals:onChange"
  },
  chat: {
    send: "chat:send",
    onDelta: "chat:onDelta",
    generateOneLiner: "chat:generateOneLiner",
    getStatus: "chat:getStatus",
    listModels: "chat:listModels",
    setProvider: "chat:setProvider",
    setApiKey: "chat:setApiKey",
    hasApiKey: "chat:hasApiKey",
    clearApiKey: "chat:clearApiKey"
  },
  conversation: {
    listThreads: "conversation:listThreads",
    startThread: "conversation:startThread",
    switchThread: "conversation:switchThread",
    getTurns: "conversation:getTurns"
  },
  workspace: {
    list: "workspace:list",
    getPrimary: "workspace:getPrimary",
    add: "workspace:add",
    remove: "workspace:remove",
    open: "workspace:open"
  },
  environment: {
    getStatus: "environment:getStatus"
  },
  insights: {
    list: "insights:list"
  }
};
const titanApi = {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node
  },
  window: {
    minimize: () => electron.ipcRenderer.invoke(IPC.window.minimize),
    toggleMaximize: () => electron.ipcRenderer.invoke(IPC.window.toggleMaximize),
    close: () => electron.ipcRenderer.invoke(IPC.window.close)
  },
  system: {
    getSnapshot: () => electron.ipcRenderer.invoke(IPC.system.getSnapshot),
    onUpdate: (callback) => {
      const listener = (_event, snapshot) => callback(snapshot);
      electron.ipcRenderer.on(IPC.system.onUpdate, listener);
      return () => electron.ipcRenderer.removeListener(IPC.system.onUpdate, listener);
    }
  },
  skills: {
    list: () => electron.ipcRenderer.invoke(IPC.skills.list),
    search: (query) => electron.ipcRenderer.invoke(IPC.skills.search, query),
    execute: (id) => electron.ipcRenderer.invoke(IPC.skills.execute, id)
  },
  notifications: {
    show: (input) => electron.ipcRenderer.invoke(IPC.notifications.show, input),
    onShow: (callback) => {
      const listener = (_event, notification) => callback(notification);
      electron.ipcRenderer.on(IPC.notifications.onShow, listener);
      return () => electron.ipcRenderer.removeListener(IPC.notifications.onShow, listener);
    }
  },
  settings: {
    getAll: () => electron.ipcRenderer.invoke(IPC.settings.getAll),
    set: (key, value) => electron.ipcRenderer.invoke(IPC.settings.set, key, value),
    onChange: (callback) => {
      const listener = (_event, settings) => callback(settings);
      electron.ipcRenderer.on(IPC.settings.onChange, listener);
      return () => electron.ipcRenderer.removeListener(IPC.settings.onChange, listener);
    }
  },
  ui: {
    onOpenSettings: (callback) => {
      const listener = () => callback();
      electron.ipcRenderer.on(IPC.ui.openSettings, listener);
      return () => electron.ipcRenderer.removeListener(IPC.ui.openSettings, listener);
    }
  },
  memory: {
    list: (category) => electron.ipcRenderer.invoke(IPC.memory.list, category),
    search: (query) => electron.ipcRenderer.invoke(IPC.memory.search, query),
    create: (input) => electron.ipcRenderer.invoke(IPC.memory.create, input),
    update: (id, changes) => electron.ipcRenderer.invoke(IPC.memory.update, id, changes),
    delete: (id) => electron.ipcRenderer.invoke(IPC.memory.delete, id),
    onChange: (callback) => {
      const listener = (_event, entries) => callback(entries);
      electron.ipcRenderer.on(IPC.memory.onChange, listener);
      return () => electron.ipcRenderer.removeListener(IPC.memory.onChange, listener);
    }
  },
  reasoning: {
    ask: (request) => electron.ipcRenderer.invoke(IPC.reasoning.ask, request)
  },
  core: {
    getIdentity: () => electron.ipcRenderer.invoke(IPC.core.getIdentity),
    getHealth: () => electron.ipcRenderer.invoke(IPC.core.getHealth),
    onHealthChange: (callback) => {
      const listener = (_event, health) => callback(health);
      electron.ipcRenderer.on(IPC.core.onHealthChange, listener);
      return () => electron.ipcRenderer.removeListener(IPC.core.onHealthChange, listener);
    }
  },
  tasks: {
    list: (status) => electron.ipcRenderer.invoke(IPC.tasks.list, status),
    onChange: (callback) => {
      const listener = (_event, tasks) => callback(tasks);
      electron.ipcRenderer.on(IPC.tasks.onChange, listener);
      return () => electron.ipcRenderer.removeListener(IPC.tasks.onChange, listener);
    }
  },
  agency: {
    handleRequest: (prompt) => electron.ipcRenderer.invoke(IPC.agency.handleRequest, prompt),
    explain: (traceId) => electron.ipcRenderer.invoke(IPC.agency.explain, traceId)
  },
  goals: {
    list: () => electron.ipcRenderer.invoke(IPC.goals.list),
    create: (input) => electron.ipcRenderer.invoke(IPC.goals.create, input),
    getProgress: (goalId) => electron.ipcRenderer.invoke(IPC.goals.getProgress, goalId),
    onChange: (callback) => {
      const listener = (_event, goals) => callback(goals);
      electron.ipcRenderer.on(IPC.goals.onChange, listener);
      return () => electron.ipcRenderer.removeListener(IPC.goals.onChange, listener);
    }
  },
  chat: {
    send: (threadId, content) => electron.ipcRenderer.invoke(IPC.chat.send, threadId, content),
    onDelta: (callback) => {
      const listener = (_event, payload) => callback(payload);
      electron.ipcRenderer.on(IPC.chat.onDelta, listener);
      return () => electron.ipcRenderer.removeListener(IPC.chat.onDelta, listener);
    },
    getStatus: () => electron.ipcRenderer.invoke(IPC.chat.getStatus),
    generateOneLiner: (prompt) => electron.ipcRenderer.invoke(IPC.chat.generateOneLiner, prompt),
    listModels: (providerId) => electron.ipcRenderer.invoke(IPC.chat.listModels, providerId),
    setProvider: (providerId, model) => electron.ipcRenderer.invoke(IPC.chat.setProvider, providerId, model),
    setApiKey: (providerId, apiKey) => electron.ipcRenderer.invoke(IPC.chat.setApiKey, providerId, apiKey),
    hasApiKey: (providerId) => electron.ipcRenderer.invoke(IPC.chat.hasApiKey, providerId),
    clearApiKey: (providerId) => electron.ipcRenderer.invoke(IPC.chat.clearApiKey, providerId)
  },
  conversation: {
    listThreads: () => electron.ipcRenderer.invoke(IPC.conversation.listThreads),
    startThread: (title) => electron.ipcRenderer.invoke(IPC.conversation.startThread, title),
    switchThread: (id) => electron.ipcRenderer.invoke(IPC.conversation.switchThread, id),
    getTurns: (threadId) => electron.ipcRenderer.invoke(IPC.conversation.getTurns, threadId)
  },
  workspace: {
    list: () => electron.ipcRenderer.invoke(IPC.workspace.list),
    getPrimary: () => electron.ipcRenderer.invoke(IPC.workspace.getPrimary),
    add: () => electron.ipcRenderer.invoke(IPC.workspace.add),
    remove: (id) => electron.ipcRenderer.invoke(IPC.workspace.remove, id),
    open: (id) => electron.ipcRenderer.invoke(IPC.workspace.open, id)
  },
  environment: {
    getStatus: () => electron.ipcRenderer.invoke(IPC.environment.getStatus)
  },
  insights: {
    list: () => electron.ipcRenderer.invoke(IPC.insights.list)
  }
};
electron.contextBridge.exposeInMainWorld("electron", electronAPI);
electron.contextBridge.exposeInMainWorld("titan", titanApi);
