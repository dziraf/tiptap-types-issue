# tiptap-types-issue

A repository to reproduce the issue: https://github.com/ueberdosis/tiptap/issues/3488

## Installation

```bash
$ yarn
```

## Reproducing

The issue can be reproduced by attempting to build Typescript types:

```bash
yarn types
```

## Problem

The command above generates the following error output:

```bash
yarn run v1.22.18
$ tsc
src/components/Editor/Editor.tsx:11:10 - error TS2305: Module '"@tiptap/react"' has no exported member 'EditorContent'.

11 import { EditorContent, EditorEvents, EditorOptions, useEditor } from '@tiptap/react'
            ~~~~~~~~~~~~~

src/components/Editor/Editor.tsx:11:25 - error TS2305: Module '"@tiptap/react"' has no exported member 'EditorEvents'.

11 import { EditorContent, EditorEvents, EditorOptions, useEditor } from '@tiptap/react'
                           ~~~~~~~~~~~~

src/components/Editor/Editor.tsx:11:39 - error TS2305: Module '"@tiptap/react"' has no exported member 'EditorOptions'.

11 import { EditorContent, EditorEvents, EditorOptions, useEditor } from '@tiptap/react'
                                         ~~~~~~~~~~~~~

src/components/Editor/Editor.tsx:11:54 - error TS2724: '"@tiptap/react"' has no exported member named 'useEditor'. Did you mean 'Editor'?

11 import { EditorContent, EditorEvents, EditorOptions, useEditor } from '@tiptap/react'
                                                        ~~~~~~~~~


Found 4 errors in the same file, starting at: src/components/Editor/Editor.tsx:11
```

These errors are also highlighted in Editor, ie VSCode.

These can be fixed by applying the following patches (via `patch-package`). The problem with this approach is that patches are not applied when a library installs another library, only to your own app.

### @tiptap/react

```
diff --git a/node_modules/@tiptap/react/dist/packages/react/src/index.d.ts b/node_modules/@tiptap/react/dist/packages/react/src/index.d.ts
index c5109e2..5742d3c 100644
--- a/node_modules/@tiptap/react/dist/packages/react/src/index.d.ts
+++ b/node_modules/@tiptap/react/dist/packages/react/src/index.d.ts
@@ -1,10 +1,10 @@
-export * from './BubbleMenu';
-export { Editor } from './Editor';
-export * from './EditorContent';
-export * from './FloatingMenu';
-export * from './NodeViewContent';
-export * from './NodeViewWrapper';
-export * from './ReactNodeViewRenderer';
-export * from './ReactRenderer';
-export * from './useEditor';
-export * from '@tiptap/core';
+export * from './BubbleMenu.js'
+export { Editor } from './Editor.js'
+export * from './EditorContent.js'
+export * from './FloatingMenu.js'
+export * from './NodeViewContent.js'
+export * from './NodeViewWrapper.js'
+export * from './ReactNodeViewRenderer.js'
+export * from './ReactRenderer.js'
+export * from './useEditor.js'
+export * from '@tiptap/core'
```

### @tiptap/core

```
diff --git a/node_modules/@tiptap/core/dist/packages/core/src/index.d.ts b/node_modules/@tiptap/core/dist/packages/core/src/index.d.ts
index 2626c14..6674936 100644
--- a/node_modules/@tiptap/core/dist/packages/core/src/index.d.ts
+++ b/node_modules/@tiptap/core/dist/packages/core/src/index.d.ts
@@ -1,18 +1,18 @@
-export * from './CommandManager';
-export * from './Editor';
-export * from './Extension';
-export * as extensions from './extensions';
-export * from './helpers';
-export * from './InputRule';
-export * from './inputRules';
-export * from './Mark';
-export * from './Node';
-export * from './NodeView';
-export * from './PasteRule';
-export * from './pasteRules';
-export * from './Tracker';
-export * from './types';
-export * from './utilities';
+export * from './CommandManager.js'
+export * from './Editor.js'
+export * from './Extension.js'
+export * as extensions from './extensions.js'
+export * from './helpers.js'
+export * from './InputRule.js'
+export * from './inputRules.js'
+export * from './Mark.js'
+export * from './Node.js'
+export * from './NodeView.js'
+export * from './PasteRule.js'
+export * from './pasteRules.js'
+export * from './Tracker.js'
+export * from './types.js'
+export * from './utilities.js'
 export interface Commands<ReturnType = any> {
 }
 export interface ExtensionConfig<Options = any, Storage = any> {
```

This is only a typing issue, you can still build and bundle the code using Babel/Rollup and be able to run it:

```bash
$ yarn build        # typescript -> esm js using babel
$ yarn bundle       # rollup script to create a browser bundle (app.bundle.js)
$ yarn start        # starts an express server which serves the React app under http://localhost:8080
```

You cannot build types though.

Note: The editor itself is not styled, I copied the editor code from our design system without copying other design system elements.
