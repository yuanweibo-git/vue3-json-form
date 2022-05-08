import { defineComponent, reactive } from 'vue';
import MonacoEditor from './components/MonacoEditor';
import SchemaForm from '../lib/SchemaForm';
import { demoSchema } from './schema-test/demo';

import './app.less';
type Schema = any;
type UISchema = any;

export default defineComponent({
  setup() {
    function toJson(data: any) {
      return JSON.stringify(data, null, 2);
    }

    const demo: {
      schema: Schema | null;
      data: any;
      uiSchema: UISchema | null;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
      customValidate: ((d: any, e: any) => void) | undefined;
    } = reactive({
      schema: null,
      data: 13,
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
    });
    const schema = demoSchema;
    const schemaCode = toJson(schema);

    // closure 闭包 demo
    function handleCodeChange(field: 'schema' | 'data' | 'uiSchema', value: string) {
      try {
        demo[field] = JSON.parse(value);
        (demo as any)[`${field}Code`] = value;
      } catch (err) {
        // some thing
      }
    }

    const handleChange = (v: any) => {
      demo.data = v;
      demo.dataCode = toJson(v);
    };

    const handleDataChange = (v: string) => handleCodeChange('data', v);
    const handleSchemaChange = (v: string) => handleCodeChange('schema', v);
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v);

    return () => {
      return (
        <div class="app-main">
          <div class="editor-main">
            <MonacoEditor code={schemaCode} onChange={handleSchemaChange} title="Schema" />

            <div class="other-schema">
              <MonacoEditor code={demo.uiSchemaCode} onChange={handleUISchemaChange} title="UISchema" />
              <MonacoEditor code={demo.dataCode} onChange={handleDataChange} title="Value" />
            </div>
          </div>

          <div class="schema-main">
            <SchemaForm schema={schema} value={demo.data} onChange={handleChange} />
          </div>
        </div>
      );
    };
  },
});
