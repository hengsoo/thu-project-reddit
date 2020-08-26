<!--suppress ALL -->
<template>
  <div class="editor bg-white rounded p-4 my-2 shadow-md divide-y">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold"/>
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic"/>
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <font-awesome-icon icon="strikethrough"/>
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <font-awesome-icon icon="quote-left"/>
        </button>
        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <font-awesome-icon icon="underline"/>
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <font-awesome-icon icon="code"/>
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar-button"
          @click="showImagePrompt(commands.image)"
        >
          <font-awesome-icon icon="image"/>
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <font-awesome-icon icon="list-ul"/>
        </button>

        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <font-awesome-icon icon="list-ol"/>
        </button>


        <button
          class="menubar-button"
          @click="commands.horizontal_rule"
        >
          <font-awesome-icon icon="ruler-horizontal"/>
        </button>

        <button
          class="menubar-button"
          @click="commands.undo"
        >
          <font-awesome-icon icon="undo"/>
        </button>

        <button
          class="menubar-button"
          @click="commands.redo"
        >
          <font-awesome-icon icon="redo"/>
        </button>


      </div>
    </editor-menu-bar>

    <editor-content class="focus:border-none" :editor="editor"/>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBold,
  faCode,
  faImage,
  faItalic,
  faListOl,
  faListUl,
  faQuoteLeft,
  faRedo,
  faRulerHorizontal,
  faStrikethrough,
  faUnderline,
  faUndo
} from '@fortawesome/free-solid-svg-icons'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  Heading,
  History,
  HorizontalRule,
  Image,
  Italic,
  ListItem,
  OrderedList,
  Strike,
  Underline,
} from 'tiptap-extensions'

library.add(faBold, faItalic, faQuoteLeft, faRulerHorizontal, faListUl,
  faListOl, faCode, faUndo, faRedo, faImage, faUnderline, faStrikethrough)

export default {
  name: 'Editor',
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data () {
    return {
      isActive: true,
      html: '',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new HorizontalRule(),
          new Image(),
          new ListItem(),
          new Heading({ levels: [1, 2, 3] }),
          new OrderedList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h2>
            Hiding Menu Bar
          </h2>
          <p>
            Click into this text to see the menu. Click outside and the menu will disappear. It's like magic.
          </p>
        `,
        onUpdate: ({ getHTML }) => {
          this.html = getHTML()
        },
      }),
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    showImagePrompt (command) {
      this.$swal({
        title: 'Enter the url of your image',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Insert',
        showLoaderOnConfirm: true,
      }).then( (result) => {
        const value = result.value
        if (value !== null) {
          command({ src:value })
        }
      } )
    },
  }
}
</script>

<style>
.ProseMirror-focused {
  outline: none;
}

.menubar-button {
  @apply px-2 py-1
}

.menubar-button:hover {
  @apply bg-gray-100 rounded
}

.menubar-button:focus {
  outline: none
}

</style>
