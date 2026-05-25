"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Extension } from "@tiptap/core";

type Props = {
  content: string;
  onChange: (value: string) => void;
};

const ListItemColor = Extension.create({
  name: "listItemColor",

  addGlobalAttributes() {
    return [
      {
        types: ["listItem"],
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => element.style.color || null,
            renderHTML: (attributes) => {
              if (!attributes.color) return {};
              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },
});

export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, ListItemColor],
    content: content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
  "min-h-[300px] p-6 outline-none text-slate-800 leading-6 " +
  "[&_h1]:my-2 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:leading-tight " +
  "[&_h2]:my-2 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight " +
  "[&_p]:my-1 " +
  "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-8 " +
  "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-8 " +
  "[&_li]:my-0 [&_li]:pl-1"
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (content === "") {
      editor.commands.clearContent();
    }
  }, [content, editor]);

  if (!editor) return null;

  const syncContent = () => {
    onChange(editor.getHTML());
  };

  const buttonClass =
    "rounded-lg px-3 py-2 font-bold text-slate-700 transition hover:bg-sky-100 hover:text-sky-700";

  const activeButtonClass =
    "rounded-lg bg-sky-100 px-3 py-2 font-bold text-sky-700";

  const applyColor = (color: string) => {
    editor.chain().focus().setColor(color).run();

    if (editor.isActive("listItem")) {
      editor.chain().focus().updateAttributes("listItem", { color }).run();
    }

    syncContent();
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={
            editor.isActive("heading", { level: 1 })
              ? activeButtonClass
              : buttonClass
          }
        >
          H1
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={
            editor.isActive("heading", { level: 2 })
              ? activeButtonClass
              : buttonClass
          }
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? activeButtonClass : buttonClass}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? activeButtonClass : buttonClass}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? activeButtonClass : buttonClass
          }
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? activeButtonClass : buttonClass
          }
        >
          1. List
        </button>

       <div className="relative flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-sky-100">
  <span className="font-bold text-slate-700">
    Color
  </span>

  <input
    type="color"
    value="#2563eb"
    onChange={(e) => applyColor(e.target.value)}
    className="h-7 w-7 cursor-pointer rounded-full border border-slate-300"
  />
</div>

        <button
  type="button"
  onClick={() => editor.chain().focus().undo().run()}
  className={buttonClass}
>
  Undo
</button>

<button
  type="button"
  onClick={() => editor.chain().focus().redo().run()}
  className={buttonClass}
>
  Redo
</button>
      </div>

      <div onInput={syncContent} onKeyUp={syncContent} onBlur={syncContent}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}