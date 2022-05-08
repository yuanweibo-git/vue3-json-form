import { defineComponent, ref, onMounted, watch, onBeforeMount, shallowRef, PropType } from 'vue';
import * as Monaco from 'monaco-editor';

// implementation
export default defineComponent({
  name: 'MonacoEditor',
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(value: string, event: Monaco.editor.IModelContentChangedEvent) => void>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    // must be shallowRef, if not, editor.getValue() won't work
    const editorRef = shallowRef();
    const containerRef = ref();
    let _subscription: Monaco.IDisposable | undefined;
    let __preventTriggerChangeEvent = false;

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(containerRef.value, {
        value: props.code,
        language: 'json',
        formatOnPaste: true,
        tabSize: 2,
        minimap: {
          enabled: false,
        },
      }));

      _subscription = editor.onDidChangeModelContent((event) => {
        // console.log('---------->', __preventTriggerChangeEvent)
        if (!__preventTriggerChangeEvent) {
          props.onChange(editor.getValue(), event);
        }
      });
    });

    onBeforeMount(() => {
      if (_subscription) {
        _subscription.dispose();
      }
    });

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value;
        const model = editor.getModel();
        if (v !== model.getValue()) {
          editor.pushUndoStop();
          __preventTriggerChangeEvent = true;
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ]
          );
          editor.pushUndoStop();
          __preventTriggerChangeEvent = false;
        }
      }
    );

    return () => {
      return (
        <div>
          <div>
            <span>{props.title}</span>
          </div>
          <div style={{ width: '100%', height: '360px', border: '1px solid rgba(0, 0, 0, 0.08)' }} class="coder-editor" ref={containerRef} />
        </div>
      );
    };
  },
});
